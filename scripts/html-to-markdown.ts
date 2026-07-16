import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import TurndownService from "turndown";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_ARG = process.argv.find((a) => a.startsWith("--only="));
const ONLY = ONLY_ARG?.slice("--only=".length);

const td = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
  linkStyle: "inlined",
  hr: "---",
});

// Keep interactive form controls and image blocks as HTML.
// Markdown can't represent <input>/<fieldset>, and preserving <figure>
// keeps srcset + captions intact for images from WordPress.
td.keep(["fieldset", "legend", "input", "label", "figure", "figcaption", "iframe", "svg"]);

// Strip Yoast SEO reading-time widget entirely.
td.addRule("drop-yoast-widget", {
  filter: (node) => {
    const cls = (node as HTMLElement).getAttribute?.("class") ?? "";
    return cls.includes("wp-block-yoast-seo-estimated-reading-time");
  },
  replacement: () => "",
});

// Strip <script> tags — WordPress quiz plugin JS that doesn't work on our site anyway
// and just produces noise in the converted markdown.
td.remove(["script", "style"]);

// Turndown treats <br> inside <p> awkwardly; keep the default which turns them into two spaces + newline.

type Summary = { file: string; before: number; after: number; skipped?: boolean; reason?: string };
const summary: Summary[] = [];

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
for (const file of files) {
  if (ONLY && !file.includes(ONLY)) continue;
  const fp = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fp, "utf-8");
  const parsed = matter(raw);
  const content = parsed.content;
  const trimmed = content.trim();

  if (!trimmed.startsWith("<")) {
    summary.push({ file, before: content.length, after: content.length, skipped: true, reason: "already markdown" });
    continue;
  }

  // Rewrite stale absolute URLs (old subdomain) BEFORE conversion so they land as clean links.
  const cleaned = content.replace(/https?:\/\/therapevo\.gagency\.vn\/wp-content\/uploads\//g, "/blog/media/");

  const markdown = td.turndown(cleaned).trim() + "\n";
  summary.push({ file, before: content.length, after: markdown.length });

  if (DRY_RUN) continue;
  const output = matter.stringify("\n" + markdown, parsed.data);
  fs.writeFileSync(fp, output, "utf-8");
}

console.log("\n=== Summary ===");
console.log(`${summary.length} files processed${DRY_RUN ? " (dry-run)" : ""}`);
for (const s of summary) {
  const status = s.skipped ? `skipped (${s.reason})` : `${s.before}B → ${s.after}B`;
  console.log(`  ${s.file}  ${status}`);
}
