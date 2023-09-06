"use client";
import dayjs from "dayjs";
import styles from "./style.module.scss";

function Footer(): JSX.Element {
  const now = dayjs();
  const copyright = `© ${now.year()} - Copyright world-of-zono, All Rights Reserved.`;

  return (
    <div className={styles["wrapper"]}>
      <footer className={styles["container"]}>
        <span>{copyright}</span>
      </footer>
    </div>
  );
}

export default Footer;
