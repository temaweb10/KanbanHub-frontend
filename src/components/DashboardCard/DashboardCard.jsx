import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardCard.module.scss";
function DashboardCard({ nameDashboard, idDashboard }) {
  return (
    <Link to={`/dashboard/${idDashboard}`} style={{ textDecoration: "none" }}>
      <div className={styles.dashboardCard}>
        <span className={styles.dashboardCardName}>{nameDashboard}</span>
      </div>
    </Link>
  );
}

export default DashboardCard;
