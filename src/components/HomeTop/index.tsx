"use client";
import styles from "./style.module.scss";
import Fukidashi from "@/components/Fukidashi";

function HomeTop(): JSX.Element {
  const animationType = [styles["swing"], styles["updown"], styles["roll"]];
  const animation =
    animationType[Math.floor(Math.random() * animationType.length)];

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <div className={`${animation}`}>
          <Fukidashi />
        </div>
      </main>
    </div>
  );
}

export default HomeTop;
