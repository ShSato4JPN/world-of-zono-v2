"use client";
// import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
// import { BlogPostsData } from "src/app/api/posts/route";
// import queryString from "query-string";
// import InfiniteScroll, { Props } from "react-infinite-scroll-component";
// import { useMemo, useCallback, useState } from "react";
// import styles from "./style.module.scss";

// const getKey: SWRInfiniteKeyLoader<BlogPostsData> = (
//   pageIndex,
//   previousPageData,
// ) => {
//   console.log(
//     queryString.stringifyUrl({
//       url: `${process.env.NEXT_PUBLIC_URL}/api/posts/`,
//       query: {
//         skip: pageIndex * 5,
//         limit: 1,
//       },
//     }),
//   );

//   return previousPageData && !previousPageData.items.length
//     ? null
//     : queryString.stringifyUrl({
//         url: `${process.env.NEXT_PUBLIC_URL}/api/posts/`,
//         query: {
//           skip: pageIndex * 5,
//           limit: 5,
//         },
//       });
// };

function BlogTop(): JSX.Element {
  // const { data, size, setSize } = useSWRInfinite<BlogPostsData>(getKey);
  // const [test, setTest] = useState<number>(0);

  // const items = Array.from({ length: 10 }).map((_, i) => i + 1);

  // const next = useCallback<Props["next"]>(() => {
  //   setSize(size + 1);
  // }, [setSize, size]);

  // const hasMore = useMemo<Props["hasMore"]>(() => {
  //   return true;
  // }, [data, items.length]);

  // const clickHandler = () => {
  //   setTest((test) => test + 1);
  //   console.log(test);
  // };
  return (
    <div>
      <p>hello</p>
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
  );
}

export default BlogTop;
