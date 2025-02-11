import React from "react";
import styles from "./styles.module.scss";

const Filter = () => {
  const options = ["Все статьи", "Разнесены", "Не разнесены"];

  const [activeOption, setActiveOption] = React.useState(0);

  const handleClick = (index) => {
    setActiveOption(index);
  };

  return (
    <div className={styles.filterSwitcher}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.filterOption} ${
            index === activeOption ? styles.active : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Filter;
