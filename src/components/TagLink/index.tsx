"use client";
import styles from "./style.module.scss";
import { useMemo } from "react";
import Link from "next/link";

type TagLinksProps = {
  tags: string[];
};

function TagLinks({ tags }: TagLinksProps): JSX.Element[] {
  const tagsList = useMemo(
    () =>
      tags.map((tags) => (
        <Link
          href={`/tag/${tags}`}
          className={styles["card__tags__item"]}
          key={tags}
        >
          {tags}
        </Link>
      )),
    [tags],
  );

  return tagsList;
}

export default TagLinks;
