import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister, selectorIsAuth } from "../../redux/slices/auth";
import styles from "../Login/Login.module.scss";

export const Registration = () => {
  const isAuth = useSelector(selectorIsAuth);
  document.title = "Регистрация";
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onChange",
  });

  const dispath = useDispatch();

  const onSubmit = async (values) => {
    const data = await dispath(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      console.log(data.payload.token);
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Произошла ошибка");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          {...register("fullName", { required: "Укажите имя" })}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          {...register("password", { required: "Укажите пароль" })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        />
        <Button
          disabled={!isValid}
          type={"submit"}
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
