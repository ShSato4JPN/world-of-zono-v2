import React from "react";
import SwrConfig from "@/components/SwrConfig";
import BlogTop from "@/components/BlogTop";
import { BlogPostsData } from "@/api/posts";

async function getPosts(page: number, range: number): Promise<BlogPostsData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts?skip=${page}&limit=${range}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  const range = 9;
  const page = (Number(searchParams.page || 1) - 1) * range;
  const data = await getPosts(page, range);

  return (
    <SwrConfig value={{ fallbackData: data }}>
      <BlogTop range={range} />
    </SwrConfig>
  );
}

export default Page;
