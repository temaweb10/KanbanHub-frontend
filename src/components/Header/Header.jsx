import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logout, selectorIsAuth } from "../../redux/slices/auth";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userData = useContext(UserContext);
  const isAuth = Boolean(userData);
  console.log(userData);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>KANBANHUB</div>
          </Link>
          <div className={styles.rightContent}>
            {isAuth ? (
              <>
                {/*  <button onClick={onClickLogout} className={styles.button}>
                  Выйти
                </button>
 */}
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
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Войти
                </Link>
                <Link to="/register" className={styles.link}>
                  Создать аккаунт
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
