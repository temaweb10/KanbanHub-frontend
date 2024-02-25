import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useContext, useRef, useState } from "react";
import axios from "../../axios";
import { BoardContext } from "../../context/BoardContext";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import styles from "./ModalInviteUser.module.scss";
function ModalInviteUser({ setModal, modal }) {
  const { projectContext, updateData } = useContext(BoardContext);

  const [inviteLink, setInviteLink] = useState("");
  const [linkIsLoading, setLinkIsLoading] = useState(true);
  const copyInputRef = useRef(null);
  return (
    <Modal
      setVisible={setModal}
      visible={modal}
      title={"Пригласить людей в дашбоард"}
    >
      <>
        <span className={styles.description}>
          Для генерации пригласительной ссылки выберите роль участника команде
        </span>
        <div className={styles.selectContainer}>
          <select
            className={styles.selectRole}
            onChange={(e) => {
              if (e.target.value) {
                axios
                  .get(`/project/${projectContext._id}/generateInviteLink`)
                  .then((res) => {
                    setInviteLink(
                      `http://localhost:3000/accept-invite/${res.data}`
                    );
                    setLinkIsLoading(false);
                  })
                  .catch((err) => {
                    alert(err.response.data.message);
                    setModal(true);
                  });
              } else {
                setLinkIsLoading(true);
              }
            }}
          >
            <option value="">Выберите роль</option>
            <option value="member">Участник</option>
            <option value="admin">Админ</option>
          </select>
        </div>

        {!linkIsLoading && (
          <div className={styles.copyContainer}>
            <Input
              readonly={true}
              placeholder="Текст для копирования еще не был сгенерирован"
              className={styles.copyingText}
              value={inviteLink}
              refS={copyInputRef}
            />
            <ContentCopyIcon
              title={"Скопировать пригласительную ссылку"}
              className={styles.icon}
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                copyInputRef.current.select();
              }}
            />
          </div>
        )}
      </>
    </Modal>
  );
}

export default ModalInviteUser;
