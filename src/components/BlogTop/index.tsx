"use client";
import { BlogPostsData } from "@/api/posts";
import useCurrentPage from "@/hooks/useCurrentPage";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import useSWR from "swr";
import { BlogAssetLinkType } from "@/types/contentful-types";
import styles from "./style.module.scss";
import Separator from "@/components/Separator";
import { useMemo } from "react";
import dayjs from "dayjs";

type BlogTopProps = {
  range: number;
};

function BlogTop({ range }: BlogTopProps): JSX.Element {
  const { path, currentPage } = useCurrentPage();
  const skip = (currentPage - 1) * range;
  const { data } = useSWR<BlogPostsData>(
    `/api/posts?skip=${skip}?limit=${range}`,
  );
  const totalPages = Math.ceil((data?.total || 1) / range);

  const existsThumbnail = (thumbnail: BlogAssetLinkType): boolean =>
    0 < Object.keys(thumbnail).length;

  const cards = useMemo(
    () =>
      data?.items.map((v) => {
        const postId = v.sys.id;
        const title = v.fields.title as string;
        const body = v.fields.body as string;
        // body の内容を整形する
        const shapedBody = body.replace(/<br\s*\/>/g, " ");
        const categories = v.fields.category as string[];
        const publishedAt = dayjs(v.fields.publishedAt as string).format(
          "YYYY-MM-DD",
        );
        const thumbnail = (v.fields?.thumbnail || {}) as BlogAssetLinkType;
        const url = existsThumbnail(thumbnail)
          ? `https://${thumbnail.fields.file.url}`
          : `/no-image.svg`;
        const alt = existsThumbnail(thumbnail)
          ? thumbnail.fields.title
          : "no image";

        return (
          <PostCard
            slug={{
              postId,
              title,
              body: shapedBody,
              categories,
              publishedAt,
              thumbnail: {
                url,
                alt,
              },
            }}
            key={postId}
          />
        );
      }) || [],
    [data],
  );

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <div className={styles["blog__information"]}>
          <h1 className={styles["blog__information__message"]}>
            不定期でブログを更新しています
            <br />
            主に開発技術や趣味のギターや植物の記事を書いていこうと思います
          </h1>
        </div>
        <div className={styles["cards"]}>{cards}</div>

        <div className={styles["pagination"]}>
          <Pagination
            path={path}
            totalPages={totalPages}
            current={currentPage}
          />
        </div>
      </main>
    </div>
  );
}

export default BlogTop;
