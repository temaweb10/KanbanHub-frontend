import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../redux/slices/auth";
import Menu from "../Menu/Menu";
import styles from "../Menu/Menu.module.scss";
import stylesMenuBoard from "./MenuBoard.module.scss";
function MenuBoard({
  visible,
  setMenuVisible,
  userData,
  projectData,
  setModalInviteUser,
}) {
  const navigate = useNavigate();
  console.log(projectData);
  console.log(userData);
  return (
    <Menu
      userData={userData}
      visible={visible}
      setMenuVisible={setMenuVisible}
      className={stylesMenuBoard.menu}
    >
      <div
        className={styles.menuProfile}
        onClick={() => {
          setMenuVisible(false);
          navigate(`/dashboard/${projectData._id}`);
        }}
      >
        <Avatar
          className={styles.avatar}
          style={{
            backgroundColor: "#eee",
            color: "#000",
            border: "1px solid #ccc",
            fontFamily: "Montserrat,Roboto,Helvetica,Arial,sans-serif",
            borderRadius: "9px",
          }}
        >
          {projectData.nameProject.slice(0, 1).toUpperCase()}
        </Avatar>

        <div className={styles.menuProfileColumn}>
          <span className={styles.menuProfileName}>
            {projectData.nameProject}
          </span>
          <span className={styles.menuProfileEmail}>
            {`${
              projectData.participants.length === 1
                ? `${projectData.participants.length} участник`
                : `${projectData.participants.length} участника`
            } | вы ${
              projectData.participants.find((el) => el.user == userData._id)
                .role == "admin"
                ? "админ"
                : "участник"
            }`}
          </span>
        </div>
      </div>

      <div className={styles.menuItemList}>
        <div
          className={styles.menuItem}
          onClick={() => {
            setMenuVisible(false);
            navigate(`/dashboard/${projectData._id}/settings`);
          }}
        >
          <SettingsIcon className={styles.menuIcon} />
          <span className={styles.menuText}>Настройки</span>
        </div>
        <div className={styles.menuItem}>
          <PeopleIcon className={styles.menuIcon} />
          <span className={styles.menuText}>Участники</span>
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            setMenuVisible(false);
            setModalInviteUser(true);
          }}
        >
          <PersonAddIcon className={styles.menuIcon} />
          <span className={styles.menuText}>Пригласить</span>
        </div>
      </div>
    </Menu>
  );
}

export default MenuBoard;