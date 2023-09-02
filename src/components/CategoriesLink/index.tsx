"use client";
import styles from "./style.module.scss";
import { useMemo } from "react";
import Link from "next/link";

type CategoriesLinkProps = {
  categories: string[];
};

function CategoriesLink({ categories }: CategoriesLinkProps): JSX.Element[] {
  const categoriesList = useMemo(
    () =>
      categories.map((category) => (
        <Link
          href={`/category/${category}`}
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

export default CategoriesLink;
