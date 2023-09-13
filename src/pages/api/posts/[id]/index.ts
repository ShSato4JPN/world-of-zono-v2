import client from "@/libs/client";
import * as contentful from "contentful";

import type { NextApiRequest, NextApiResponse } from "next";

type ApiProps = {
  id: string;
};

export type BlogPostSkeleton = {
  contentTypeId: "worldOfZonoV2";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    body: contentful.EntryFieldTypes.Text;
    category: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
    thumbnail?: contentful.EntryFieldTypes.AssetLink;
    images?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.AssetLink>;
  };
};

export type BlogPostData = contentful.Entry<BlogPostSkeleton>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query as ApiProps;
  try {
    const entry = await client.getEntry<BlogPostSkeleton>(id);

    res.json(entry);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
}
