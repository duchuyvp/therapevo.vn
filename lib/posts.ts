import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostCategory = { slug: string; name: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: PostCategory[];
  coverImage?: string;
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return (cache = []);
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map<Post>((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      categories: data.categories ?? [],
      coverImage: data.coverImage,
      html: content,
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return (cache = posts);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllCategories(): PostCategory[] {
  const map = new Map<string, PostCategory>();
  for (const p of getAllPosts()) {
    for (const c of p.categories) map.set(c.slug, c);
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByCategory(slug: string): Post[] {
  return getAllPosts().filter((p) => p.categories.some((c) => c.slug === slug));
}

export function getRelatedPosts(currentSlug: string, count = 3): Post[] {
  const current = getPost(currentSlug);
  if (!current) return [];
  const currentCatSlugs = new Set(current.categories.map((c) => c.slug));
  const candidates = getAllPosts().filter(
    (p) => p.slug !== currentSlug && p.categories.some((c) => currentCatSlugs.has(c.slug)),
  );
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates.slice(0, count);
}
