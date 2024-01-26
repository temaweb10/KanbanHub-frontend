import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "./Loader.module.scss";
function Loader() {
  return (
    <div className={styles.loader}>
      <CircularProgress style={{ color: "#111" }} />
    </div>
  );
}

export default Loader;
