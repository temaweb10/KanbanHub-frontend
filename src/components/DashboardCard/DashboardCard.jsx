import DeleteIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import styles from "./DashboardCard.module.scss";
function DashboardCard({
  nameDashboard,
  idDashboard,
  isDeleting,
  deleteDashboard,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.dashboardCard}
      onClick={(e) => {
        navigate(`/dashboard/${idDashboard}`);
      }}
    >
      <span className={styles.dashboardCardName}>{nameDashboard}</span>
      {isDeleting ? (
        <div className={styles.editButtons}>
          <DeleteIcon
            htmlColor="#fff"
            onClick={(e) => {
              e.stopPropagation();
              deleteDashboard(idDashboard);
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardCard;
