import client from "@/libs/client";
import * as contentful from "contentful";

type BlogPostSkeleton = {
  contentTypeId: "worldOfZonoV2";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    publishedAt: contentful.EntryFieldTypes.Date;
    body: contentful.EntryFieldTypes.Text;
    category: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
  };
};

export type BlogPostsData = contentful.EntryCollection<
  BlogPostSkeleton,
  undefined,
  string
>;

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") || 0);
  const limit = Number(searchParams.get("limit") || 10);

  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "worldOfZonoV2",
    order: ["-fields.publishedAt"],
    limit,
    skip,
  });

  return new Response(JSON.stringify(entries));
}
