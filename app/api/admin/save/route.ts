import { NextResponse } from "next/server";
import { marked } from "marked";
import matter from "gray-matter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPO_OWNER = "duchuyvp";
const REPO_NAME = "therapevo.vn";
const BRANCH = "master";
const GITHUB_API = "https://api.github.com";

type Category = { slug: string; name: string };
type Payload = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  categories?: Category[];
  coverImage?: string;
  markdown: string;
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function base64UTF8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin);
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured on the server." },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const title = body.title?.trim();
  const markdown = body.markdown ?? "";
  if (!title) return NextResponse.json({ error: "title is required." }, { status: 400 });
  if (!markdown.trim())
    return NextResponse.json({ error: "markdown body is required." }, { status: 400 });

  const slug = slugify(body.slug?.trim() || title);
  if (!slug)
    return NextResponse.json(
      { error: "Unable to derive slug — please provide one manually." },
      { status: 400 },
    );

  const date = body.date || new Date().toISOString();
  const excerpt = (body.excerpt || markdown.replace(/[#*_`>\[\]\(\)]/g, "").replace(/\s+/g, " ").trim()).slice(0, 300);
  const categories = body.categories?.filter((c) => c?.slug && c?.name) ?? [];

  const html = await marked.parse(markdown, { async: true });

  const frontmatter: Record<string, unknown> = {
    slug,
    title,
    date,
    excerpt,
    categories,
  };
  if (body.coverImage?.trim()) frontmatter.coverImage = body.coverImage.trim();

  const fileContent = matter.stringify(html, frontmatter);
  const filePath = `content/posts/${slug}.md`;
  const contentsUrl = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "therapevo-admin-compose",
  };

  const existing = await fetch(`${contentsUrl}?ref=${BRANCH}`, { headers: ghHeaders });
  let sha: string | undefined;
  let isUpdate = false;
  if (existing.status === 200) {
    const meta = (await existing.json()) as { sha?: string };
    sha = meta.sha;
    isUpdate = true;
  } else if (existing.status !== 404) {
    const errText = await existing.text();
    return NextResponse.json(
      { error: `GitHub check failed (${existing.status}): ${errText}` },
      { status: 502 },
    );
  }

  const commitRes = await fetch(contentsUrl, {
    method: "PUT",
    headers: { ...ghHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `${isUpdate ? "Update" : "Add"} post: ${title}`,
      content: base64UTF8(fileContent),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!commitRes.ok) {
    const errText = await commitRes.text();
    return NextResponse.json(
      { error: `GitHub commit failed (${commitRes.status}): ${errText}` },
      { status: 502 },
    );
  }

  const result = (await commitRes.json()) as {
    commit: { html_url: string; sha: string };
    content: { path: string };
  };

  return NextResponse.json({
    ok: true,
    slug,
    isUpdate,
    commitUrl: result.commit.html_url,
    commitSha: result.commit.sha.slice(0, 7),
    filePath: result.content.path,
    postUrl: `/blog/${slug}`,
  });
}
