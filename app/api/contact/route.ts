import { NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const dynamic = "force-dynamic";

const CONTACT_EMAIL = "contact@therapevo.vn";
const FALLBACK_DELIVERY_EMAIL = "therapevo.psy@gmail.com";

type ContactPayload = {
  name?: string;
  city?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  website?: string;
};

const interestLabels: Record<string, string> = {
  space: "Không gian Thực hành Tiêu chuẩn",
  counseling: "Dịch vụ Tham vấn & Trị liệu",
  org: "Giải pháp cho Tổ chức / Doanh nghiệp",
  community: "Chương trình Cộng đồng",
  other: "Khác",
};

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#039;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  // Quietly accept bot submissions caught by the honeypot.
  if (clean(payload.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(payload.name, 120);
  const city = clean(payload.city, 120);
  const phone = clean(payload.phone, 40);
  const email = clean(payload.email, 200);
  const interest = clean(payload.interest, 80);
  const message = clean(payload.message, 4000);

  if (!name || !phone || !email || !validEmail(email)) {
    return NextResponse.json(
      { error: "Vui lòng nhập họ tên, số điện thoại và email hợp lệ." },
      { status: 400 },
    );
  }

  const interestLabel = interestLabels[interest] || interest || "Chưa chọn";
  const subject = `Liên hệ mới từ website — ${name}`;
  const text = [
    "Có một yêu cầu liên hệ mới từ website Therapévo Việt Nam.",
    "",
    `Họ và tên: ${name}`,
    `Tỉnh thành: ${city || "Chưa cung cấp"}`,
    `Số điện thoại: ${phone}`,
    `Email: ${email}`,
    `Quan tâm: ${interestLabel}`,
    "",
    "Nội dung:",
    message || "Chưa cung cấp",
  ].join("\n");
  const html = `
    <h2>Yêu cầu liên hệ mới từ website</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Họ và tên</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Tỉnh thành</strong></td><td>${escapeHtml(city || "Chưa cung cấp")}</td></tr>
      <tr><td><strong>Số điện thoại</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Quan tâm</strong></td><td>${escapeHtml(interestLabel)}</td></tr>
    </table>
    <h3>Nội dung</h3>
    <p style="white-space:pre-wrap">${escapeHtml(message || "Chưa cung cấp")}</p>
  `;
  const smtpUsername = process.env.SMTP_USERNAME || process.env.SNMP_USERNAME;
  const smtpPassword = process.env.SMTP_PASSWORD || process.env.SNMP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const deliveryEmail = process.env.CONTACT_DELIVERY_EMAIL || FALLBACK_DELIVERY_EMAIL;

  if (!smtpUsername || !smtpPassword || !Number.isInteger(smtpPort)) {
    return NextResponse.json(
      { error: "Dịch vụ gửi email chưa được cấu hình. Vui lòng gọi hotline để được hỗ trợ." },
      { status: 503 },
    );
  }

  try {
    await sendSmtpEmail({
      host: smtpHost,
      port: smtpPort,
      username: smtpUsername,
      password: smtpPassword,
      to: CONTACT_EMAIL,
      envelopeRecipients: [CONTACT_EMAIL, deliveryEmail],
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (error: unknown) {
    console.error("Contact email delivery failed", error);
    return NextResponse.json(
      { error: "Chưa thể gửi liên hệ lúc này. Vui lòng thử lại hoặc gọi hotline." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
