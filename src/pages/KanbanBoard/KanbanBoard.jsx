import { Fragment, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import DragDropCards from "../../components/DragDropCards/DragDropCards";
import Task from "../../components/Task/Task";
const ITEM_TYPES = {
  CARD: "card",
  TASK: "task",
};

const DATASET = {
  tasks: {
    "task-1": { id: "task-1", content: "water plants" },
    "task-2": { id: "task-2", content: "buy oat milk" },
    "task-3": { id: "task-3", content: "build a trello board" },
    "task-4": { id: "task-4", content: "have a beach day" },
    "task-5": { id: "task-5", content: "build tic tac toe" },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Home Todos",
      taskIds: ["task-1", "task-2"],
    },
    "card-2": {
      id: "card-2",
      title: "Work Todos",
      taskIds: ["task-3"],
    },
    "card-3": { id: "card-3", title: "Fun Todos", taskIds: ["task-4"] },
    "card-4": { id: "card-4", title: "Completed", taskIds: ["task-5"] },
  },
  cardOrder: ["card-1", "card-2", "card-3", "card-4"],
};

const Container = styled.div`
  margin: 2em;
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
  align-items: center;
  justify-items: center;
`;
const Menu = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
`;
const Note = styled.div`
  font-size: 0.8em;
  margin: 20px 0;
`;
const NewCard = styled.div`
  font-size: 1em;
  color: grey;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
`;
function KanbanBoard() {
  const [dataset, _] = useState(DATASET);

  const [tasks, setTasks] = useState(dataset.tasks);
  const [cards, setCards] = useState(dataset.cards);
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder);

  useEffect(() => {
    localStorage.setItem(
      "aleka-trello-board-dataset",
      JSON.stringify({ tasks, cards, cardOrder })
    );
  }, [tasks, cards, cardOrder]);

  const onAddNewCard = () => {
    const newCard = {
      id: "card-" + genRandomID(),
      title: "**New**",
      taskIds: [],
    };
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.unshift(newCard.id);
    setCards({
      ...cards,
      [newCard.id]: newCard,
    });
    setCardOrder(newCardOrder);
  };

  return (
    <Container>
      <Menu>
        <Note>
          you can add, edit, or remove cards & tasks. <br />
          double click to edit card title or task content. <br />
          task is removed when content is empty. <br />
          drag/drop card or task to desired order. <br />
          your edited changes are saved in local storage.
        </Note>
        <NewCard onClick={onAddNewCard}>+ New Card</NewCard>
      </Menu>
      <DragDropCards
        cards={cards}
        tasks={tasks}
        cardOrder={cardOrder}
        setCards={setCards}
        setTasks={setTasks}
        setCardOrder={setCardOrder}
      />
    </Container>
  );
}

function genRandomID() {
  return (Math.random() + 1).toString(36).substring(7);
}

export default KanbanBoard;
