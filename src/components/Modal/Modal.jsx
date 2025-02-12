import React from "react";
import axios from "axios";
import styles from "./styles.module.scss";

const Modal = ({ isOpen, onClose, totalAmount }) => {
  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");
  const [remainingAmount, setRemainingAmount] = React.useState(totalAmount);
  const isSaveButtonDisabled = !amount1 && !amount2;
  const formattedTotalAmount = new Intl.NumberFormat("ru-RU").format(
    totalAmount
  );

  React.useEffect(() => {
    if (amount1 !== "") {
      const calculatedAmount2 = totalAmount - Number(amount1);
      if (calculatedAmount2 >= 0) {
        setAmount2(String(calculatedAmount2));
      } else {
        setAmount2("");
      }
    }
  }, [amount1, totalAmount]);

  React.useEffect(() => {
    if (amount2 !== "") {
      const calculatedAmount1 = totalAmount - Number(amount2);
      if (calculatedAmount1 >= 0) {
        setAmount1(String(calculatedAmount1));
      } else {
        setAmount1("");
      }
    }
  }, [amount2, totalAmount]);

  React.useEffect(() => {
    let calculatedRemainingAmount =
      totalAmount - (Number(amount1) || 0) - (Number(amount2) || 0);
    if (calculatedRemainingAmount < 0) {
      calculatedRemainingAmount = 0;
    }

    setRemainingAmount(calculatedRemainingAmount);
  }, [amount1, amount2, totalAmount]);

  const handleAmount1Change = (event) => {
    let value = Number(event.target.value);
    if (value > totalAmount) {
      value = totalAmount;
    }
    if (value < 0) {
      value = 0;
    }
    setAmount1(String(value));
    setAmount2("");
  };

  const handleAmount2Change = (event) => {
    let value = Number(event.target.value);

    if (value > totalAmount) {
      value = totalAmount;
    }
    if (value < 0) {
      value = 0;
    }
    setAmount2(String(value));
    setAmount1("");
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const sum_for_net_profit_withdrawal = event.target.amount1.value;
    const sum_for_transfer_to_cashbox = event.target.amount2.value;

    const collectedData = {
      id_bank_operation: 0,
      sum_for_net_profit_withdrawal,
      sum_for_transfer_to_cashbox,
    };

    axios
      .post(
        "http://busyboard-test.ru/api/v1/bank/operations/transfer-to-cashbox/",
        collectedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Успешный ответ:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.subtitle}>Детализация платежа</div>
        <form className={styles.modalWrapper} onSubmit={handleSubmit}>
          <div className={styles.block}>
            <label htmlFor="totalAmount">Общая сумма платежа</label>
            <input
              type="text"
              id="totalAmount"
              className={styles.inputNum}
              value={formattedTotalAmount}
              readOnly
            />
          </div>
          <div className={styles.block}>
            <label htmlFor="remainingAmount">Осталось разнести</label>
            <input
              id="remainingAmount"
              type="number"
              value={new Intl.NumberFormat("ru-RU").format(remainingAmount)}
              readOnly
            />
          </div>
          <div className={styles.wrapper}>
            <label htmlFor="amount1">Сумма</label>
            <input
              id="amount1"
              type="number"
              placeholder="Введите сумму оплаты"
              value={amount1}
              min="0"
              max={totalAmount}
              onChange={handleAmount1Change}
              required
            />
          </div>
          <div className={styles.wrapper}>
            <label htmlFor="operationType1">Тип операции</label>
            <input
              id="operationType1"
              type="text"
              placeholder="Вывод чистой прибыли"
              disabled
            />
          </div>
          <div className={styles.wrapper1}>
            <label htmlFor="amount2">Сумма</label>
            <input
              type="number"
              id="amount2"
              placeholder="Введите сумму оплаты"
              value={amount2}
              onChange={handleAmount2Change}
              min="0"
              max={totalAmount}
              required
            />
          </div>
          <div className={styles.wrapper1}>
            <label>Тип операции</label>
            <input type="text" placeholder="Перенос в кассу" disabled />
          </div>
          <div className={styles.wrapper1}>
            <label htmlFor="cashbox">Касса получателя</label>
            <input
              type="number"
              id="cashbox"
              placeholder="Введите сумму"
              disabled
            />
          </div>
          <div className={styles.btnWrapper}>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isSaveButtonDisabled}
            >
              Сохранить
            </button>
            <button onClick={onClose} className={styles.btnCancel}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
