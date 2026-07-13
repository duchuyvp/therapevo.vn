import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import matter from "gray-matter";

const WP_BASE = "https://therapevo.vn";
const WP_API = `${WP_BASE}/wp-json/wp/v2`;

const OUT_POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_MEDIA_DIR = path.join(process.cwd(), "public", "blog", "media");
const PUBLIC_MEDIA_PREFIX = "/blog/media";

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: Array<Array<{ id: number; slug: string; name: string; taxonomy: string }>>;
  };
};

async function fetchAllPosts(): Promise<WPPost[]> {
  const all: WPPost[] = [];
  let page = 1;
  while (true) {
    const url = `${WP_API}/posts?per_page=100&page=${page}&_embed=1&orderby=date&order=desc`;
    const res = await fetch(url);
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`WP fetch failed: ${res.status} ${url}`);
    const batch = (await res.json()) as WPPost[];
    if (batch.length === 0) break;
    all.push(...batch);
    const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages) break;
    page++;
  }
  return all;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’");
}

function stripHtml(s: string): string {
  return decodeEntities(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

async function downloadOnce(url: string): Promise<string | null> {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("therapevo.vn")) return null;
    const relPath = u.pathname.replace(/^\/wp-content\/uploads\//, "");
    const localPath = path.join(OUT_MEDIA_DIR, relPath);
    const publicUrl = `${PUBLIC_MEDIA_PREFIX}/${relPath}`;
    if (existsSync(localPath)) return publicUrl;
    await fs.mkdir(path.dirname(localPath), { recursive: true });
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! media ${res.status}: ${url}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(localPath, buf);
    return publicUrl;
  } catch (e) {
    console.warn(`  ! media error: ${url}`, e);
    return null;
  }
}

async function rewriteMedia(html: string): Promise<string> {
  const urlRegex = /https?:\/\/therapevo\.vn\/wp-content\/uploads\/[^\s"'<>)]+/g;
  const urls = Array.from(new Set(html.match(urlRegex) ?? []));
  const map: Record<string, string> = {};
  for (const url of urls) {
    const local = await downloadOnce(url);
    if (local) map[url] = local;
  }
  return html.replace(urlRegex, (m) => map[m] ?? m);
}

async function main() {
  await fs.mkdir(OUT_POSTS_DIR, { recursive: true });
  await fs.mkdir(OUT_MEDIA_DIR, { recursive: true });

  console.log("Fetching all posts…");
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts.`);

  for (const post of posts) {
    const title = decodeEntities(post.title.rendered).trim();
    console.log(`- ${post.slug}: ${title}`);

    const terms = post._embedded?.["wp:term"]?.flat() ?? [];
    const categories = terms
      .filter((t) => t.taxonomy === "category")
      .map((t) => ({ slug: t.slug, name: decodeEntities(t.name) }));

    let cover: string | undefined;
    const feat = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (feat) {
      const local = await downloadOnce(feat);
      cover = local ?? undefined;
    }

    const contentHtml = await rewriteMedia(post.content.rendered);
    const excerpt = stripHtml(post.excerpt.rendered).slice(0, 300);

    const front = {
      slug: post.slug,
      title,
      date: post.date,
      excerpt,
      categories,
      ...(cover ? { coverImage: cover } : {}),
    };

    const file = matter.stringify(contentHtml, front);
    await fs.writeFile(path.join(OUT_POSTS_DIR, `${post.slug}.md`), file, "utf-8");
  }

  console.log(`\nDone. Wrote ${posts.length} posts to ${OUT_POSTS_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
