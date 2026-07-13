import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const MEDIA_ROOT = path.join(process.cwd(), "public", "blog", "media");
const URL_PREFIX = "/blog/media/";

type Parsed = { stem: string; ext: string; sizeSuffix: string };

function parseFilename(filename: string): Parsed {
  const ext = path.extname(filename);
  let stem = filename.slice(0, -ext.length);
  const sizeMatch = stem.match(/^(.+)(-\d{2,4}x\d{2,4})$/);
  if (sizeMatch) return { stem: sizeMatch[1], ext, sizeSuffix: sizeMatch[2] };
  const scaledMatch = stem.match(/^(.+)(-scaled)$/);
  if (scaledMatch) return { stem: scaledMatch[1], ext, sizeSuffix: scaledMatch[2] };
  const cropMatch = stem.match(/^(.+)(-e\d{10,})$/);
  if (cropMatch) return { stem: cropMatch[1], ext, sizeSuffix: cropMatch[2] };
  return { stem, ext, sizeSuffix: "" };
}

function isCryptic(stem: string): boolean {
  if (/^image(-\d+)?$/i.test(stem)) return true;
  if (/^\d+(-\d+)*$/.test(stem)) return true;
  if (/^\d{4,}-/.test(stem)) return true;
  if (/^[a-f0-9]{20,}$/i.test(stem)) return true;
  if (/^[a-z0-9_-]{30,}$/i.test(stem)) {
    const letters = stem.match(/[a-z]/gi);
    if (!letters || letters.length < 6) return true;
  }
  return false;
}

type Ref = { post: string; yearMonth: string; filename: string };

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({ file: f, slug: f.replace(/\.md$/, "") }));

const refs: Ref[] = [];
const postContent = new Map<string, string>();

for (const { file, slug } of posts) {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, "utf-8");
  postContent.set(slug, content);
  const urlRegex = /\/blog\/media\/(\d{4}\/\d{2})\/([^"'\s)\]}<>]+)/g;
  for (const m of content.matchAll(urlRegex)) {
    refs.push({ post: slug, yearMonth: m[1], filename: m[2] });
  }
}

const byBase = new Map<string, { posts: Set<string>; variants: Set<string> }>();
for (const r of refs) {
  const p = parseFilename(r.filename);
  const key = `${r.yearMonth}/${p.stem}${p.ext}`;
  if (!byBase.has(key)) byBase.set(key, { posts: new Set(), variants: new Set() });
  const g = byBase.get(key)!;
  g.posts.add(r.post);
  g.variants.add(r.filename);
}

const renameMap = new Map<string, string>();
const perPostSeq = new Map<string, number>();

for (const [key, group] of byBase) {
  const [yearMonth, baseFilename] = [key.slice(0, 7), key.slice(8)];
  const p = parseFilename(baseFilename);
  if (!isCryptic(p.stem)) continue;
  if (group.posts.size !== 1) continue;
  const owner = [...group.posts][0];
  const seq = (perPostSeq.get(owner) ?? 0) + 1;
  perPostSeq.set(owner, seq);
  const newStem = `${owner}-${seq}`;
  for (const filename of group.variants) {
    const parsed = parseFilename(filename);
    const newFilename = `${newStem}${parsed.sizeSuffix}${parsed.ext}`;
    renameMap.set(`${yearMonth}/${filename}`, `${yearMonth}/${newFilename}`);
  }
}

console.log(`Refs found:              ${refs.length}`);
console.log(`Unique base filenames:   ${byBase.size}`);
console.log(`Rename candidates:       ${renameMap.size}`);

let renamedOnDisk = 0;
for (const [oldRel, newRel] of renameMap) {
  const oldPath = path.join(MEDIA_ROOT, oldRel);
  const newPath = path.join(MEDIA_ROOT, newRel);
  if (!fs.existsSync(oldPath)) continue;
  if (fs.existsSync(newPath)) {
    console.warn(`  skip (target exists): ${newRel}`);
    continue;
  }
  fs.renameSync(oldPath, newPath);
  renamedOnDisk++;
}

let filesUpdated = 0;
for (const { file, slug } of posts) {
  let content = postContent.get(slug)!;
  let changed = false;
  for (const [oldRel, newRel] of renameMap) {
    const oldUrl = URL_PREFIX + oldRel;
    const newUrl = URL_PREFIX + newRel;
    if (content.includes(oldUrl)) {
      content = content.split(oldUrl).join(newUrl);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(path.join(POSTS_DIR, file), content, "utf-8");
    filesUpdated++;
  }
}

console.log(`Files renamed on disk:   ${renamedOnDisk}`);
console.log(`.md files updated:       ${filesUpdated}`);

console.log("\n=== Skipped (used by multiple posts) ===");
for (const [key, group] of byBase) {
  const p = parseFilename(key.slice(8));
  if (isCryptic(p.stem) && group.posts.size > 1) {
    console.log(`  ${key}  (used by ${group.posts.size} posts: ${[...group.posts].slice(0, 3).join(", ")}${group.posts.size > 3 ? "..." : ""})`);
  }
}
