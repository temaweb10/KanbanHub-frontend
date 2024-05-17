import React from "react";
import styles from "./Button.module.scss";
function Button(props) {
  const rootClasses = [styles.button]

  if (props.className) {
    rootClasses.push(props.className);
  }

  return (
    <button disabled={props.isDisabled} style={props.style} className={rootClasses.join(" ")} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
