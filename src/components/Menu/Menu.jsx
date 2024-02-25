import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/auth";
import styles from "./Menu.module.scss";

function Menu(props) {
  const divRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      props.setMenuVisible(false);
    }
  };
  console.log(props);
  return (
    props.visible && (
      <div className={[styles.menu, props.className].join(" ")} ref={divRef}>
        {props.children}
      </div>
    )
  );
}

export default Menu;
