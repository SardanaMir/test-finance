import React from "react";
import styles from "./styles.module.scss";
const Button = ({ text, color, backgroundColor }) => {
  return (
    <button
      className={styles.button}
      style={{ color: color, backgroundColor: backgroundColor }}
    >
      {text}
    </button>
  );
};

export default Button;
