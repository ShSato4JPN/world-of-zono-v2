"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import { useMemo } from "react";
import React from "react";

type PaginationProps = {
  path: string;
  totalPages: number;
  current: number;
};

function Pagination({
  path,
  totalPages,
  current,
}: PaginationProps): JSX.Element {
  const showNumbers = useMemo(() => {
    const numbers = Array.from({ length: totalPages })
      .map((_, i) => i + 1)
      .filter(
        (n) =>
          n === 1 ||
          n === totalPages ||
          n === current ||
          n === current - 1 ||
          n === current + 1 ||
          (current <= 2 && (n === 3 || n === 4)) ||
          (totalPages - 2 <= current &&
            (n === totalPages - 2 || n === totalPages - 3)),
      );
    // 1 ページと 2 ページの間のセパレータ
    if (6 <= totalPages && 4 <= current) {
      numbers.splice(1, 0, -1);
    }
    // 最後のページと最後から 2 番目のページの間のセパレータ
    if (5 < totalPages && current <= totalPages - 3) {
      numbers.splice(-1, 0, -2);
    }

    return numbers;
  }, [totalPages, current]);

  const LinkNumbers = useMemo(() => {
    return showNumbers.map((n) => {
      if (n < 0) {
        return (
          <li key={n === -1 ? "first-break" : "second-break"}>
            <div className={styles.break}>
              <span>...</span>
            </div>
          </li>
        );
      } else {
        return (
          <li key={`${path}?page=${n}`}>
            <Link
              className={`${styles.item} ${n === current && styles.current}`}
              href={`${path}?page=${n}`}
            >
              <span>{n}</span>
            </Link>
          </li>
        );
      }
    });
  }, [showNumbers, path, current]);

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pageNumbers}>{LinkNumbers}</ul>
    </nav>
  );
}

export default Pagination;
