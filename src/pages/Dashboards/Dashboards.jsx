import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import styles from "./Dashboards.module.scss";
function Dashboards() {
  document.title = "Дашбоарды";
  const [dashboards, setDashboards] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
                  key={el._id}
                />
              );
            })}

            <div className={styles.createDashboard}>Создать дашбоард</div>
          </div>
        </Container>
      ) : (
        <div>ЗАГРУЗКА</div>
      )}
    </>
  );
}

export default Dashboards;
