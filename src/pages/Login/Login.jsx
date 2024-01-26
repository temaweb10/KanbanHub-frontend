import { Input } from "@mui/material";
/* import Button from "@mui/material/Button"; */
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import inputStyles from "../../components/UI/Input/Input.module.scss";
import { fetchAuth, selectorIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";
export const Login = () => {
  const isAuth = useSelector(selectorIsAuth);
  document.title = "Авторизация";
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const dispath = useDispatch();

  const onSubmit = async (values) => {
    const data = await dispath(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Произошла ошибка");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  console.log(inputStyles.input);
  return (
    <div className={styles.loginBoxParent}>
      <h5 className={styles.title}>Вход в аккаунт</h5>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.loginInput}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email", { required: "Укажите почту" })}
            fullWidth
            type="email"
            placeholder="Укажите почту"
          />
          <Input
            className={styles.loginInput}
            label="Пароль"
            fullWidth
            {...register("password", { required: "Укажите пароль" })}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            placeholder="Укажите пароль"
          />
          <Button
            className={styles.loginButton}
            type={"submit"}
            size="large"
            variant="contained"
            fullWidth
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};
