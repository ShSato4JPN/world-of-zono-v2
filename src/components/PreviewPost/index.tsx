"use client";
import useSWR from "swr";
import styles from "@/components/BlogPost/style.module.scss";
import ArticleViewer from "@/components/ArticleViewer";
import dayjs from "dayjs";
import Separator from "@/components/Separator";
import TagsLink from "@/components/TagLink";
import { PreviewPostData } from "@/api/preview/[id]";

type PreviewProps = {
  id: string;
};

function BlogPost({ id }: PreviewProps): JSX.Element {
  const { data } = useSWR<PreviewPostData>(`/api/preview/${id}`);

  const title = data?.fields.title["ja-JP"] || "";
  const body = data?.fields.body["ja-JP"] || "";
  const tags = data?.fields.tags["ja-JP"] || [];
  const publishedAt =
    dayjs(data?.fields.publishedAt["ja-JP"] as string).format("YYYY-MM-DD") ||
    "";

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <article className={styles["article"]}>
          <div className={styles["article__header"]}>
            <div className={styles["article__date"]}>
              <span>🗓️ {publishedAt}</span>
            </div>
            <div className={styles["article__title"]}>
              <span>{title}</span>
            </div>
            <section className={styles["article__tags"]}>
              <TagsLink tags={tags} />
            </section>
          </div>
          <Separator />
          <div className={styles["article__body"]}>
            <ArticleViewer stringHTML={body} />
          </div>
        </article>
      </main>
    </div>
  );
}

export default BlogPost;
