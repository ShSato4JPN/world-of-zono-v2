"use client";
import { BlogPostData } from "@/api/posts/[id]";
import useSWR from "swr";
import ArticleViewer from "@/components/ArticleViewer";
import styles from "./style.module.scss";
import dayjs from "dayjs";
import Separator from "@/components/Separator";
import TagsLink from "@/components/TagLink";

type BlogPostProps = {
  id: string;
};

function BlogPost({ id }: BlogPostProps): JSX.Element {
  const { data } = useSWR<BlogPostData>(`/api/posts/${id}`);

  const title = data?.fields.title as string;
  const body = data?.fields.body as string;
  const tags = data?.fields.tags as string[];
  const publishedAt = dayjs(data?.fields.publishedAt as string).format(
    "YYYY-MM-DD",
  );

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
