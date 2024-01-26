import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import styles from "../Modal/Modal.module.css";
function Modal({ children, visible, setVisible }) {
  console.log(styles);
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalClose}>
          <CloseIcon
            className={styles.modalCloseButton}
            onClick={() => setVisible(false)}
          />
        </div>
        <div className={styles.modalChildrenContent}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
