import Link from "next/link";
import { notFound } from "next/navigation";
import { t } from "@/lib/i18n";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dict = t();
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 pt-32 pb-16">
        <Link
          href="/blog"
          className="text-sm text-black/50 hover:text-[var(--app-primary)]"
        >
          ← {dict.blog.backToBlog}
        </Link>

        <header className="mt-6 mb-10">
          {post.categories[0] && (
            <p className="text-xs uppercase tracking-wide text-[var(--app-primary)] font-semibold">
              {post.categories[0].name}
            </p>
          )}
          <h1 className="mt-2 font-[var(--font-display)] text-4xl leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-black/50">
            {dict.blog.postedOn} {new Date(post.date).toLocaleDateString("vi-VN")}
          </p>
        </header>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      {related.length > 0 && (
        <section
          style={{
            backgroundColor: "var(--app-muted)",
            borderTop: "1px solid var(--app-border)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 40,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--app-muted-foreground)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  Bài viết cùng chuyên mục
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--app-foreground)",
                    margin: 0,
                  }}
                >
                  Có thể bạn quan tâm
                </h2>
              </div>
              <Link
                href="/blog"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--app-primary)",
                  textDecoration: "none",
                }}
              >
                Xem tất cả bài viết →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
