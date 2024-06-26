import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "../UI/Button/Button"
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import MenuBoard from "../MenuBoard/MenuBoard";
import MenuUser from "../MenuUser/MenuUser";
import ModalInviteUser from "../ModalInviteUser/ModalInviteUser";
import AvatarUI from "../UI/AvatarUI/AvatarUI";
import styles from "./HeaderBoard.module.scss";
const HeaderBoard = () => {
  const [modal, setModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuBoardVisible, setMenuBoardVisible] = useState(false);
  const userData = useContext(UserContext);
  const { projectContext } = useContext(BoardContext);

  return (
    <div className={styles.header}>
      <div
        className={styles.headerProjectInfo}
        onClick={() => {
          setMenuBoardVisible(true);
        }}
      >
        <AvatarUI
          className={styles.avatarProject}
          avatarSettings={{avatarUrl:projectContext?.avatarUrl,avatarText:projectContext?.nameProject,avatarColor:projectContext?.avatarColor,}}
        />

        <span className={styles.projectName}>
          {projectContext?.nameProject}
        </span>
      </div>

      <div className={styles.rightContent}>
        <span className={styles.headerLinksContainer}>
          <Link className={styles.headerLink} to={"/"}>
            дашбоарды
          </Link>
        </span>
        <Button
          onClick={() => {
            setModal(true);
          }}
        >
          <PersonAddIcon className={styles.icon} />
          Пригласить в команду
        </Button>

        <AvatarUI
          className={styles.avatarProject}
          onClick={() => {
            setMenuVisible(true);
          }}
          avatarSettings={{avatarUrl:userData?.avatarUrl,avatarText: !userData?.avatarUrl || !userData.avatarColor ? userData.fullName : undefined,avatarColor:userData?.avatarColor,}}
        />


        <ModalInviteUser setModal={setModal} modal={modal} />
        <MenuBoard
          projectData={projectContext}
          userData={userData}
          visible={menuBoardVisible}
          setMenuVisible={setMenuBoardVisible}
          setModalInviteUser={setModal}
        />
        <MenuUser
            projectData={projectContext}
          userData={userData}
          visible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
      </div>
    </div>
  );
};

export default HeaderBoard;
