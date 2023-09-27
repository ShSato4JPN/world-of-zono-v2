import React from "react";
// import SwrConfig from "@/components/SwrConfig";
// import { PreviewPostData } from "@/api/preview/[id]";
import PreviewPost from "@/components/PreviewPost";

type PageProps = {
  params: {
    id: string;
  };
};

// async function getEntries(id: string): Promise<PreviewPostData> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/preview/${id}`, {
//     cache: "no-store",
//   });

//   return res.json();
// }

async function Page({ params: { id } }: PageProps): Promise<JSX.Element> {
  // const data = await getEntries(id);
  // console.dir(data.fields, { depth: null });

  // プレビュー画面の場合は、SWRのキャッシュを使用しない
  return <PreviewPost id={id} />;
}

export default Page;
