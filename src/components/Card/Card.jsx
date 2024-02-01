import { Fragment, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import CreatingTask from "../CreatingTask/CreatingTask";
import EditInput from "../EditInput/EditInput";
import FindUser from "../FindUser/FindUser";
import Task from "../Task/Task";
import styles from "./Card.module.scss";

const Title = styled.h3`
  padding: 8px;
  font-size: 1.5em;
  text-overflow: ellipsis;
`;
const Cross = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  text-align: right;
  color: grey;
`;
const CardContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  min-width: 270px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
/* const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 100px;
  height: 100%;
`; */
const NewTaskBar = styled.div`
  display: flex;
`;
const NewTaskButton = styled.div`
  padding: 8px;
  margin: 8px;
  cursor: pointer;
  text-align: right;
  color: grey;
`;

function Card(props) {
  const [isAddingNewTask, setIsAddingNewTask] = useState(true);
  const onSaveTask = (content) => {
    console.log(content);
    if (content?.trim() !== "") {
      props.onAddNewTask(content);
    }
    /*     setIsAddingNewTask(true); */
  };
  const [newTask, setNewTask] = useState();
  const addNewTaskRef = useRef();
  const [showDiv, setShowDiv] = useState(false);
  const inputRef = useRef(null);
  const newTaskInputRef = useRef(null);
  const divRef = useRef(null);

  /* const onFocusHandler = () => {
    setShowDiv(true);
    console.log("onFocusHandler");
  };

  const onBlurHandler = (event) => {
  if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowDiv(false);
    }

    console.log(inputRef);
    console.log(divRef);
  };

  useEffect(() => {
    document.addEventListener("click", onBlurHandler);
    return () => {
      document.removeEventListener("click", onBlurHandler);
    };
  }, []); */

  return (
    <Draggable draggableId={props.card._id} index={props.index}>
      {(provided) => (
        <div
          className={styles.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={props.card.id}
          /*  onClick={(e) => {
            e.stopPropagation();
            alert(111);
          }} */
        >
          <div className={styles.titleBar}>
            {props.isTitleEditing ? (
              <EditInput
                key={props.card.id}
                value={props.card.title}
                onSave={props.onSaveTitleEdit}
                fontSize="1.5em"
                margin="20px 0 20px 8px"
              />
            ) : (
              <div
                className={styles.title}
                onDoubleClick={props.onTitleDoubleClick}
                {...provided.dragHandleProps}
              >
                {props.card.name}
              </div>
            )}
            <Cross onClick={props.onRemoveCard}>x</Cross>
          </div>

          {/*   <input
                onChange={newTask}
                type="text"
                ref={inputRef}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
              />
              {showDiv && (
                <div ref={divRef} style={{ position: "relative" }}>
                  {" "}
                  <FindUser />
                </div>
              )} */}
          <CreatingTask onSaveTask={onSaveTask} idProject={props.idProject} />

          <Droppable droppableId={props.card._id} type="task">
            {(provided, snapshot) => (
              <Fragment>
                <div
                  className={styles.taskList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.card?.kanbanCards?.map((task, index) => (
                    <Task
                      key={task._id}
                      task={task}
                      index={index}
                      onSaveTaskEdit={(content) =>
                        props.onSaveTaskEdit(task._id, content)
                      }
                      onTaskDoubleClick={() => props.onTaskDoubleClick(task)}
                      isTaskEditing={props.isTaskEditing(task)}
                    />
                  ))}
                </div>
                {provided.placeholder}
              </Fragment>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
