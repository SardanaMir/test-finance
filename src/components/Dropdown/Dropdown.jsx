import React from "react";
import Select from "react-select";
import iconList from "../../assets/icons/icon_list.svg";
import styles from "./styles.module.scss";

const Dropdown = ({ status, openModal }) => {
  const options = [
    { id: 1, value: "Закупочная стоимость", label: "Закупочная стоимость" },
    { id: 2, value: "Вывод ЧП", label: "Вывод ЧП" },
  ];

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  React.useEffect(() => {
    const initialOption = options.find((option) => option.id === status);
    setSelectedOption(initialOption);
  }, [status]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleIconClick = () => {
    openModal();
  };

  const formatOptionLabel = ({ label, id }) => {
    const isSelected = selectedOption?.id === id;
    return (
      <div className={styles.selectOption}>
        <span>{label}</span>
        {id === 2 && isSelected && (
          <div className={styles.squareOrange} onClick={handleIconClick}>
            <img src={iconList} alt="Список" className={styles.iconList} />
          </div>
        )}
      </div>
    );
  };

  const handleMenuOpen = () => {
    if (selectedOption?.id !== 2) {
      setMenuIsOpen(true);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
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
  };

  return (
    <>
      <Select
        options={options}
        value={selectedOption}
        placeholder={"Выберите статью!"}
        formatOptionLabel={formatOptionLabel}
        onChange={handleChange}
        isSearchable={false}
        onMenuOpen={handleMenuOpen}
        onMenuClose={() => setMenuIsOpen(false)}
        menuIsOpen={menuIsOpen}
        styles={customStyles}
      />
    </>
  );
};

export default Dropdown;
