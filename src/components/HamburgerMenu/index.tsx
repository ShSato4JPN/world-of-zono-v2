"use client";
import styles from "./style.module.scss";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCurrentPage from "@/hooks/useCurrentPage";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";

function HamburgerMenu(): JSX.Element {
  const { path } = useCurrentPage();
  const [isOpen, setOpen] = useState(false);
  // WOZ　のルーティング一覧(path との依存関係のためメモ化)
  const pages = useMemo(() => ["home", "blog", "about", "contact"], []);

  console.log(path);

  const handleClickEvent = useCallback(() => {
    setOpen(() => !isOpen);
  }, [isOpen, setOpen]);

  useEffect(() => {
    const disableScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isOpen) {
      window.addEventListener("touchmove", disableScroll, { passive: false });
    } else {
      window.removeEventListener("touchmove", disableScroll);
    }

    return () => {
      window.removeEventListener("touchmove", disableScroll);
    };
  }, [isOpen]);

  const MenuList = useMemo(
    () => (
      <ul>
        {pages.map((page) => {
          const isCurrent = page === path;
          return (
            <li
              className={`${styles["menu-context__item"]} ${
                isCurrent && styles["menu-context__item-isCurrent"]
              }`}
              key={page}
            >
              <a href={`/${page === "home" ? "" : page}`}>
                <span>{page}</span>
              </a>
            </li>
          );
        })}
      </ul>
    ),
    [path, pages],
  );

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        <AnimatePresence>
          {isOpen && (
            <div className={styles["menu-modal"]} onClick={handleClickEvent}>
              <div className={styles["menu-modal__background"]} />
              <motion.aside
                className={styles["menu-modal__container"]}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "300px",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles["menu-context"]}>
                  <div className={styles["menu-context__container"]}>
                    {MenuList}
                  </div>
                  <div className={styles["menu-context__sns"]}>
                    <a href="/">
                      <AiFillInstagram
                        color="orange"
                        size={40}
                        className={styles["menu-context__sns-instagram"]}
                      />
                    </a>
                    <a href="/">
                      <AiFillTwitterCircle
                        color="orange"
                        size={40}
                        className={styles["menu-context__sns-twitter"]}
                      />
                    </a>
                    <a href="/">
                      <AiFillGithub
                        color="orange"
                        size={40}
                        className={styles["menu-context__sns-github"]}
                      />
                    </a>
                  </div>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HamburgerMenu;
