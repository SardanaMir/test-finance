import React from "react";
import arrowDown from "../../assets/icons/arrow down.svg";
import styles from "./styles.module.scss";

const YearFilterButton = () => {
  return (
    <div className={styles.btn}>
      2025
      <img src={arrowDown} alt="arrow down" />
    </div>
  );
};

export default YearFilterButton;
