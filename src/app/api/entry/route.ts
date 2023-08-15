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

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip"));
  const limit = Number(searchParams.get("limit"));

  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "worldOfZonoV2",
    skip: 0,
    limit: 10,
    "fields.category[exists]": true,
    "fields.category[in]": ["test", "error"],
  });

  return new Response(JSON.stringify(entries));
}
