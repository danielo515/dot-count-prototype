import React from "react";
import styles from "./Tobar.module.scss";
import { Button } from "../components";
import Back from "@material-ui/icons/ArrowBack";

export default function TopBar({ count, reset }) {
  return (
    <div className={styles.wrapper}>
      <Button onClick={reset}>
        <Back />
      </Button>
      <div>Items: {count}</div>
    </div>
  );
}
