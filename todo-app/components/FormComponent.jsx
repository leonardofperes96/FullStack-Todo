import React from "react";
import styles from "./FormComponent.module.css";
const FormComponent = ({ id, onChange, value, type, name }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{name}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default FormComponent;
