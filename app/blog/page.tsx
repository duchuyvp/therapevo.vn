import Link from "next/link";
import Image from "next/image";
import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = { title: "Thư viện tâm lý" };

function readTime(html: string): string {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 250));
  return `${minutes} phút đọc`;
}

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const featured = allPosts[0];
  const categories = getAllCategories();

  return (
    <div>
      {/* Header */}
      <section
        style={{
          backgroundColor: "var(--app-background)",
          borderBottom: "1px solid var(--app-border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "160px 40px 60px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--app-foreground)",
              marginBottom: 20,
              maxWidth: 900,
            }}
          >
            Thư viện tâm lý
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 18,
              fontWeight: 300,
              color: "var(--app-muted-foreground)",
              lineHeight: 1.7,
              maxWidth: 720,
            }}
          >
            Tri thức tâm lý học
            <br />
            được dịch sang ngôn ngữ của cuộc sống
          </p>
        </div>
      </section>

      {/* Featured hero post */}
      {featured && (
        <section
          style={{
            backgroundColor: "var(--app-muted)",
            borderBottom: "1px solid var(--app-border)",
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}
          >
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 40,
                textDecoration: "none",
                color: "inherit",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--app-secondary)",
                }}
              >
                {featured.coverImage && (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 680px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--app-primary)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Bài viết nổi bật · {featured.categories[0]?.name}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 2.6vw, 34px)",
                    fontWeight: 600,
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                    color: "var(--app-foreground)",
                    margin: 0,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "var(--app-muted-foreground)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {featured.excerpt}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: "var(--app-muted-foreground)",
                  }}
                >
                  {readTime(featured.html)} ·{" "}
                  {new Date(featured.date).toLocaleDateString("vi-VN")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--app-primary)",
                    marginTop: 8,
                  }}
                >
                  Đọc bài viết →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter chips */}
      {categories.length > 0 && (
        <section
          style={{
            backgroundColor: "var(--app-background)",
            borderBottom: "1px solid var(--app-border)",
            position: "sticky",
            top: 88,
            zIndex: 50,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "18px 40px",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--app-muted-foreground)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginRight: 8,
              }}
            >
              Chuyên mục
            </span>
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#cat-${c.slug}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--app-foreground)",
                  backgroundColor: "var(--app-card)",
                  border: "1px solid var(--app-border)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  textDecoration: "none",
                }}
              >
                {c.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Per-category sections */}
      <section style={{ backgroundColor: "var(--app-background)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px 40px 100px",
          }}
        >
          {categories.map((cat) => {
            const posts = getPostsByCategory(cat.slug);
            if (posts.length === 0) return null;
            return (
              <div
                key={cat.slug}
                id={`cat-${cat.slug}`}
                style={{ marginBottom: 72, scrollMarginTop: 160 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--app-border)",
                    paddingBottom: 20,
                    marginBottom: 32,
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(24px, 2.8vw, 34px)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "var(--app-foreground)",
                        margin: 0,
                      }}
                    >
                      {cat.name}
                    </h2>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        color: "var(--app-muted-foreground)",
                        marginTop: 6,
                        display: "block",
                      }}
                    >
                      {posts.length} bài viết
                    </span>
                  </div>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--app-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Xem tất cả →
                  </Link>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 24,
                  }}
                >
                  {posts.slice(0, 3).map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
