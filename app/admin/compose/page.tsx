import { ComposeEditor, type AdminPostSummary } from "@/components/admin/ComposeEditor";
import { getAllCategories, getAllPosts } from "@/lib/posts";

export default function ComposePage() {
  const posts: AdminPostSummary[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    categories: post.categories,
    coverImage: post.coverImage,
  }));

  return <ComposeEditor initialPosts={posts} initialCategories={getAllCategories()} />;
}
