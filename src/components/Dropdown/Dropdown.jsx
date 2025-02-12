import React from "react";
import Select from "react-select";
import iconList from "../../assets/icons/icon_list.svg";
import styles from "./styles.module.scss";

const Dropdown = ({ status }) => {
  const options = [
    { id: 1, value: "Закупочная стоимость", label: "Закупочная стоимость" },
    { id: 2, value: "Вывод ЧП", label: "Вывод ЧП" },
  ];

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const initialOption = options.find((option) => option.id === status);
    setSelectedOption(initialOption);
  }, [status]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const formatOptionLabel = ({ label, id }) => {
    console.log(id);

    const handleClick = () => {
      if (selectedOption?.id === 2) {
        setShowModal(true);
      }
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        <span>{label}</span>
        {id === 2 && (
          <div className={styles.squareOrange} onClick={handleClick}>
            <img
              src={iconList}
              alt=""
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Select
        options={options}
        value={selectedOption}
        placeholder={"Выберите статью!"}
        formatOptionLabel={formatOptionLabel}
        onChange={handleChange}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "8px",
            fontSize: "14px",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "rgba(53, 55, 58, 1)",
            backgroundColor: "rgba(255, 255, 255, 1)",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "inherit",
            display: "flex",
            alignItems: "center",
            // backgroundColor: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "white" : "transparent",
            color: state.isSelected ? "black" : "inherit",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(66, 158, 255, 0.5)",
            },
          }),
        }}
      />
    </>
  );
};

export default Dropdown;
