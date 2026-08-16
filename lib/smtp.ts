import { connect, type TLSSocket } from "node:tls";

type SmtpResponse = { code: number; lines: string[] };
type ResponseWaiter = {
  resolve: (response: SmtpResponse) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

const COMMAND_TIMEOUT_MS = 15_000;

class SmtpClient {
  private buffer = "";
  private currentCode: number | undefined;
  private currentLines: string[] = [];
  private responses: SmtpResponse[] = [];
  private waiters: ResponseWaiter[] = [];
  private fatalError: Error | undefined;

  constructor(private readonly socket: TLSSocket) {
    socket.setEncoding("utf8");
    socket.on("data", (chunk: string) => this.consume(chunk));
    socket.on("error", (error) => this.fail(error));
    socket.on("close", () => {
      if (this.waiters.length > 0) this.fail(new Error("SMTP connection closed unexpectedly."));
    });
  }

  private consume(chunk: string) {
    this.buffer += chunk;
    let newline = this.buffer.indexOf("\n");
    while (newline >= 0) {
      const line = this.buffer.slice(0, newline).replace(/\r$/, "");
      this.buffer = this.buffer.slice(newline + 1);
      this.consumeLine(line);
      newline = this.buffer.indexOf("\n");
    }
  }

  private consumeLine(line: string) {
    const match = line.match(/^(\d{3})([ -])(.*)$/);
    if (!match) {
      if (this.currentCode !== undefined) this.currentLines.push(line);
      return;
    }

    const code = Number(match[1]);
    if (this.currentCode === undefined) {
      this.currentCode = code;
      this.currentLines = [];
    }
    this.currentLines.push(line);

    if (match[2] === " ") {
      const response = { code: this.currentCode, lines: this.currentLines };
      this.currentCode = undefined;
      this.currentLines = [];
      const waiter = this.waiters.shift();
      if (waiter) {
        clearTimeout(waiter.timer);
        waiter.resolve(response);
      } else {
        this.responses.push(response);
      }
    }
  }

  private fail(error: Error) {
    this.fatalError = error;
    for (const waiter of this.waiters.splice(0)) {
      clearTimeout(waiter.timer);
      waiter.reject(error);
    }
  }

  private readResponse(): Promise<SmtpResponse> {
    if (this.fatalError) return Promise.reject(this.fatalError);
    const queued = this.responses.shift();
    if (queued) return Promise.resolve(queued);

    return new Promise((resolve, reject) => {
      const waiter: ResponseWaiter = {
        resolve,
        reject,
        timer: setTimeout(() => {
          const index = this.waiters.indexOf(waiter);
          if (index >= 0) this.waiters.splice(index, 1);
          reject(new Error("SMTP server response timed out."));
        }, COMMAND_TIMEOUT_MS),
      };
      this.waiters.push(waiter);
    });
  }

  async expect(expectedCodes: number | number[], action: string): Promise<SmtpResponse> {
    const response = await this.readResponse();
    const allowed = Array.isArray(expectedCodes) ? expectedCodes : [expectedCodes];
    if (!allowed.includes(response.code)) {
      const detail = response.lines.join(" ").slice(0, 500);
      throw new Error(`SMTP ${action} failed (${response.code}): ${detail}`);
    }
    return response;
  }

  writeLine(value: string) {
    this.socket.write(`${value}\r\n`);
  }

  writeData(value: string) {
    const normalized = value.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
    this.socket.write(`${normalized}\r\n.\r\n`);
  }

  close() {
    this.socket.end();
  }
}

function encodeHeader(value: string): string {
  const clean = value.replace(/[\r\n]+/g, " ").trim();
  return `=?UTF-8?B?${Buffer.from(clean, "utf8").toString("base64")}?=`;
}

function sanitizeAddress(value: string): string {
  return value.replace(/[\r\n<>]/g, "").trim();
}

function base64Body(value: string): string {
  return Buffer.from(value, "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";
}

function buildMessage({
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}): string {
  const boundary = `therapevo-${crypto.randomUUID()}`;
  const headers = [
    `From: ${encodeHeader("Therapévo Website")} <${sanitizeAddress(from)}>`,
    `To: ${sanitizeAddress(to)}`,
    ...(replyTo ? [`Reply-To: ${sanitizeAddress(replyTo)}`] : []),
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  return [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    base64Body(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    base64Body(html),
    `--${boundary}--`,
  ].join("\r\n");
}

export async function sendSmtpEmail({
  host,
  port,
  username,
  password,
  to,
  envelopeRecipients,
  replyTo,
  subject,
  text,
  html,
}: {
  host: string;
  port: number;
  username: string;
  password: string;
  to: string;
  envelopeRecipients?: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}) {
  const socket = connect({ host, port, servername: host, rejectUnauthorized: true });
  const client = new SmtpClient(socket);

  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("SMTP connection timed out.")), COMMAND_TIMEOUT_MS);
      socket.once("secureConnect", () => {
        clearTimeout(timer);
        resolve();
      });
      socket.once("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
    });

    await client.expect(220, "greeting");
    client.writeLine("EHLO dev.therapevo.vn");
    await client.expect(250, "EHLO");

    client.writeLine("AUTH LOGIN");
    await client.expect(334, "authentication challenge");
    client.writeLine(Buffer.from(username, "utf8").toString("base64"));
    await client.expect(334, "username authentication");
    client.writeLine(Buffer.from(password, "utf8").toString("base64"));
    await client.expect(235, "password authentication");

    client.writeLine(`MAIL FROM:<${sanitizeAddress(username)}>`);
    await client.expect(250, "sender acceptance");
    const recipients = Array.from(new Set(envelopeRecipients?.length ? envelopeRecipients : [to]));
    for (const recipient of recipients) {
      client.writeLine(`RCPT TO:<${sanitizeAddress(recipient)}>`);
      await client.expect([250, 251], "recipient acceptance");
    }
    client.writeLine("DATA");
    await client.expect(354, "message data");
    client.writeData(buildMessage({ from: username, to, replyTo, subject, text, html }));
    const result = await client.expect(250, "message delivery");

    client.writeLine("QUIT");
    await client.expect(221, "quit").catch(() => undefined);
    return { response: result.lines.join(" ") };
  } finally {
    client.close();
  }
}
