import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../axios";
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

function genRandomID() {
  return (Math.random() + 1).toString(36).substring(7);
}
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
  const [usersInProject, setUsersInProject] = useState();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(result);
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    console.log(type);
    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId); //перенос колонок
    } else {
      const start = cards.find((el) => {
        return el._id == source.droppableId;
      });
      const finish = cards.find((el) => {
        return el._id == destination.droppableId;
      });

      if (start._id === finish._id) {
        reorderTasksWithinCard(
          start,
          source.index,
          destination.index,
          draggableId
        );
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }
    console.log("onDragEnd");
  };

  const reorderCards = (source, destination, draggableId) => {
    console.log("reorderCards");
    console.log(reorderCards);
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.splice(source.index, 1);
    newCardOrder.splice(destination.index, 0, draggableId);
    setCardOrder(newCardOrder);
  };

  const reorderTasksWithinCard = async (
    card,
    sourceIdx,
    destinationIdx,
    draggableId
  ) => {
    console.log("reorderTasksWithinCard");
    /* внутри своей колонки */

    const newTask = Array.from(card.kanbanCards);

    newTask.splice(sourceIdx, 1);
    newTask.splice(
      destinationIdx,
      0,
      card.kanbanCards.find((el) => {
        return el._id == draggableId;
      })
    );

    setCards(
      cards.map((el) => {
        if (el.columnId == card.columnId) {
          return { ...el, kanbanCards: newTask };
        } else {
          return el;
        }
      })
    );

    await axios
      .post(`/project/${params.idProject}/updateColumns`, {
        newColumns: cards.map((el) => {
          if (el.columnId == card.columnId) {
            return { ...el, kanbanCards: newTask };
          } else {
            return el;
          }
        }),
      })
      .then((res) => {
        /*    console.log(res.data);

      setCards(res.data.columns); */
      })
      .catch((err) => {
        alert(err);
        return <Navigate to={"/"} />;
      });

    /*   axios.post(`/project/${params.idProject}/kanbanCard-create/column/${card.columnId}`).then((res) => {
      console.log(res)
    }).catch((err) => {
      alert(err)
    }); */
  };

  const moveTask = async (
    start,
    finish,
    sourceIdx,
    destinationIdx,
    draggableId
  ) => {
    console.log("moveTask");
    //перенос задания в другую колонку
    const startTaskIds = Array.from(start.kanbanCards);
    startTaskIds.splice(sourceIdx, 1);
    const newStart = {
      ...start,
      kanbanCards: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.kanbanCards);
    finishTaskIds.splice(
      destinationIdx,
      0,
      start.kanbanCards.find((el) => {
        return el._id == draggableId;
      })
    );
    const newFinish = {
      ...finish,
      kanbanCards: finishTaskIds,
    };

    setCards([
      ...cards.map((cardsEl) => {
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
    ]);
    await axios
      .post(`/project/${params.idProject}/updateColumns`, {
        newColumns: [
          ...cards.map((cardsEl) => {
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
      })
      .then((res) => {
        /*    console.log(res.data);

        setCards(res.data.columns); */
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
        setCards(doc.data);
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
  const getUsersInProject = async (props) => {
    let { data } = await axios.get(`/project/${params.idProject}/users`);
    console.log(data);
    setUsersInProject(data);
    /*   
    setUsersInProjectIsLoading(true); */
  };
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

  useEffect(() => {
    getUsersInProject();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="all-cards"
        direction="horizontal"
        type="card"
        isDropDisabled={true}
      >
        {(provided) => (
          <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((el, index) => {
              /*   const card = cards[id];  */
              /*   const cardTasks = card.taskIds.map((taskId) => tasks[taskId]); */
              console.log(el);
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
                  onTaskDoubleClick={(task) => setEditing(task.id)}
                  isTitleEditing={editing === el._id}
                  isTaskEditing={(task) => editing === task.id}
                  idProject={params.idProject}
                  usersInProject={usersInProject}
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
