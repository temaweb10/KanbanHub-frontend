import React from "react";
import styles from "./NotFound.module.scss";
function NotFound() {
  document.title = "Страница не найдена";
  return (
    <div className={styles.notFound}>
      <span className={styles.codeError}>404</span>
      <span className={styles.errorText}>Страница не найдена</span>
    </div>
  );
}

export default NotFound;
