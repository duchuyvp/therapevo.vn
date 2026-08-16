import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";

function readTime(html: string): string {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 250));
  return `${minutes} phút đọc`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function Insights({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="insights"
      style={{
        backgroundColor: "var(--app-background)",
        borderTop: "1px solid var(--app-border)",
      }}
    >
      <div className="insights-shell">
        <div className="insights-heading">
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
                marginBottom: 16,
              }}
            >
              04 — Thư viện tâm lý
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 3vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.16,
                letterSpacing: "-0.02em",
                color: "var(--app-foreground)",
                margin: 0,
              }}
            >
              Tri thức tâm lý học
              <br />
              được dịch sang ngôn ngữ của cuộc sống
            </h2>
          </div>
          <Link className="insights-all-link" href="/blog">
            Xem tất cả bài viết →
          </Link>
        </div>

        <div className="insights-grid">
          {posts.slice(0, 5).map((post) => (
            <Link className="insights-card" href={`/blog/${post.slug}`} key={post.slug}>
              <div className="insights-card-image">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 240px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="insights-card-content">
                {post.categories[0] && (
                  <span className="insights-card-category">{post.categories[0].name}</span>
                )}
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="insights-card-meta">
                  {readTime(post.html)} · {formatDate(post.date)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
