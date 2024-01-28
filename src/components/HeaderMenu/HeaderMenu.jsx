import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import styles from "./HeaderMenu.module.scss";
import MenuItem from "./MenuItem";
function HeaderMenu({ visible, setMenuVisible, userData }) {
  let dispath = useDispatch();
  const divRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта")) {
      dispath(logout());
      window.localStorage.removeItem("token");
    }
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  return visible ? (
    <div className={styles.menu} ref={divRef}>
      <div className={styles.menuProfile}>
        <Avatar
          className={styles.avatar}
          style={{
            backgroundColor: "#eee",
            color: "#000",
            border: "1px solid #ccc",
            fontFamily: "Montserrat,Roboto,Helvetica,Arial,sans-serif",
          }}
        >
          {userData.fullName.slice(0, 1).toUpperCase()}
        </Avatar>
        <div className={styles.menuProfileColumn}>
          <span className={styles.menuProfileName}> {userData.fullName}</span>
          <span className={styles.menuProfileEmail}>{userData.email}</span>
        </div>
      </div>

      <div className={styles.menuItem} onClick={onClickLogout}>
        <LogoutIcon />
        <span className={styles.menuText}>Выйти</span>
      </div>
    </div>
  ) : (
    ""
  );
}

export default HeaderMenu;
