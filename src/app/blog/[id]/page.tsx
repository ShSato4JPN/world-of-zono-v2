import React from "react";
import SwrConfig from "@/components/SwrConfig";
import BlogPost from "@/components/BlogPost";
import { removeTagString, existsThumbnail } from "@/libs/utils";
import { BlogPostData } from "@/api/posts/[id]";
import BlogAssetLinkType from "@/types/contentful-types";

type PageProps = {
  params: {
    id: string;
  };
};

async function getPost<T>(id: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  const data = await getPost<BlogPostData>(id);

  return (
    <SwrConfig value={{ fallbackData: data }}>
      <BlogPost id={id} />
    </SwrConfig>
  );
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const data = await getPost<BlogPostData>(id);

  const title = data.fields.title as string;
  const description = removeTagString(data.fields.body as string).slice(0, 100);
  const thumbnail = (data.fields.thumbnail || {}) as BlogAssetLinkType;
  const url = existsThumbnail(thumbnail)
    ? `https:${thumbnail.fields.file.url}`
    : `/no-image.webp`;
  const alt = existsThumbnail(thumbnail)
    ? thumbnail.fields.title
    : "World Of Zono";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "World Of Zono",
      images: {
        url: url,
        alt: alt,
        width: "400",
        height: "201",
      },
    },
  };
}

export default Page;
