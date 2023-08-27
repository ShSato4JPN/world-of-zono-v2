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

type BlogTopProps = {
  range: number;
};

function BlogTop({ range }: BlogTopProps): JSX.Element {
  const { path, currentPage } = useCurrentPage();
  const skip = (currentPage - 1) * range;
  const { data } = useSWR<BlogPostsData>(`/api/posts?skip=${skip}`);
  const totalPages = Math.ceil((data?.total || 1) / range);

  const existsThumbnail = (thumbnail: BlogAssetLinkType): boolean =>
    0 < Object.keys(thumbnail).length;

  const items = useMemo(
    () =>
      data?.items.map((v) => {
        const postId = v.sys.id;
        const title = v.fields.title as string;
        const body = v.fields.body as string;
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
              body,
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
        <div className={styles["cards"]}>{items}</div>
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
