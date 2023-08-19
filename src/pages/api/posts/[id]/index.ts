import client from "@/libs/client";
import { Entry } from "contentful";
import { BlogPostSkeleton } from "@/api/posts";

import type { NextApiRequest, NextApiResponse } from "next";

type ApiProps = {
  id: string;
};

export type PostData = Entry<BlogPostSkeleton>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query as ApiProps;
  try {
    const entry = await client.getEntry<BlogPostSkeleton>(id as string);
    res.json(entry);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
}
