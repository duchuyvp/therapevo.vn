import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";

function readTime(html: string): string {
  const words = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 250));
  return `${minutes} phút đọc`;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--app-card)",
        border: "1px solid var(--app-border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          backgroundColor: "var(--app-secondary)",
        }}
      >
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 900px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div
        style={{
          padding: "22px 24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {post.categories[0] && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              fontWeight: 600,
              color: "var(--app-primary)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {post.categories[0].name}
          </span>
        )}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--app-foreground)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 300,
            color: "var(--app-muted-foreground)",
            lineHeight: 1.65,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            color: "var(--app-muted-foreground)",
            marginTop: "auto",
          }}
        >
          {readTime(post.html)} · {new Date(post.date).toLocaleDateString("vi-VN")}
        </span>
      </div>
    </Link>
  );
}
