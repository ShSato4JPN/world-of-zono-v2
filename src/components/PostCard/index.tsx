"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import CategoriesLink from "@/components/TagLink";

type PostCardProps = {
  slug: {
    postId: string;
    title: string;
    body: string;
    categories: string[];
    publishedAt: string;
    thumbnail: {
      url: string;
      alt: string;
    };
  };
};

function PostCard({
  slug: {
    postId,
    title,
    body,
    categories,
    publishedAt,
    thumbnail: { url, alt },
  },
}: PostCardProps): JSX.Element {
  return (
    <section className={styles["card"]}>
      <div className={styles["card__header"]}>
        <figure className={styles["card__thumbnail"]}>
          <Image src={url} alt={alt} fill />
        </figure>
      </div>
      <div className={styles["card__body"]}>
        <div className={styles["card__date"]}>
          <span>{publishedAt}</span>
        </div>
        <div className={styles["card__title"]}>
          <Link href={`/blog/${postId}`}>
            <h2>{title}</h2>
          </Link>
        </div>
        <div className={styles["card__description"]}>
          <span>{body}</span>
        </div>
        <div className={styles["card__link__button"]}>
          <div className={styles["card__link__button--inner"]}>
            <Link href={`/blog/${postId}`}>
              <span>続きを読む</span>
            </Link>
          </div>
        </div>
        <div className={styles["card__categories"]}>
          <CategoriesLink categories={categories} />
        </div>
      </div>
    </section>
  );
}

export default PostCard;
