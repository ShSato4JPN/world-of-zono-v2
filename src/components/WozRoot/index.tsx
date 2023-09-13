"use client";
import styles from "./style.module.scss";
import { ReactNode } from "react";

function WozRoot({ children }: { children: ReactNode }): JSX.Element {
  return <div className={styles["wrapper"]}>{children}</div>;
}

export default WozRoot;
