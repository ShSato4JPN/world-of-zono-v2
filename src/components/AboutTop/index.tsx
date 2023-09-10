"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";

function AboutTop(): JSX.Element {
  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <header className={styles["header"]}>
          <figure className={styles["header__icon"]}>
            <Image
              src="/user-icon.svg"
              alt={"管理人のイメージ画像です"}
              width={150}
              height={150}
            />
          </figure>
          <div className={styles["header__name"]}>
            <span>サトシ</span>
          </div>
        </header>
        <div className={styles["body"]}>
          <div className={styles["body__text"]}>
            <p>
              都内で Web エンジニアとして働いているサトシです。
              <br />
              このブログは日々の学びをアウトプットするために作成しました。
              <br />
              技術的なこと以外にも、日常や趣味についても書いていこうと思います。
              <br />
            </p>
          </div>
          <div className={styles["body__sns"]}>
            <a href="/">
              <AiFillInstagram
                color="#f4f4f4"
                size={40}
                className={styles["body__sns-instagram"]}
              />
            </a>
            <a href="/">
              <AiFillTwitterCircle
                color="#f4f4f4"
                size={40}
                className={styles["body__sns-twitter"]}
              />
            </a>
            <a href="/">
              <AiFillGithub
                color="#f4f4f4"
                size={40}
                className={styles["body__sns-twitter"]}
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutTop;
