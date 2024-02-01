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
  const [dashboards, setDashboards] = useState("");
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
    if (window.confirm("Вы точно хотите удалить дашбоард?")) {
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
    <>
      {isLoading === false ? (
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
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Dashboards;
