"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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

type SaveResult =
  | { ok: true; slug: string; isUpdate: boolean; commitUrl: string; commitSha: string; postUrl: string }
  | { ok: false; error: string };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--app-border)",
  borderRadius: "var(--radius)",
  backgroundColor: "var(--app-card)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "var(--app-foreground)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--app-muted-foreground)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

export default function ComposePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [categoriesInput, setCategoriesInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [markdown, setMarkdown] = useState<string>(
    "# Tiêu đề bài viết\n\nGõ nội dung ở đây. Markdown được hỗ trợ đầy đủ.\n",
  );
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<SaveResult | undefined>();

  const derivedSlug = useMemo(() => slug || slugify(title), [slug, title]);

  async function handleSave() {
    setSaving(true);
    setResult(undefined);
    const categories = categoriesInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((name) => ({ name, slug: slugify(name) }));

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: derivedSlug,
          date: new Date().toISOString(),
          excerpt: excerpt.trim() || undefined,
          categories,
          coverImage: coverImage.trim() || undefined,
          markdown,
        }),
      });
      const data = (await res.json()) as SaveResult | { error: string };
      if (res.ok && "ok" in data && data.ok) {
        setResult(data);
      } else {
        setResult({ ok: false, error: (data as { error?: string }).error || `HTTP ${res.status}` });
      }
    } catch (e: unknown) {
      setResult({ ok: false, error: e instanceof Error ? e.message : String(e) });
    }
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 32px 60px" }}>
      <header style={{ marginBottom: 32 }}>
        <span style={labelStyle}>Admin</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Compose new post
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--app-muted-foreground)",
            marginTop: 8,
          }}
        >
          Publishing commits a new file to <code>content/posts/</code> on <code>master</code>. CI deploys ~1 min later.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            placeholder="Tiêu đề bài viết"
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            type="text"
            value={slugTouched ? slug : derivedSlug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            style={inputStyle}
            placeholder="auto-derived from title"
          />
        </div>
        <div style={{ gridColumn: "1 / span 2" }}>
          <label style={labelStyle}>Excerpt (optional — auto-derived from first ~300 chars)</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            style={inputStyle}
            placeholder="Short summary"
          />
        </div>
        <div>
          <label style={labelStyle}>Categories (comma-separated names)</label>
          <input
            type="text"
            value={categoriesInput}
            onChange={(e) => setCategoriesInput(e.target.value)}
            style={inputStyle}
            placeholder="Tâm lý học lâm sàng, Mẹo hay tâm lý"
          />
        </div>
        <div>
          <label style={labelStyle}>Cover image URL (optional)</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            style={inputStyle}
            placeholder="/blog/media/…/photo.jpg or https://…"
          />
        </div>
      </div>

      <div data-color-mode="light" style={{ marginBottom: 20 }}>
        <MDEditor
          value={markdown}
          onChange={(v) => setMarkdown(v || "")}
          height={640}
          preview="live"
          textareaProps={{
            placeholder: "Write your post in Markdown…",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim() || !markdown.trim()}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--app-primary-foreground)",
            backgroundColor: "var(--app-primary)",
            padding: "12px 28px",
            borderRadius: "var(--radius)",
            border: "none",
            cursor: saving ? "wait" : "pointer",
            opacity: saving || !title.trim() || !markdown.trim() ? 0.6 : 1,
          }}
        >
          {saving ? "Publishing…" : "Publish (commit to master)"}
        </button>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            color: "var(--app-muted-foreground)",
          }}
        >
          Will write <code>content/posts/{derivedSlug || "&lt;slug&gt;"}.md</code>
        </span>
      </div>

      {result && "ok" in result && result.ok && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            backgroundColor: "var(--app-secondary)",
            border: "1px solid var(--app-primary)",
            borderRadius: "var(--radius)",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--app-foreground)",
          }}
        >
          <strong>{result.isUpdate ? "Updated" : "Published"}</strong> · commit{" "}
          <a
            href={result.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--app-primary)" }}
          >
            {result.commitSha}
          </a>
          . GitHub Actions is deploying now. Preview will appear at{" "}
          <a href={result.postUrl} style={{ color: "var(--app-primary)" }}>
            {result.postUrl}
          </a>{" "}
          in ~1 minute.
        </div>
      )}
      {result && !("ok" in result && result.ok) && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            backgroundColor: "#fee",
            border: "1px solid #c33",
            borderRadius: "var(--radius)",
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "#900",
          }}
        >
          <strong>Publish failed:</strong> {(result as { error: string }).error}
        </div>
      )}
    </div>
  );
}
