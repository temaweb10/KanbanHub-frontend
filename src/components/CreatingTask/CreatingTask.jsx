import CheckIcon from "@mui/icons-material/Check";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import FindUser from "../FindUser/FindUser";
import Loader from "../Loader/Loader";
import styles from "./CreatingTask.module.scss";
function CreatingTask(props) {
  const params = useParams();
  const [newTask, setNewTask] = useState();
  const [usersInProject, setUsersInProject] = useState(undefined);
  const [usersInProjectIsLoading, setUsersInProjectIsLoading] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showFindUsers, setShowFindUsers] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const createFooterRef = useRef(null);

  const getUsersInProject = async (props) => {
    let { data } = await axios.get(`/project/${params.idProject}/users`);
    console.log(data);
    setUsersInProject(data);
    setUsersInProjectIsLoading(true);
  };

  useEffect(() => {
    if (!usersInProject) {
      getUsersInProject();
    }
  }, [showFindUsers]);

  const onFocusHandler = (event) => {
    setShowDiv(true);

    console.log("onFocusHandler");
  };

  const onBlurHandler = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      createFooterRef.current &&
      !createFooterRef.current.contains(event.target)
    ) {
      setShowDiv(false);
      setShowFindUsers(false);
    }
    if (divRef.current && divRef.current.contains(event.target)) {
      setShowFindUsers(true);
      setShowDiv(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onBlurHandler);
    return () => {
      document.removeEventListener("click", onBlurHandler);
    };
  }, []);
  return (
    <div className={styles.createConatiner}>
      <input
        className={styles.input}
        onSave={props.onSaveTask}
        onKeyPress={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            setShowDiv(false);
            console.log(props.onSaveTask);
            console.log(event.target.value);
            props.onSaveTask(event.target.value);
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onChange={newTask}
        type="text"
        ref={inputRef}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        placeholder="Добавить задачу"
      />

      {showDiv && (
        <div className={styles.createFooter} ref={createFooterRef}>
          <div className={styles.flex}>
            <span className={styles.pressEnter}>Нажмите Enter</span>
            <CheckIcon fontSize="8" htmlColor="#7b7575" />
          </div>
          <div className={styles.footerIcons}>
            <PeopleOutlineIcon
              htmlColor="#7b7575"
              titleAccess="Исполнители"
              fontSize="24"
              onClick={() => {
                if (showFindUsers) {
                  setShowFindUsers(false);
                } else {
                  setShowFindUsers(true);
                }
              }}
            />
          </div>
        </div>
      )}

      {showFindUsers && (
        <div ref={divRef} style={{ position: "relative" }}>
          {setUsersInProjectIsLoading ? (
            <FindUser users={usersInProject} />
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
}

export default CreatingTask;
