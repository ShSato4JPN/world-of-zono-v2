"use client";
import styles from "./style.module.scss";
import HamburgerMenu from "@/components/HamburgerMenu";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";
import Link from "next/link";
function Header(): JSX.Element {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles["header__hamburger-menu"]}>
            <HamburgerMenu />
          </div>
          <div className={styles["header__site-name"]}>
            <Link href="/">
              <span>World Of Zono</span>
            </Link>
          </div>
          <div className={styles["header__other-links"]}>
            <div className={styles["header__other-links__item"]}>
              <Link href="/">
                <span>Home</span>
              </Link>
            </div>
            <div className={styles["header__other-links__item"]}>
              <Link href="/blog">
                <span>Blog</span>
              </Link>
            </div>
            <div className={styles["header__other-links__item"]}>
              <Link href="/about">
                <span>About</span>
              </Link>
            </div>
            {/* <div className={styles["header__other-links__item"]}>
              <Link href="/contact">
                <span>Contact</span>
              </Link>
            </div> */}
          </div>
          <div className={styles["header__other-links__sns"]}>
            <a href="/" target="_blank" rel="noreferrer noopener">
              <AiFillInstagram
                color="#f4f4f4"
                size={40}
                className={styles["header__other-links__sns-instagram"]}
              />
            </a>
            <a href="/" target="_blank" rel="noreferrer noopener">
              <AiFillTwitterCircle
                color="#f4f4f4"
                size={40}
                className={styles["header__other-links__sns-twitter"]}
              />
            </a>
            <a href="/" target="_blank" rel="noreferrer noopener">
              <AiFillGithub
                color="#f4f4f4"
                size={40}
                className={styles["header__other-links__sns-github"]}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
