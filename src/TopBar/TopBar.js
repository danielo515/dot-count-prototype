import React from "react";
import styles from './Tobar.module.scss'

export default function TopBar({ count }) {
  return <div className={styles.wrapper}>Items: {count}</div>;
}

