import React, { useState } from "react";
import "../KanbanBoard/KanbanBoard.css";
function KanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "сделать",
      items: [
        { id: 1, title: "Пойти какать" },
        { id: 2, title: "Пойти какать2" },
      ],
    },
    {
      id: 2,
      title: "какать",
      items: [
        { id: 3, title: "Пойти какать3" },
        { id: 4, title: "Пойти какать4" },
      ],
    },
    {
      id: 3,
      title: "готово",
      items: [
        { id: 5, title: "Пойти какать5" },
        { id: 6, title: "Пойти какать6" },
      ],
    },
  ]);

  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentiIem, setCurretItem] = useState();

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
      e.target.style.marginTop = "50px";
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
    e.target.style.marginTop = "50px";
  }
  function dragStartHandler(e, column, item) {
    setCurrentColumn(column);
    setCurrentColumn(item);
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }
  function dropHandler(e, column, item) {
    e.preventDefault();
    e.target.style.marginTop = "0px";
    const currentIndex = currentColumn.items.indexOf(currentiIem);
    currentColumn.items.splice(currentIndex, 1);
    const dropIndex = currentColumn.items.indexOf(item);
    column.items.splice(dropIndex + 1, 0, currentiIem);
    setColumns(
      column.map((b) => {
        if (b.id === column.id) {
          return column;
        }
        if (b.id === column.id) {
          return currentColumn;
        }
        return b;
      })
    );
  } /* 540 */

  return (
    <div>
      <div className={"board"}>
        {columns.map((column) => (
          <div className={"column"}>
            <div className={"columnTitle"}>{column.title}</div>
            {column.items.map((item) => (
              <div
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e, column, item)}
                onDragStart={(e) => dragStartHandler(e, column, item)}
                onDragEnd={(e) => dragEndHandler(e, column, item)}
                onDrop={(e) => dropHandler(e, column, item)}
                draggable={true}
                className={"item"}
              >
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
