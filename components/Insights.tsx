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
  const d = new Date(iso);
  const month = d.toLocaleDateString("vi-VN", { month: "long" });
  return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${d.getFullYear()}`;
}

export function Insights({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts.slice(0, 4);

  return (
    <section
      id="insights"
      style={{
        backgroundColor: "var(--app-background)",
        borderTop: "1px solid var(--app-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--app-muted-foreground)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                04 — Thư viện tâm lý
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 600,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "var(--app-foreground)",
                maxWidth: 560,
              }}
            >
              Tri thức tâm lý học
              <br />
              được dịch sang ngôn ngữ của cuộc sống
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
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              letterSpacing: "0.02em",
              alignSelf: "flex-start",
            }}
          >
            Xem tất cả bài viết →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            style={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "var(--app-secondary)",
              textDecoration: "none",
              borderRadius: "var(--radius)",
              display: "block",
              aspectRatio: "4 / 5",
            }}
          >
            {featured.coverImage && (
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(max-width: 900px) 100vw, 640px"
                style={{ objectFit: "cover" }}
                priority
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(26,35,64,0.94) 40%, rgba(26,35,64,0.15) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "36px 36px",
              }}
            >
              {featured.categories[0] && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--app-accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  {featured.categories[0].name}
                </span>
              )}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#FAFAF8",
                  lineHeight: 1.25,
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "rgba(250,250,248,0.75)",
                  lineHeight: 1.65,
                  marginBottom: 20,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {featured.excerpt}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  color: "rgba(250,250,248,0.55)",
                }}
              >
                {readTime(featured.html)} · {formatDate(featured.date)}
              </span>
            </div>
          </Link>

          {/* Right column: 3 stacked cards */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  backgroundColor: "var(--app-card)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "var(--radius)",
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  textDecoration: "none",
                  color: "inherit",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "var(--app-secondary)",
                    minHeight: 140,
                  }}
                >
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="160px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {article.categories[0] && (
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 9,
                        fontWeight: 600,
                        color: "var(--app-primary)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {article.categories[0].name}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--app-foreground)",
                      lineHeight: 1.4,
                      marginBottom: 8,
                      letterSpacing: "-0.01em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      color: "var(--app-muted-foreground)",
                    }}
                  >
                    {readTime(article.html)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
