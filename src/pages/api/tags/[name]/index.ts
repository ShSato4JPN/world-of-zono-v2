import client from "@/libs/client";
import { BlogPostsSkeleton } from "@/api/posts";

import type { NextApiRequest, NextApiResponse } from "next";

type ApiProps = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.query as ApiProps;
  try {
    const entries = await client.getEntries<BlogPostsSkeleton>({
      content_type: "worldOfZonoV2",
      order: ["-fields.publishedAt"],
      "metadata.tags.sys.id[in]": [name],
    });

    res.json(entries);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
}
