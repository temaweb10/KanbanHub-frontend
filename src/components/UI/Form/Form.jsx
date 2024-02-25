import React from "react";
import styles from "./Form.module.scss";
function Form({ children, className }) {
  return <form className={[styles.form, className].join(" ")}>{children}</form>;
}

export default Form;
