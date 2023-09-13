import React from "react";
import SwrConfig from "@/components/SwrConfig";
import { BlogPostSkeleton } from "@/api/posts/[id]";
import BlogPost from "@/components/BlogPost";

type PageProps = {
  params: {
    id: string;
  };
};

async function getEntries(id: string): Promise<BlogPostSkeleton> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  const data = await getEntries(id);

  return (
    <SwrConfig value={{ fallbackData: data }}>
      <BlogPost id={id} />
    </SwrConfig>
  );
}

export default Page;
