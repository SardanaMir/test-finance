import React from "react";
import Header from "../../components/Header/Header";
import YearFilterButton from "../../components/YearFilterButton/YearFilterButton";
import Filter from "../../components/Filter/Filter";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import tableData from "../../data/tableData.json";
import { useModal } from "../../hooks/useModal";
import styles from "./styles.module.scss";

const MainPage = () => {
  const { isModalOpen, openModal, closeModal, modalData } = useModal();
  const { title: TableDataTitle, body: TableDataBody } = tableData;

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
                    <Dropdown
                      status={item.status}
                      openModal={openModal}
                      item={item}
                    />
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
            modalData={modalData}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
