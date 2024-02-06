import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import styles from "./AcceptInvite.module.scss";
function AcceptInvite() {
  const [successAccept, setSuccessAccept] = useState(false);
  const [resDataAcceptLink, setResDataAcceptLink] = useState();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/project/acceptInviteLink", {
        token: params.token,
      })
      .then((res) => {
        console.log(res);
        setResDataAcceptLink(res.data);
        setSuccessAccept(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        navigate(`/`);
      });
  }, []);
  return successAccept ? (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <span className={["logo", styles.logo].join(" ")}>KANBANHUB</span>
        <h2 className={styles.title}>Добро пожаловать в KANBANHUB</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className={styles.text}>команда уже ждёт тебя</span>
          <Avatar className={styles.avatar}>
            {resDataAcceptLink?.inviterFullName?.slice(0, 2).toUpperCase()}
          </Avatar>
        </div>
        {/* #2979fb */}

        <button
          className={styles.button}
          onClick={() => {
            navigate(`/dashboard/${resDataAcceptLink.idProject}`);
          }}
        >
          Начать
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default AcceptInvite;
