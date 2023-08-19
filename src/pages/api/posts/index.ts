import client from "@/libs/client";
import * as contentful from "contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export type BlogPostSkeleton = {
  contentTypeId: "worldOfZonoV2";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    body: contentful.EntryFieldTypes.Text;
    category: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
  };
};

export type BlogPostsData = contentful.EntryCollection<BlogPostSkeleton>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const skip = Number(req.query.skip || 0);
  const limit = Number(req.query.limit || 5);

  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "worldOfZonoV2",
    order: ["-fields.publishedAt"],
    limit,
    skip,
  });

  res.json(entries);
}
