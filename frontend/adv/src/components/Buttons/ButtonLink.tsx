import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--outline2"];

const SIZES = ["btn--medium", "btn--large"];

export const ButtonLink = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to = "/sign-in",
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <Link to={to} className={styles["btn-mobile"]}>
      <button
        className={`${styles.btn} ${styles[checkButtonStyle]} ${styles[checkButtonSize]}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
