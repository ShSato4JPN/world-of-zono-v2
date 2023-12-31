import client from "@/libs/client";
import * as contentful from "contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export type BlogPostsSkeleton = {
  contentTypeId: "worldOfZonoV2";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    body: contentful.EntryFieldTypes.Text;
    tags: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
    thumbnail?: contentful.EntryFieldTypes.AssetLink;
  };
};

export type BlogPostsData = contentful.EntryCollection<BlogPostsSkeleton>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const skip = Number(req.query.skip?.at(0) || 0);
  const limit = Number(req.query.limit?.at(0) || 8);

  const entries = await client.getEntries<BlogPostsSkeleton>({
    content_type: "worldOfZonoV2",
    order: ["-fields.publishedAt"],
    limit,
    skip,
  });

  res.json(entries);
}
