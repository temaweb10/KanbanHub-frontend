import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import styles from "../Modal/Modal.module.css";
function Modal({ children, visible, setVisible, title ,haveClose,className}) {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={[styles.myModalContent,className].join(' ')}
        onClick={(e) => e.stopPropagation()}

      >

          {haveClose === undefined && <div
              className={styles.modalClose}
              style={
                  !title
                      ? {justifyContent: "flex-end"}
                      : {justifyContent: "space-between"}
              }
          >
              {title && <h3 className={styles.modalTitle}>{title}</h3>}
              <CloseIcon
                  className={styles.modalCloseButton}
                  onClick={() => setVisible(false)}
              />
          </div> }
          <div className={styles.modalChildrenContent}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
