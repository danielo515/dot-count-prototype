import React from "react";
import styles from "./Button.module.scss";

type Props = {
  /**
   * If further customization is needed provide a custom class name,
   * it will be applied to the root of the component as the last class,
   * giving it the greatest precedence
   */
  className: string;
  children: JSX.Element;
  disabled: boolean;
  onClick: () => void;
};

function Button({ className, children, disabled, onClick }: Props) {
  const classes = [styles.wrapper, disabled ? styles.disabled : "", className]
    .join(" ")
    .trim();
  return (
    <div className={classes}>
      <button type="button" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}

Button.defaultProps = {
  className: "",
  disabled: false,
};

export default Button;
