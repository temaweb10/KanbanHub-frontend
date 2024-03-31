import CheckIcon from "@mui/icons-material/Check";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { BoardContext } from "../../context/BoardContext";
import FindUser from "../FindUser/FindUser";
import Loader from "../Loader/Loader";
import styles from "./CreatingTask.module.scss";
function CreatingTask(props) {
  const params = useParams();
  const { projectContext } = useContext(BoardContext);
  const [newTask, setNewTask] = useState();
  const [usersInProject, setUsersInProject] = useState(projectContext.usersProject);
  const [usersInProjectIsLoading, setUsersInProjectIsLoading] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showFindUsers, setShowFindUsers] = useState(false);
  const [executor, setExecutor] = useState([]);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const showFindUsersRef = useRef(null);
  const createFooterRef = useRef(null);

  const onFocusHandler = () => {
    setShowDiv(true);
  };

  const onBlurHandler = (event) => {
    if (
      !inputRef.current.contains(event.target) &&
      !createFooterRef.current.contains(event.target) &&
      !divRef.current.contains(event.target) &&
      !showFindUsersRef.current.contains(event.target) /*  &&
      !event.target.dataset.menuItem */
    ) {
      setShowDiv(false);
      setShowFindUsers(false);
    }
  };
  /*   const getUsersInProject = async (props) => {
    let { data } = await axios.get(`/project/${params.idProject}/users`);
    console.log(data);
    setUsersInProject(data);

    setUsersInProjectIsLoading(true);
  }; */
  useEffect(() => {
    /*     getUsersInProject(); */
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
            props.onSaveTask(event.target.value, executor);
            setShowFindUsers(false);
            setShowDiv(false);
          }
        }}
        onChange={newTask}
        type="text"
        ref={inputRef}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        placeholder="Добавить задачу"
      />

      <div ref={createFooterRef}>
        <div
          className={styles.createFooter}
          style={{ display: `${showDiv ? "flex" : "none"}` }}
        >
          <div className={styles.flex}>
            <span className={styles.pressEnter}>Нажмите Enter</span>
            <CheckIcon fontSize="8" htmlColor="#7b7575" />
          </div>
          <div className={styles.footerIcons}>
            <PeopleOutlineIcon
              htmlColor="#7b7575"
              titleAccess="Исполнители"
              fontSize="24"
              ref={showFindUsersRef}
              onClick={(e) => {
                if (showFindUsers) {
                  setShowFindUsers(false);
                } else {
                  setShowFindUsers(true);
                }
              }}
            />
          </div>
        </div>

        <div style={{ position: "absolute" }} className={styles.showElements}>
          <div ref={divRef}>
            <FindUser
              showFindUsers={showFindUsers}
              users={usersInProject}
              setShowFindUsers={setShowFindUsers}
              setExecutor={setExecutor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatingTask;
