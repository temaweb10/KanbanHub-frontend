import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import MenuUser from "../MenuUser/MenuUser";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userData = useContext(UserContext);
  const isAuth = Boolean(userData);

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
                <Avatar
                  className={styles.avatar}
                  style={{
                    backgroundColor: "#eee",
                    color: "#000",
                    border: "1px solid #ccc",
                    fontFamily: "Montserrat,Roboto,Helvetica,Arial,sans-serif",
                  }}
                  onClick={() => {
                    setMenuVisible(true);
                  }}
                >
                  {userData.fullName.slice(0, 1).toUpperCase()}
                </Avatar>

                <MenuUser
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
