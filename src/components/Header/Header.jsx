import React from "react";
import userIcon from "../../assets/icons/user.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Busyboard</h1>
          <nav className={styles.navbar}>
            <ul className={styles.menu}>
              <li>
                <a href="/">Дашборд</a>
              </li>
              <li>
                <a href="/">Аналитика</a>
              </li>
              <li>
                <a href="/">Финансы</a>
              </li>
              <li>
                <a href="/">Автоматизация</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.userWrapper}>
          <p>User Name</p>
          <div className={styles.circle}>
            <img src={userIcon} alt="user icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
