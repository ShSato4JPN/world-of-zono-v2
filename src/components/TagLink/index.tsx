"use client";
import styles from "./style.module.scss";
import { useMemo } from "react";
import Link from "next/link";

type TagLinksProps = {
  categories: string[];
};

function TagLinks({ categories }: TagLinksProps): JSX.Element[] {
  const categoriesList = useMemo(
    () =>
      categories.map((category) => (
        <Link
          href={`/tag/${category}`}
          className={styles["card__categories__item"]}
          key={category}
        >
          {category}
        </Link>
      )),
    [categories],
  );

  return categoriesList;
}

export default TagLinks;
