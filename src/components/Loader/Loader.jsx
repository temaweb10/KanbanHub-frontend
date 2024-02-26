import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "./Loader.module.scss";
function Loader({ style }) {
  return (
    <div className={styles.loader} style={style}>
      <CircularProgress style={{ color: "#111" }} />
    </div>
  );
}

export default Loader;
