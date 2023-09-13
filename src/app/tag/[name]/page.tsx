import React from "react";
import SwrConfig from "@/components/SwrConfig";
import { BlogPostsData } from "@/api/posts";
import TagTop from "@/components/TagTop";

type PageProps = {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getEntries(
  name: string,
  page: number,
  range: number,
): Promise<BlogPostsData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tags/${name}?skip=${page}&limit=${range}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

async function Page({
  params: { name },
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const range = 9;
  const page = (Number(searchParams.page || 1) - 1) * range;
  const data = await getEntries(name, page, range);

  console.log(name, range, page);

  return (
    <SwrConfig value={{ fallbackData: data }}>
      <TagTop name={name} range={range} />
    </SwrConfig>
  );
}

export default Page;
