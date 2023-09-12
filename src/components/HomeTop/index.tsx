"use client";
import styles from "./style.module.scss";
import Image from "next/image";

function HomeTop(): JSX.Element {
  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <div className={styles["message"]}>
          <div className={styles["message__image"]}>
            <Image
              src={"/Fukidashi.svg"}
              alt="fukidashi"
              fill
              objectFit="contain"
            />
          </div>
          <div className={styles["message__text"]}>
            Hi, this is <br />
            <span className={styles["message__text-emphasize"]}>W</span>
            orld <span className={styles["message__text-emphasize"]}>
              O
            </span>f{" "}
            <span className={styles["message__text-emphasize"]}>Z</span>
            ono{" "}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeTop;
