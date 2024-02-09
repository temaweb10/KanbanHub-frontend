import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./Dashboards.module.scss";
function Dashboards() {
  document.title = "Дашбоарды";
  const [dashboards, setDashboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const userId = useSelector((state) => state?.auth?.data?._id);
  const navigate = useNavigate();
  let modalInputRef = useRef();
  useEffect(() => {
    axios
      .get(`/projects`)
      .then((res) => {
        console.log(res.data);
        setDashboards(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  const createDashboard = async () => {
    console.log(modalInputRef.current.value);
    if (modalInputRef.current.value) {
      await axios
        .post(`/project`, {
          nameProject: modalInputRef.current.value,
        })
        .then((res) => {
          return navigate(`/dashboard/${res.data._id}`);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      alert("Укажите название проекта");
    }
  };
  const deleteDashboard = async (idProject) => {
    if (
      window.confirm(
        "Для удаления дашбоарда нажмите кнопку «Да». Обращаем внимание, что удаление приведет к потере всех данных внутри данного дашбоарда. "
      )
    ) {
      await axios
        .delete(`/project/${idProject}`)
        .then((res) => {
          setDashboards(
            dashboards.filter((el) => {
              return el._id !== idProject;
            })
          );
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };
  return (
    <div>
      {isLoading === false ? (
        dashboards.length ? (
          <Container maxWidth="lg" className={styles.containerDashboards}>
            <h2 className={styles.dashboardTitle}>Дашбоарды</h2>
            <div className={styles.dashboardCards}>
              {dashboards.map((el) => {
                return (
                  <DashboardCard
                    nameDashboard={el.nameProject}
                    idDashboard={el._id}
                    isDeleting={
                      el.participants.find((el) => {
                        return el.user == userId && el.role == "admin";
                      })
                        ? true
                        : false
                    }
                    key={el._id}
                    deleteDashboard={deleteDashboard}
                  />
                );
              })}

              <div
                className={styles.createDashboard}
                onClick={() => {
                  setModal(true);
                }}
              >
                + Новый дашбоард
              </div>
            </div>
          </Container>
        ) : (
          <div className={styles.container}>
            <div className={styles.containerInner}>
              <h2 className={styles.title}>Дашбоарды</h2>
              <h4 className={styles.subTitle}>
                Здесь будут собраны все ваши дашбоарды
              </h4>
              <p className={styles.description}>
                Добавьте дашбоард, чтобы создать задачи, отметить статус,
                пригласить участников и многое другое
              </p>
              <button
                className={["button", styles.button].join(" ")}
                onClick={() => setModal(true)}
              >
                <AddCircleOutlineIcon className={styles.buttonIcon} />
                Добавьте дашбоард
              </button>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
      <Modal setVisible={setModal} visible={modal}>
        <div className="form">
          <Input
            refS={modalInputRef}
            type="text"
            placeholder="Название дашбоарда"
          />

          <Button onClick={createDashboard}>Создать дашбоард</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboards;
