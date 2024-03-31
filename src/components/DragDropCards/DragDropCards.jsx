import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../axios";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import {socket} from "../../socket";
import Card from "../Card/Card";
const CardsContainer = styled.div`
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const ITEM_TYPES = {
  CARD: "card",
  TASK: "task",
};


function DragDropCards({
  cards,
  tasks,
  cardOrder,
  setCards,
  setTasks,
  setCardOrder,
}) {
  const params = useParams();
  const [editing, setEditing] = useState(null);
  const userData = useContext(UserContext);
  const { projectContext, updateBoardContext } = useContext(BoardContext);
  console.log(projectContext)
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)){
      return;
    }

    if (type === ITEM_TYPES.CARD) {

      reorderCards(source, destination, draggableId); //перенос колонок
    } else {
      const start = projectContext.columns.find((el) => {
        return el._id === source.droppableId;
      });
      const finish = projectContext.columns.find((el) => {
        return el._id === destination.droppableId;
      });

      if (start._id === finish._id) {
        reorderTasksWithinCard(
          start,
          source.index,
          destination.index,
          draggableId
        );
      } else {
        console.log(start)
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }

  };

  const reorderCards = (start,final,source, destination, draggableId) => {
    console.log("reorderCards");
    console.log({start,final,source, destination, draggableId})
    const newColumns = Array.from(projectContext.columns);
    newColumns.splice(start.index, 1);
    newColumns.splice(final.index, 0, projectContext.columns.find((el) => {
      return el._id === source;
    }));
    updateBoardContext({...projectContext,columns:newColumns})

     axios
        .post(`/project/${params.idProject}/updateColumns`, {
          newColumns
        })
        .then((res) => {
          socket.emit(
              "changeProject",
              JSON.stringify({
                idUserChangedProject: userData._id,
                idProject: params.idProject,
              })
          );
        })
        .catch((err) => {
          alert(err);
          return <Navigate to={"/"} />;
        });
  };
  const reorderTasksWithinCard = async (
    start,
    sourceIdx,
    destinationIdx,
    draggableId
  ) => {
    /* перенос задания внутри своей колонки */
    const newKanbanCards = Array.from(start.kanbanCards);

    newKanbanCards.splice(sourceIdx, 1);
    newKanbanCards.splice(
      destinationIdx,
      0,
        start.kanbanCards.find((el) => {
        return el._id === draggableId;
      })
    );

    const updatedColumnsBoard = {
      columns: projectContext.columns.map((el) => {
        if (el.columnId === start.columnId) {
          return { ...el, kanbanCards: newKanbanCards };
        } else {
          return el;
        }
      }),
    }

    updateBoardContext({...projectContext,...updatedColumnsBoard});

   await axios
      .post(`/project/${params.idProject}/updateColumns`, {
        newColumns: [...updatedColumnsBoard.columns],
      })
      .then(() => {
        socket.emit(
          "changeProject",
          JSON.stringify({
            idUserChangedProject: userData._id,
            idProject: params.idProject,
          })
        );
      })
      .catch((err) => {
        alert(err);
        return <Navigate to={"/"} />;
      });

  };

  const moveTask = async (
    start,
    finish,
    sourceIdx,
    destinationIdx,
    draggableId
  ) => {
    console.log({
      start:start, finish:finish, sourceIdx:sourceIdx, destinationIdx:destinationIdx, draggableId:draggableId
    });
    //перенос задания в другую колонку

    const startKanbanCards = Array.from(start.kanbanCards);

    const newStart = {
      ...start,
      kanbanCards: startKanbanCards.toSpliced(sourceIdx,1),
    };//колонка из которой было перенесено задание

    const finishKanbanCards = Array.from(finish.kanbanCards);

    const newFinish = {
      ...finish,
      kanbanCards: finishKanbanCards.toSpliced(destinationIdx,
          0,
          start.kanbanCards.find((el) => {
            return el._id === draggableId;
          })),
    };//колонка с обновленными заданиями
    
    const updatedColumnsBoard = {
      columns: [
        ...projectContext.columns.map((cardsEl) => {
          if (cardsEl._id === newFinish._id) {
            return newFinish;
          } else if (cardsEl._id !== newStart._id) {
            return { ...cardsEl };
          }

          if (cardsEl._id === newStart._id) {
            return newStart;
          } else if (cardsEl._id !== newFinish._id) {
            return { ...cardsEl };
          }
        }),
      ],
    }
  
    updateBoardContext({...projectContext,...updatedColumnsBoard});

  await axios
      .post(`/project/${params.idProject}/updateColumns`, {
        newColumns:  [...updatedColumnsBoard.columns]
      })
      .then((res) => {
        socket.emit(
          "changeProject",
          JSON.stringify({
            idUserChangedProject: userData._id,
            idProject: params.idProject,
          })
        );
      })
      .catch((err) => {
        alert(err);
        return <Navigate to={"/"} />;
      });
  };

  const onAddNewTask = async (columnId, content, executor) => {
    await axios
      .post(`/project/${params.idProject}/kanbanCardCreate`, {
        nameCard: content,
        columnId: columnId,
        executor: executor ? [...executor] : undefined,
      })
      .then((doc) => {
        updateBoardContext({
          ...projectContext,
          columns: doc.data,
        });
        socket.emit(
            "changeProject",
            JSON.stringify({
              idUserChangedProject: userData._id,
              idProject: params.idProject,
            })
        );
      })
      .catch((err) => {
        alert(err);
        return <Navigate to={"/"} />;
      });
  };

  const onRemoveCard = async (cardID) => {
    console.log(cardID);
    await axios
      .delete(`/project/${params.idProject}/deleteColumnBoard/${cardID}`)
      .catch((err) => {
        alert(err);
        return <Navigate to={"/"} />;
      });
    setCards(cards.filter((el) => el.columnId !== cardID));
  };

  const onRemoveTask = (taskID, cardID) => {
    const newTaskIds = cards[cardID].taskIds.filter((id) => id !== taskID);
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } });
    delete tasks[taskID];
    setTasks(tasks);
  };
  /*   const getUsersInProject = async (props) => {
    let { data } = await axios.get(`/project/${params.idProject}/users`);
    console.log(data);
    setUsersInProject(data);
  
  }; */
  const onSaveTitleEdit = (cardID, newTitle) => {
    if (newTitle !== cards[cardID].title) {
      setCards({
        ...cards,
        [cardID]: {
          ...cards[cardID],
          title: newTitle,
        },
      });
    }
    setEditing(null);
  };

  const onSaveTaskEdit = (taskID, cardID, newContent) => {
    if (newContent.trim() === "") {
      onRemoveTask(taskID, cardID);
    } else if (newContent !== tasks[taskID].content) {
      setTasks({
        ...tasks,
        [taskID]: { ...tasks[taskID], content: newContent },
      });
    }
    setEditing(null);
  };

  /*   useEffect(() => {
    getUsersInProject();
  }, []); */

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="all-cards"
        direction="horizontal"
        type="card"

      >
        {(provided) => (
          <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>

            {projectContext.columns.map((el, index) => {
              /*   const card = cards[id];  */
              /*   const cardTasks = card.taskIds.map((taskId) => tasks[taskId]); */
              return (
                <Card
                  key={el._id}
                  card={el}
                  tasks={el.kanbanCards}
                  index={index}
                  /*     onFocusClick={() => onFocusClick(card.id)} */
                  onSaveTitleEdit={(title) => onSaveTitleEdit(el._id, title)}
                  onRemoveCard={() => onRemoveCard(el.columnId)}
                  onAddNewTask={(content, executor) =>
                    onAddNewTask(el.columnId, content, executor)
                  }
                  onSaveTaskEdit={(taskID, newContent) =>
                    onSaveTaskEdit(taskID, el._id, newContent)
                  }
                  onTitleDoubleClick={() => setEditing(el._id)}
                  onTaskDoubleClick={(task) => setEditing(task?.id)}
                  isTitleEditing={editing === el?._id}
                  isTaskEditing={(task) => editing === task?.id}
                  idProject={params.idProject}
                  usersInProject={projectContext.usersProject}
                />
              );
            })}
            {provided.placeholder}
          </CardsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropCards;
