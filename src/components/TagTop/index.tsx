"use client";
import { BlogPostsData } from "@/api/posts";
import useCurrentPage from "@/hooks/useCurrentPage";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import useSWR from "swr";
import { BlogAssetLinkType } from "@/types/contentful-types";
import styles from "./style.module.scss";
import { useMemo } from "react";
import dayjs from "dayjs";

type TagTopProps = {
  name: string;
  range: number;
};

function TagTop({ name, range }: TagTopProps): JSX.Element {
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
          ? `https:${thumbnail.fields.file.url}`
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
        <div className={styles["tag__information"]}>
          <p className={styles["tag__information__text"]}>
            <span className={styles["tag__information__text-bold"]}>
              {name}
            </span>
            の記事一覧
          </p>
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

export default TagTop;
