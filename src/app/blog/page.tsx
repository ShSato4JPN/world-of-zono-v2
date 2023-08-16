import SwrConfig from "@/components/SwrConfig";
import BlogTop from "@/components/BlogTop";
import { BlogPostsData } from "@/api/posts/route";

async function getEntries(): Promise<BlogPostsData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    cache: "no-store",
  });

  return res.json();
}

async function Page(): Promise<JSX.Element> {
  const data = await getEntries();

  return (
    <>
      <SwrConfig value={{ fallbackData: data }}>
        <BlogTop />
      </SwrConfig>
    </>
  );
}

export default Page;
