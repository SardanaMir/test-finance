import React, { useState } from "react";
import styles from "./styles.module.scss";
import ArrowLeft from "../../assets/icons/arrow_left.svg";
import ArrowRight from "../../assets/icons/arrow_right.svg";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <li
          key={number}
          className={`${styles.pageItem} ${
            number === currentPage ? styles.active : ""
          }`}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </li>
      ));
    } else {
      let renderedNumbers = [];

      if (currentPage <= 3) {
        renderedNumbers = pageNumbers.slice(0, 3);
        renderedNumbers.push("...");
        renderedNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        renderedNumbers.push(1);
        renderedNumbers.push("...");
        renderedNumbers = renderedNumbers.concat(
          pageNumbers.slice(totalPages - 2, totalPages)
        );
      } else {
        renderedNumbers.push(1);
        renderedNumbers.push("...");
        renderedNumbers.push(currentPage);
        renderedNumbers.push("...");
        renderedNumbers.push(totalPages);
      }

      return renderedNumbers.map((number, index) => (
        <li
          key={index}
          className={`${styles.pageItem} ${
            number === currentPage ? styles.active : ""
          } ${number == "..." ? styles.dots : ""}`}
          onClick={() => (number != "..." ? handlePageClick(number) : null)}
        >
          {number}
        </li>
      ));
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.pageItemArrow} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <img src={ArrowLeft} alt="arrow" />
      </li>
      {renderPageNumbers()}
      <li
        className={`${styles.pageItemArrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <img src={ArrowRight} alt="arrow" />
      </li>
    </ul>
  );
};

export default Pagination;
