import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/auth";
import Menu from "../Menu/Menu";
import stylesMenu from "../Menu/Menu.module.scss";
import AvatarUI from "../UI/AvatarUI/AvatarUI";
import styles from "./MenuUser.module.scss";
function MenuUser({ userData, visible, setMenuVisible }) {
  const navigate = useNavigate();
  let dispath = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта")) {
      dispath(logout());
      window.localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <Menu userData={userData} visible={visible} setMenuVisible={setMenuVisible}>
      <div className={stylesMenu.menuProfile}>
        <AvatarUI
          className={styles.avatar}
          style={{
            backgroundColor: "#eee",
            color: "#000",
            border: "1px solid #ccc",
          }}
          avatarText={userData.fullName.slice(0, 1).toUpperCase()}
          avatarUrl={""}
        />

        <div className={stylesMenu.menuProfileColumn}>
          <span className={stylesMenu.menuProfileName}>
            {" "}
            {userData.fullName}
          </span>
          <span className={stylesMenu.menuProfileEmail}>{userData.email}</span>
        </div>
      </div>
      <div className={stylesMenu.menuItemList}>
        <div className={styles.menuItem} onClick={onClickLogout}>
          <LogoutIcon />
          <span className={stylesMenu.menuText}>Выйти</span>
        </div>
      </div>
    </Menu>
  );
}

export default MenuUser;
