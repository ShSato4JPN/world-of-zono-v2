"use client";
import styles from "./style.module.scss";
import Image from "next/image";

function Fukidashi(): JSX.Element {
  return (
    <div className={styles["fukidashi"]}>
      <div className={styles["fukidashi__message"]}>
        <div className={styles["fukidashi__message__image"]}>
          <Image
            src={"/Fukidashi.svg"}
            alt="fukidashi"
            fill
            objectFit="contain"
            priority={true}
          />
        </div>
        <div className={styles["fukidashi__message__text"]}>
          Hi, this is <br />
          <span className={styles["fukidashi__message__text-emphasize"]}>
            W
          </span>
          orld{" "}
          <span className={styles["fukidashi__essage__text-emphasize"]}>O</span>
          f{" "}
          <span className={styles["fukidashi__message__text-emphasize"]}>
            Z
          </span>
          ono{" "}
        </div>
      </div>
    </div>
  );
}

export default Fukidashi;
