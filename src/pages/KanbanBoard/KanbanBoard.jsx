import React, { useState } from "react";
import styles from "../KanbanBoard/KanbanBoard.module.css";
const initialColumns = [
  {
    id: 1,
    title: "В процессе",
    items: [
      { id: 1, title: "Пойти какать1" },
      { id: 2, title: "Пойти какать2" },
    ],
  },
  {
    id: 2,
    title: "На рассмотрении",
    items: [
      { id: 3, title: "Пойти какать3" },
      { id: 4, title: "Пойти какать4" },
    ],
  },
  {
    id: 3,
    title: "Готово",
    items: [
      { id: 5, title: "Пойти какать5" },
      { id: 6, title: "Пойти какать6" },
    ],
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragStart = (e, columnIndex, itemIndex) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ columnIndex, itemIndex })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, columnIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { columnIndex: fromColumnIndex, itemIndex } = data;
    if (fromColumnIndex !== columnIndex) {
      const newItem = columns[fromColumnIndex].items[itemIndex];
      const newColumns = [...columns];
      newColumns[fromColumnIndex].items.splice(itemIndex, 1);
      newColumns[columnIndex].items.push(newItem);
      setColumns(newColumns);
    }
  };

  const handleAddCard = (columnIndex) => {
    const newCardTitle = prompt("Введите название карточки:");
    if (newCardTitle) {
      const newCard = { id: Date.now(), title: newCardTitle };
      const newColumns = [...columns];
      newColumns[columnIndex].items.push(newCard);
      setColumns(newColumns);
    }
  };

  return (
    <div className="App">
      <div className={styles.board}>
        {columns.map((column, columnIndex) => (
          <div key={column.id} className={styles.column}>
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <div
              className={styles.columnContent}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, columnIndex)}
            >
              {column.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={styles.card}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, columnIndex, itemIndex)
                  }
                >
                  {item.title}
                </div>
              ))}
              {/*  {column.items.length === 0 && (
                <div
                  className="EmptyCard"
                  onClick={() => handleAddCard(columnIndex)}
                >
                  + Добавить карточку
                </div>
              )} */}
              <button
                className={styles.buttonAddCard}
                onClick={() => handleAddCard(columnIndex)}
              >
                + Добавить карточку
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
