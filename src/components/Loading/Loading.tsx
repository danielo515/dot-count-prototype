//@flow
import React from "react";
import styles from "./Loading.module.scss";

type Props = {
  /**
   * If further customization is needed provide a custom class name,
   * it will be applied to the root of the component as the last class,
   * giving it the greatest precedence
   */
  className?: string;
  isLoading: boolean;
};

function Loading({ className, isLoading }: Props) {
  if (!isLoading) return null;
  const classes = [styles.wrapper, className].join(" ").trim();
  return (
    <div className={classes}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

Loading.defaultProps = {
  className: "",
  isLoading: false,
};

export default Loading;
