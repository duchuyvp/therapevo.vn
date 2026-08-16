import { NextResponse } from "next/server";
import {
  GITHUB_BRANCH,
  decodeBase64UTF8,
  githubContentsUrl,
  githubHeaders,
} from "@/lib/admin-github";

export const dynamic = "force-dynamic";

function validSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function markdownBody(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}

async function getExisting(slug: string, token: string) {
  return fetch(`${githubContentsUrl(`content/posts/${slug}.md`)}?ref=${GITHUB_BRANCH}`, {
    headers: githubHeaders(token),
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured." }, { status: 503 });
  }

  const { slug } = await params;
  if (!validSlug(slug)) {
    return NextResponse.json({ error: "Invalid post slug." }, { status: 400 });
  }

  const response = await getExisting(slug, token);
  if (response.status === 404) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  if (!response.ok) {
    return NextResponse.json(
      { error: `GitHub read failed (${response.status}): ${(await response.text()).slice(0, 400)}` },
      { status: 502 },
    );
  }

  const file = (await response.json()) as { content?: string; encoding?: string };
  if (!file.content || file.encoding !== "base64") {
    return NextResponse.json({ error: "GitHub returned an unsupported file format." }, { status: 502 });
  }

  return NextResponse.json({ slug, markdown: markdownBody(decodeBase64UTF8(file.content)) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured." }, { status: 503 });
  }

  const { slug } = await params;
  if (!validSlug(slug)) {
    return NextResponse.json({ error: "Invalid post slug." }, { status: 400 });
  }

  const existing = await getExisting(slug, token);
  if (existing.status === 404) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  if (!existing.ok) {
    return NextResponse.json(
      { error: `GitHub check failed (${existing.status}): ${(await existing.text()).slice(0, 400)}` },
      { status: 502 },
    );
  }

  const meta = (await existing.json()) as { sha?: string };
  if (!meta.sha) {
    return NextResponse.json({ error: "GitHub did not return the file SHA." }, { status: 502 });
  }

  const deleted = await fetch(githubContentsUrl(`content/posts/${slug}.md`), {
    method: "DELETE",
    headers: { ...githubHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Delete post: ${slug}`,
      sha: meta.sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!deleted.ok) {
    return NextResponse.json(
      { error: `GitHub delete failed (${deleted.status}): ${(await deleted.text()).slice(0, 400)}` },
      { status: 502 },
    );
  }

  const result = (await deleted.json()) as { commit?: { html_url?: string; sha?: string } };
  return NextResponse.json({
    ok: true,
    slug,
    commitUrl: result.commit?.html_url,
    commitSha: result.commit?.sha?.slice(0, 7),
  });
}
