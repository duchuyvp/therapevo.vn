import { NextResponse } from "next/server";
import {
  GITHUB_BRANCH,
  bytesToBase64,
  githubContentsUrl,
  githubHeaders,
} from "@/lib/admin-github";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function slugifyFilename(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Upload must use multipart form data." }, { status: 400 });
  }

  const value = formData.get("file");
  if (!(value instanceof File)) {
    return NextResponse.json({ error: "Please choose an image file." }, { status: 400 });
  }

  const extension = EXTENSIONS[value.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, and GIF cover images are supported." },
      { status: 400 },
    );
  }
  if (value.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Cover image must be 8 MB or smaller." }, { status: 413 });
  }

  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const stem = slugifyFilename(value.name) || "cover-image";
  const filename = `${stem}-${Date.now().toString(36)}.${extension}`;
  const filePath = `public/blog/media/${year}/${month}/${filename}`;
  const publicUrl = `/blog/media/${year}/${month}/${filename}`;
  const bytes = new Uint8Array(await value.arrayBuffer());

  const response = await fetch(githubContentsUrl(filePath), {
    method: "PUT",
    headers: { ...githubHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Upload cover image: ${filename}`,
      content: bytesToBase64(bytes),
      branch: GITHUB_BRANCH,
    }),
  });
  if (!response.ok) {
    return NextResponse.json(
      { error: `GitHub upload failed (${response.status}): ${(await response.text()).slice(0, 400)}` },
      { status: 502 },
    );
  }

  const result = (await response.json()) as { commit?: { html_url?: string; sha?: string } };
  return NextResponse.json({
    ok: true,
    url: publicUrl,
    filePath,
    commitUrl: result.commit?.html_url,
    commitSha: result.commit?.sha?.slice(0, 7),
  });
}
