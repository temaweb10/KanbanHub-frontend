import React from "react";
import styles from "./Input.module.scss";
function Input(props) {
  console.log(props);
  return <input ref={props.refS} className={styles.input} {...props} />;
}

export default Input;
