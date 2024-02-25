import { Fragment, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import EditInput from "../EditInput/EditInput";
import styles from "./Task.module.scss";

/* const TaskContent = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  width: 100%;
`; */

function Task(props) {
  return (
    <div className={styles.taskContainer}>
      {/*  {props.isTaskEditing ? (
        <EditInput
          key={props.task._id}
          value={props.task.nameCard}
          onSave={props.onSaveTaskEdit}
          margin="0 0 8px 0"
        />
      ) : ( */}

      <Draggable draggableId={props.task._id} index={props.index}>
        {(provided, snapshot) => (
          <div
            className={styles.taskContent + " " + styles[props.task.priority]}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={props.onTaskDoubleClick}
            /*   style={{
              boxShadow: `-5px 5px ${priorityToColor(props.task.priority)},
              -5px 5px 0px 3px ${priorityToColor(props.task.priority)} `,
            }} */
          >
            {props.task.nameCard}
          </div>
        )}
      </Draggable>
      {/* )} */}
    </div>
  );
}
export default Task;
