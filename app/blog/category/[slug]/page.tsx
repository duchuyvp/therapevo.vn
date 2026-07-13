import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getAllCategories().find((c) => c.slug === slug);
  return cat ? { title: cat.name } : {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getAllCategories().find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug);
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <Link href="/blog" className="text-sm text-black/50 hover:text-[var(--color-brand)]">
        ← Tất cả bài viết
      </Link>
      <h1 className="mt-4 font-display text-4xl">{cat.name}</h1>
      <p className="mt-2 text-black/60">{posts.length} bài viết</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-black/5 bg-white p-6 hover:shadow-lg transition"
            >
              <h2 className="font-display text-2xl group-hover:text-[var(--color-brand)]">
                {p.title}
              </h2>
              <p className="mt-3 text-sm text-black/60 line-clamp-3">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
