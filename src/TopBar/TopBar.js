import React from "react";
import styles from "./Tobar.module.scss";

export default function TopBar({ count, reset }) {
  return (
    <div className={styles.wrapper}>
      <button onClick={reset}>back</button>
      <div>Items: {count}</div>
    </div>
  );
}

