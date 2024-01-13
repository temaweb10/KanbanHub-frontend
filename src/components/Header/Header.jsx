import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectorIsAuth } from "../../redux/slices/auth";
import styles from "./Header.module.scss";
const Header = () => {
  const dispath = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  console.log(isAuth);
  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта")) {
      dispath(logout());
      window.localStorage.removeItem("token");
    }
  };

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
                {/*  <Link to="/add-post">
                  <Button className={styles.button} variant="contained">
                    Написать статью
                  </Button>
                </Link> */}
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                  className={styles.button}
                >
                  Выйти
                </Button>

                <Link to="/g">
                  <Avatar
                    /*   alt={obj.user.fullName} */
                    className={styles.avatar}
                    src={
                      "https://catherineasquithgallery.com/uploads/posts/2023-01/1674320044_catherineasquithgallery-com-p-serii-fon-tik-tok-foto-70.jpg"
                    }
                  />
                </Link>
              </>
            ) : (
              <>
                {/*  <Link to="/login">
                  <Button className={styles.button} variant="outlined">
                    Войти
                  </Button>
                </Link> */}
                {/*   <Link to="/register">
                  <Button className={styles.button} variant="contained">
                    Создать аккаунт
                  </Button>
                </Link> */}
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
