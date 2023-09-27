import plainClient from "@/libs/management-client";
import { EntryProps } from "contentful-management";
import type { NextApiRequest, NextApiResponse } from "next";

type WozEntryFormat = {
  title: { "ja-JP": string };
  publishedAt: { "ja-JP": string };
  body: { "ja-JP": string };
  tags: { "ja-JP": string[] };
  thumbnail?: { "ja-JP": string };
  images?: { "ja-JP": string };
};

type ApiProps = {
  id: string;
};

export type PreviewPostData = EntryProps<WozEntryFormat>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query as ApiProps;

  try {
    const entry = (await plainClient.entry.get({
      spaceId: process.env.CONTENTFUL_SPACE_ID || "",
      environmentId: process.env.CONTENTFUL_ENVIRONMENT || "",
      entryId: id,
    })) as PreviewPostData;

    res.json(entry);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
}
