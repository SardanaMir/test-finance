import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import errorImg from "../../assets/icons/warning_ic.svg";
import successImg from "../../assets/icons/success_ic.svg";
import styles from "./styles.module.scss";

const Modal = ({ isOpen, modalData, onClose }) => {
  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");
  const [remainingAmount, setRemainingAmount] = React.useState(modalData);
  const isSaveButtonDisabled = !amount1 && !amount2;
  const formattedTotalAmount = new Intl.NumberFormat("ru-RU").format(modalData);

  const ErrorIcon = () => <img src={errorImg} alt="Error" />;
  const SuccessIcon = () => <img src={successImg} alt="Success" />;

  React.useEffect(() => {
    if (amount1 !== "") {
      const calculatedAmount2 = modalData - Number(amount1);
      if (calculatedAmount2 >= 0) {
        setAmount2(String(calculatedAmount2));
      } else {
        setAmount2("");
      }
    }
  }, [amount1, modalData]);

  React.useEffect(() => {
    if (amount2 !== "") {
      const calculatedAmount1 = modalData - Number(amount2);
      if (calculatedAmount1 >= 0) {
        setAmount1(String(calculatedAmount1));
      } else {
        setAmount1("");
      }
    }
  }, [amount2, modalData]);

  React.useEffect(() => {
    let calculatedRemainingAmount =
      modalData - (Number(amount1) || 0) - (Number(amount2) || 0);
    if (calculatedRemainingAmount < 0) {
      calculatedRemainingAmount = 0;
    }

    setRemainingAmount(calculatedRemainingAmount);
  }, [amount1, amount2, modalData]);

  const handleAmount1Change = (event) => {
    let value = Number(event.target.value);
    if (value > modalData) {
      value = modalData;
    }
    if (value < 0) {
      value = 0;
    }
    setAmount1(String(value));
    setAmount2("");
  };

  const handleAmount2Change = (event) => {
    let value = Number(event.target.value);

    if (value > modalData) {
      value = modalData;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sum_for_net_profit_withdrawal = event.target.amount1.value;
    const sum_for_transfer_to_cashbox = event.target.amount2.value;

    const collectedData = {
      id_bank_operation: 0,
      sum_for_net_profit_withdrawal,
      sum_for_transfer_to_cashbox,
    };

    try {
      toast.info("Ожидание", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: "waiting-toast",
        style: {
          backgroundImage:
            "linear-gradient(to right, rgba(132, 150, 175, 1) 18.8%, white 18.9%)",
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "1.2rem",
          width: "340px",
          height: "85px",
          display: "grid",
          gridTemplateColumns: "18.8fr 81.2fr",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        },
        icon: ErrorIcon,
      });
      const response = await axios.post(
        "http://busyboard-test.ru/api/v1/bank/operations/transfer-to-cashbox/",
        collectedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Все изменения успешно сохранены!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundImage:
            "linear-gradient(to right, rgba(132, 150, 175, 1) 18.8%, white 18.9%)",
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "1.2rem",
          width: "340px",
          height: "85px",
          display: "grid",
          gridTemplateColumns: "18.8fr 81.2fr",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        },
        icon: <SuccessIcon />,
      });
      onClose();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        hideProgressBar: true,
        autoClose: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundImage:
            "linear-gradient(to right, rgba(255, 94, 91, 1) 18.8%, white 18.9%)",
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "1.2rem",
          width: "340px",
          height: "85px",
          display: "grid",
          gridTemplateColumns: "18.8fr 81.2fr",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        },
        icon: <ErrorIcon />,
      });
      console.error("Ошибка:", error);
    }
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
              max={modalData}
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
              max={modalData}
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
