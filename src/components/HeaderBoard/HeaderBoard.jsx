import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import stylesBoard from "../../pages/KanbanBoard/KanbanBoard.module.css";
import { logout, selectorIsAuth } from "../../redux/slices/auth";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import styles from "./HeaderBoard.module.scss";
const HeaderBoard = () => {
  const [modal, setModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [linkIsLoading, setLinkIsLoading] = useState(true);
  const copyInputRef = useRef(null);

  const userData = useContext(UserContext);
  const isAuth = Boolean(userData);
  console.log(userData);
  const [menuVisible, setMenuVisible] = useState(false);
  console.log(userData);
  const { projectContext, updateData } = useContext(BoardContext);
  return (
    <div className={styles.header}>
      {/*    <Link className={styles.logo} to="/">
            <div>KANBANHUB</div>
          </Link> */}
      <div className={styles.headerProjectInfo}>
        <Avatar className={styles.avatarProject}>
          {projectContext?.nameProject.slice(0, 1).toUpperCase()}
        </Avatar>

        <span className={styles.projectName}>
          {projectContext?.nameProject}
        </span>
      </div>
      <Modal
        setVisible={setModal}
        visible={modal}
        title={"Пригласить людей в дашбоард"}
      >
        {/*   <Input
            readonly={true}
            placeholder="Текст для копирования еще не был сгенерирован"
            className={styles.copyingText}
          /> */}
        <>
          <span className={stylesBoard.description}>
            Для генерации пригласительной ссылки выберите роль участника команде
          </span>
          <div className={stylesBoard.selectContainer}>
            <select
              className={stylesBoard.selectRole}
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value) {
                  axios
                    .get(`/project/${projectContext._id}/generateInviteLink`)
                    .then((res) => {
                      console.log(res.data);
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
              {/*   text.select();
               */}
            </select>
          </div>

          {!linkIsLoading ? (
            <div className={stylesBoard.copyContainer}>
              <Input
                readonly={true}
                placeholder="Текст для копирования еще не был сгенерирован"
                className={stylesBoard.copyingText}
                value={inviteLink}
                refS={copyInputRef}
              />
              <ContentCopyIcon
                title={"Скопировать пригласительную ссылку"}
                className={stylesBoard.icon}
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  copyInputRef.current.select();
                  /*      toast("Here is your toast."); */
                  /*      console.log(copyInputRef.current); */
                }}
              />
            </div>
          ) : (
            ""
          )}
        </>
      </Modal>

      <div className={styles.rightContent}>
        <span className={styles.headerLinksContainer}>
          <Link className={styles.headerLink} to={"/"}>
            дашбоарды
          </Link>
        </span>
        <Button
          className={styles.inviteButton}
          onClick={() => {
            setModal(true);
          }}
        >
          <PersonAddIcon className={styles.icon} />
          Пригласить в команду
        </Button>

        <Avatar
          className={styles.avatar}
          style={{
            backgroundColor: "#eee",
            color: "#000",
            border: "1px solid #ccc",
            fontFamily: "Montserrat,Roboto,Helvetica,Arial,sans-serif",
          }}
          onClick={() => {
            console.log("ONCLICK");
            setMenuVisible(true);
            console.log(menuVisible);
          }}
        >
          {userData.fullName.slice(0, 1).toUpperCase()}
        </Avatar>

        <HeaderMenu
          userData={userData}
          visible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
      </div>
    </div>
  );
};

export default HeaderBoard;
