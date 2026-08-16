"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { PostCategory } from "@/lib/posts";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export type AdminPostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: PostCategory[];
  coverImage?: string;
};

type SaveResult = {
  ok: true;
  slug: string;
  isUpdate: boolean;
  commitUrl: string;
  commitSha: string;
  postUrl: string;
};

type Notice = { type: "success" | "error"; message: string; url?: string; linkLabel?: string };

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
  display: "block",
  marginBottom: 6,
  color: "var(--app-muted-foreground)",
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

const emptyMarkdown = "# Tiêu đề bài viết\n\nGõ nội dung ở đây. Markdown được hỗ trợ đầy đủ.\n";

export function ComposeEditor({
  initialPosts,
  initialCategories,
}: {
  initialPosts: AdminPostSummary[];
  initialCategories: PostCategory[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [editingSlug, setEditingSlug] = useState<string>();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [postDate, setPostDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategories, setNewCategories] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [markdown, setMarkdown] = useState(emptyMarkdown);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notice, setNotice] = useState<Notice>();

  const derivedSlug = useMemo(
    () => (slugTouched || editingSlug ? slug : slugify(title)),
    [editingSlug, slug, slugTouched, title],
  );

  function resetForm() {
    setEditingSlug(undefined);
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setPostDate("");
    setExcerpt("");
    setSelectedCategories([]);
    setNewCategories("");
    setCoverImage("");
    setMarkdown(emptyMarkdown);
    setUploadMessage("");
    setNotice(undefined);
  }

  async function editPost(post: AdminPostSummary) {
    setLoadingPost(true);
    setNotice(undefined);
    setEditingSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setSlugTouched(true);
    setPostDate(post.date);
    setExcerpt(post.excerpt);
    setSelectedCategories(post.categories.map((category) => category.slug));
    setNewCategories("");
    setCoverImage(post.coverImage || "");
    setMarkdown("");
    setUploadMessage("");

    try {
      const response = await fetch(`/api/admin/posts/${encodeURIComponent(post.slug)}`);
      const data = (await response.json()) as { markdown?: string; error?: string };
      if (!response.ok || typeof data.markdown !== "string") {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      setMarkdown(data.markdown);
    } catch (error: unknown) {
      setNotice({
        type: "error",
        message: `Không thể tải nội dung bài viết: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setLoadingPost(false);
    }
  }

  function toggleCategory(categorySlug: string) {
    setSelectedCategories((current) =>
      current.includes(categorySlug)
        ? current.filter((value) => value !== categorySlug)
        : [...current, categorySlug],
    );
  }

  function buildCategories(): PostCategory[] {
    const map = new Map<string, PostCategory>();
    for (const category of initialCategories) {
      if (selectedCategories.includes(category.slug)) map.set(category.slug, category);
    }
    for (const name of newCategories.split(",").map((value) => value.trim()).filter(Boolean)) {
      const categorySlug = slugify(name);
      if (categorySlug) map.set(categorySlug, { name, slug: categorySlug });
    }
    return Array.from(map.values());
  }

  async function handleCoverUpload(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadMessage("");
    setNotice(undefined);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await response.json()) as { ok?: boolean; url?: string; error?: string };
      if (!response.ok || !data.ok || !data.url) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      setCoverImage(data.url);
      setUploadMessage("Đã tải ảnh lên GitHub. Hãy lưu bài viết để sử dụng ảnh này.");
    } catch (error: unknown) {
      setNotice({
        type: "error",
        message: `Tải ảnh thất bại: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setNotice(undefined);
    const categories = buildCategories();

    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: derivedSlug,
          date: postDate || new Date().toISOString(),
          excerpt: excerpt.trim() || undefined,
          categories,
          coverImage: coverImage.trim() || undefined,
          markdown,
        }),
      });
      const data = (await response.json()) as SaveResult | { error?: string };
      if (!response.ok || !("ok" in data) || !data.ok) {
        throw new Error((data as { error?: string }).error || `HTTP ${response.status}`);
      }

      const summary: AdminPostSummary = {
        slug: data.slug,
        title: title.trim(),
        date: postDate || new Date().toISOString(),
        excerpt: excerpt.trim(),
        categories,
        coverImage: coverImage.trim() || undefined,
      };
      setPosts((current) => [summary, ...current.filter((post) => post.slug !== data.slug)]);
      setEditingSlug(data.slug);
      setSlug(data.slug);
      setSlugTouched(true);
      setPostDate(summary.date);
      setNotice({
        type: "success",
        message: `${data.isUpdate ? "Đã cập nhật" : "Đã đăng"} bài viết ở commit ${data.commitSha}. Hệ thống đang deploy lại.`,
        url: data.commitUrl,
        linkLabel: "Xem commit",
      });
    } catch (error: unknown) {
      setNotice({
        type: "error",
        message: `Lưu bài thất bại: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingSlug) return;
    const postTitle = title || editingSlug;
    if (!window.confirm(`Xóa vĩnh viễn bài “${postTitle}”? Ảnh đã tải lên sẽ được giữ lại.`)) return;

    setDeleting(true);
    setNotice(undefined);
    try {
      const response = await fetch(`/api/admin/posts/${encodeURIComponent(editingSlug)}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as {
        ok?: boolean;
        commitUrl?: string;
        commitSha?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) throw new Error(data.error || `HTTP ${response.status}`);

      setPosts((current) => current.filter((post) => post.slug !== editingSlug));
      resetForm();
      setNotice({
        type: "success",
        message: `Đã xóa bài viết ở commit ${data.commitSha || "mới"}. Hệ thống đang deploy lại.`,
        url: data.commitUrl,
        linkLabel: "Xem commit",
      });
    } catch (error: unknown) {
      setNotice({
        type: "error",
        message: `Xóa bài thất bại: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="admin-compose-shell">
      <header style={{ marginBottom: 28 }}>
        <span style={labelStyle}>Admin · Quản lý bài viết</span>
        <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
          {editingSlug ? "Sửa bài viết" : "Đăng bài mới"}
        </h1>
        <p style={{ color: "var(--app-muted-foreground)", fontSize: 14, marginTop: 8 }}>
          Mỗi thao tác lưu hoặc xóa sẽ tạo commit trên <code>master</code> và tự động deploy.
        </p>
      </header>

      <section className="admin-post-picker">
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Bài viết đã đăng ({posts.length})</label>
          <select
            value={editingSlug || ""}
            onChange={(event) => {
              const post = posts.find((item) => item.slug === event.target.value);
              if (post) void editPost(post);
              else resetForm();
            }}
            disabled={loadingPost || saving || deleting}
            style={inputStyle}
          >
            <option value="">— Chọn bài để sửa hoặc xóa —</option>
            {posts.map((post) => (
              <option key={post.slug} value={post.slug}>
                {post.title}
              </option>
            ))}
          </select>
        </div>
        <button className="admin-secondary-button" onClick={resetForm} type="button">
          + Bài mới
        </button>
        <button
          className="admin-delete-button"
          disabled={!editingSlug || deleting || saving}
          onClick={handleDelete}
          type="button"
        >
          {deleting ? "Đang xóa…" : "Xóa bài"}
        </button>
      </section>

      {loadingPost && <p className="admin-inline-status">Đang tải nội dung mới nhất từ GitHub…</p>}

      <div className="admin-fields-grid">
        <div>
          <label style={labelStyle}>Tiêu đề</label>
          <input value={title} onChange={(event) => setTitle(event.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            value={derivedSlug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
            disabled={Boolean(editingSlug)}
            style={{ ...inputStyle, opacity: editingSlug ? 0.65 : 1 }}
          />
        </div>
        <div className="admin-field-full">
          <label style={labelStyle}>Mô tả ngắn (để trống để tự tạo)</label>
          <input value={excerpt} onChange={(event) => setExcerpt(event.target.value)} style={inputStyle} />
        </div>
        <fieldset className="admin-field-full admin-category-fieldset">
          <legend style={labelStyle}>Chọn chuyên mục</legend>
          <div className="admin-category-grid">
            {initialCategories.map((category) => (
              <label className="admin-category-option" key={category.slug}>
                <input
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  type="checkbox"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
          <input
            value={newCategories}
            onChange={(event) => setNewCategories(event.target.value)}
            placeholder="Chuyên mục mới, phân cách bằng dấu phẩy (nếu có)"
            style={{ ...inputStyle, marginTop: 12 }}
          />
        </fieldset>
        <div className="admin-field-full">
          <label style={labelStyle}>Ảnh bìa</label>
          <div className="admin-cover-row">
            <input
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              placeholder="/blog/media/… hoặc https://…"
              style={inputStyle}
            />
            <label className="admin-upload-button">
              {uploading ? "Đang tải…" : "Tải ảnh từ máy"}
              <input
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploading}
                onChange={(event) => void handleCoverUpload(event.target.files?.[0])}
                type="file"
              />
            </label>
          </div>
          {uploadMessage && <p className="admin-inline-status">{uploadMessage}</p>}
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="admin-cover-preview" src={coverImage} alt="Xem trước ảnh bìa" />
          )}
        </div>
      </div>

      <div data-color-mode="light" style={{ marginBottom: 20 }}>
        <MDEditor
          value={markdown}
          onChange={(value) => setMarkdown(value || "")}
          height={640}
          preview="live"
          textareaProps={{ placeholder: "Viết nội dung bằng Markdown…" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button
          className="admin-primary-button"
          disabled={saving || uploading || loadingPost || !title.trim() || !markdown.trim()}
          onClick={handleSave}
          type="button"
        >
          {saving ? "Đang lưu…" : editingSlug ? "Lưu thay đổi" : "Đăng bài"}
        </button>
        <span style={{ color: "var(--app-muted-foreground)", fontSize: 12 }}>
          Tệp: <code>content/posts/{derivedSlug || "<slug>"}.md</code>
        </span>
      </div>

      {notice && (
        <div className={`admin-notice admin-notice-${notice.type}`} role="status">
          {notice.message}{" "}
          {notice.url && (
            <a href={notice.url} rel="noopener noreferrer" target="_blank">
              {notice.linkLabel || "Mở liên kết"} →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
