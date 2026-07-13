import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Insights } from "@/components/Insights";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Insights posts={posts} />
    </>
  );
}
