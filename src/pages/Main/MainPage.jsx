import React from "react";
import Header from "../../components/Header/Header";
import YearFilterButton from "../../components/YearFilterButton/YearFilterButton";
import Filter from "../../components/Filter/Filter";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import FilterBtn from "../../assets/icons/ic_filter 16.svg";
import styles from "./styles.module.scss";

const TableDataTitle = [
  "Дата",
  "Приход",
  "Расход",
  "Банк",
  "Контрагент",
  "Статья",
  "Описание",
];
const TableDataBody = [
  {
    id: 1,
    date: "10.01.2025",
    amount: 555000,
    cost: 10000,
    bank: "Точка",
    contractor: "Общество с ограниченной отвественностью “Интернет Решения”",
    status: 0,
    description:
      "Отчет за период Отчет за период период Отчет за период Отчет за период период п...",
  },
  {
    id: 2,
    date: "10.01.2025",
    amount: 444000,
    cost: 9000,
    bank: "Точка",
    contractor: "Общество с ограниченной отвественностью “Интернет Решения”",
    status: 1,
    description:
      "Отчет за период Отчет за период период Отчет за период Отчет за период период п...",
  },
  {
    id: 3,
    date: "10.01.2025",
    amount: 333000,
    cost: 11000,
    bank: "Точка",
    contractor: "Общество с ограниченной отвественностью “Интернет Решения”",
    status: 2,
    description:
      "Отчет за период Отчет за период период Отчет за период Отчет за период период п...",
  },
  {
    id: 4,
    date: "10.01.2025",
    amount: 222000,
    cost: 2200,
    bank: "Точка",
    contractor: "Общество с ограниченной отвественностью “Интернет Решения”",
    status: 1,
    description:
      "Отчет за период Отчет за период период Отчет за период Отчет за период период п...",
  },
];

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatNumber = (number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        <div className={styles.subtitle}>Банки</div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.block}>
            <div className={styles.wrapper}>
              <YearFilterButton />
              <Filter />
            </div>
            <div className={styles.btnWrapper}>
              <Button
                text="Загрузить выписку"
                color="rgba(66, 158, 255, 1)"
                backgroundColor="rgba(234, 245, 255, 1)"
              />
              <Button
                text="Правила"
                color="white"
                backgroundColor="rgba(66, 158, 255, 1)"
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                {TableDataTitle.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TableDataBody.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td>{item.date}</td>
                  <td>{formatNumber(item.amount)}</td>
                  <td>{formatNumber(item.cost)}</td>
                  <td>{item.bank}</td>
                  <td>{item.contractor}</td>
                  <td className={styles.dropdownBlock}>
                    <Dropdown status={item.status} openModal={openModal} />
                  </td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination totalPages={5} currentPage={1} onPageChange />
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            totalAmount={100000}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
