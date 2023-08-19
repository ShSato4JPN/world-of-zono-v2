"use client";
import { BlogPostsData } from "@/api/posts";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import styles from "./style.module.scss";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import React from "react";

function BlogTop(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = (Number(searchParams?.get("page") || 1) - 1) * 5;
  const { data } = useSWR<BlogPostsData>(`/api/posts?skip=${currentPage}`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p>{JSON.stringify(data)}</p>
        <Link href={`/blog?page=${2}`}>linkme</Link>
        <Link href={`/blog?page=${3}`}>link</Link>
        <ReactPaginate
          //pageCount={data?.total || 1}
          pageCount={10}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          breakLabel={"..."}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          pageClassName={styles.page}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          breakClassName={styles.break}
          disabledClassName={styles.disabled}
          forcePage={currentPage}
          onPageChange={(event) => {
            router.push(`/blog?page=${event.selected + 1}`);
          }}
        />
        {/* <div className={styles.wrapper}>
        <div className={styles.inner}>
          <InfiniteScroll
            dataLength={1}
            next={next}
            hasMore={hasMore}
            loader={<div className={styles.loaderWrapper}></div>}
          >
            <p>{JSON.stringify(data)}</p>
          </InfiniteScroll>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default BlogTop;
