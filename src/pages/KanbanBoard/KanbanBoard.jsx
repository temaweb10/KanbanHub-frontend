/* import { Container } from "@mui/material"; */
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../axios";
import DragDropCards from "../../components/DragDropCards/DragDropCards";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import indexPage from "../../indexPage.css";
import {socket} from "../../socket";
import styles from "./KanbanBoard.module.css";
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
  columns: [
    {
      _id: "65a3a81cc797b7925a99fc38",
      name: "ПРОВЕРКА АПДdfЕЙfffffТ",
      columnId: "finished",
      kanbanCards: [
        {
          _id: "65a3aa55d79dcb3cd176b7be",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "finished",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
    },
    {
      name: "Проверка12354",
      columnId: "Проверка12354_1705225383722",
      kanbanCards: [
        {
          _id: "65a3ad0171dd900ae93718fb",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "Проверка12354_1705225383722",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
        {
          _id: "65a3ad1271dd900ae9371903",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "Проверка12354_1705225383722",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
      _id: "65a3aca771dd900ae93718e3",
    },
    {
      name: "Проверка12354_1705225383722",
      columnId: "Проверка12354_1705225383722_1705225411573",
      kanbanCards: [],
      _id: "65a3acc371dd900ae93718ee",
    },
    {
      name: "sdsdsd",
      columnId: "sdsdsd_1705225566819",
      kanbanCards: [
        {
          _id: "65a3ad7371dd900ae937191a",
          nameCard: "aaaaa2222",
          description: "до 24 января",
          columnId: "forExecution",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
      _id: "65a3ad5e71dd900ae937190b",
    },
    {
      name: "фф",
      columnId: "фф_1705256860664",
      kanbanCards: [],
      _id: "65a4279c4b35c6b5b2c6c65a",
    },
  ],
  cardOrder: ["card-1", "card-2", "card-3", "card-4"],
};
const data = {
  _id: "65a3a81cc797b7925a99fc36",
  nameProject: "testpgroject",
  code: "tntdfu2",
  kanbanCardsLength: 0,
  participants: [
    {
      user: "659d5aa3924625af1c10f7b1",
      role: "admin",
      _id: "65a3a81cc797b7925a99fc37",
    },
  ],
  columns: [
    {
      _id: "65a3a81cc797b7925a99fc38",
      name: "ПРОВЕРКА АПДdfЕЙfffffТ",
      columnId: "finished",
      kanbanCards: [
        {
          _id: "65a3aa55d79dcb3cd176b7be",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "finished",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
    },
    {
      name: "Проверка12354",
      columnId: "Проверка12354_1705225383722",
      kanbanCards: [
        {
          _id: "65a3ad0171dd900ae93718fb",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "Проверка12354_1705225383722",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
        {
          _id: "65a3ad1271dd900ae9371903",
          nameCard: "Додsdfsdf авторизацию",
          description: "до 24 января",
          columnId: "Проверка12354_1705225383722",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
      _id: "65a3aca771dd900ae93718e3",
    },
    {
      name: "Проверка12354_1705225383722",
      columnId: "Проверка12354_1705225383722_1705225411573",
      kanbanCards: [],
      _id: "65a3acc371dd900ae93718ee",
    },
    {
      name: "sdsdsd",
      columnId: "sdsdsd_1705225566819",
      kanbanCards: [
        {
          _id: "65a3ad7371dd900ae937191a",
          nameCard: "aaaaa2222",
          description: "до 24 января",
          columnId: "forExecution",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
        {
          _id: "65a3ad7371dd900ae9371fgf",
          nameCard: "aa1111111222222243",
          description: "ANUS",
          columnId: "forExecution",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
        {
          _id: "65a3ad7371dd900ae9371f44gf",
          nameCard: "BCD",
          description: "ANUS",
          columnId: "forExecution",
          projectId: "659d38d5c7125108530e10ed",
          codeNum: "tntdfu2-0",
          creator: "659d5aa3924625af1c10f7b1",
          comments: [],
          __v: 0,
        },
      ],
      _id: "65a3ad5e71dd900ae937190b",
    },
    {
      name: "фф",
      columnId: "фф_1705256860664",
      kanbanCards: [],
      _id: "65a4279c4b35c6b5b2c6c65a",
    },
  ],
  __v: 12,
};
const Container = styled.div`
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const Menu = styled.div`
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
  const params = useParams();
  const [dataset, _] = useState(DATASET);
  const [project, setProject] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const { projectContext, updateBoardContext } = useContext(BoardContext);
  const [tasks, setTasks] = useState(dataset.tasks);
  const [cards, setCards] = useState(projectContext.columns);
  const userData = useContext(UserContext);
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder);
  const [modal, setModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [linkIsLoading, setLinkIsLoading] = useState(true);
  const copyInputRef = useRef(null);

  useEffect(() => {
    document.title = `Дашбоард ${projectContext.nameProject}`
    const handleProjectUpdated = (resStringify) => {
      const resDataParse = JSON.parse(resStringify);
      if (userData._id !== resDataParse.idUserChangedProject) {
        updateBoardContext(resDataParse.projectUpdated);
      }
    };

    socket.on("changeProjectState", handleProjectUpdated);

    /*  const cleanup = () => {
      socket.off("projectUpdated", handleProjectUpdated);
    };
    return () => {
      cleanup();
    }; */
  }, []);

  const onAddNewCard = () => {
    axios
      .post(`/project/${params.idProject}/columnCreate`, {
        name: `колонка №${projectContext.columns.length}`,
      })
      .then((res) => {
        console.log(res.data)
        updateBoardContext({...projectContext, columns:[...projectContext.columns,res.data]});

      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container maxWidth="xl" className={styles.main}>
      <div className={styles.mainContent}>
        <div className={styles.projectInfo}></div>

        <Modal
          setVisible={setModal}
          visible={modal}
          title={"Пригласить людей в дашбоард"}
        >
          <>
            <span className={styles.description}>
              Для генерации пригласительной ссылки выберите роль участника
              команде
            </span>
            <div className={styles.selectContainer}>
              <select
                className={styles.selectRole}
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value) {
                    axios
                      .get(`/project/${projectContext._id}/generateInviteLink`)
                      .then((res) => {
                        console.log(res.data);
                        setInviteLink(
                          `http://localhost:3000/accept-invite/${res.data}`
                        );
                        setLinkIsLoading(false);
                      })
                      .catch((err) => {
                        alert(err.response.data.message);
                        setModal(true);
                      });
                  } else {
                    setLinkIsLoading(true);
                  }
                }}
              >
                <option value="">Выберите роль</option>
                <option value="member">Участник</option>
                <option value="admin">Админ</option>
                {/*   text.select();
                 */}
              </select>
            </div>

            {!linkIsLoading ? (
              <div className={styles.copyContainer}>
                <Input
                  readonly={true}
                  placeholder="Текст для копирования еще не был сгенерирован"
                  className={styles.copyingText}
                  value={inviteLink}
                  refS={copyInputRef}
                />
                <ContentCopyIcon
                  title={"Скопировать пригласительную ссылку"}
                  className={styles.icon}
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    copyInputRef.current.select();
                    /*      toast("Here is your toast."); */
                    /*      console.log(copyInputRef.current); */
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </>
        </Modal>

        <div className={styles.boardContainer}>
          <DragDropCards
            cards={cards}
            tasks={tasks}
            cardOrder={cardOrder}
            setCards={setCards}
            setTasks={setTasks}
            setCardOrder={setCardOrder}

          />
          <Menu>
            {/*   <Note>
              you can add, edit, or remove cards & tasks. <br />
              double click to edit card title or task content. <br />
              task is removed when content is empty. <br />
              drag/drop card or task to desired order. <br />
              your edited changes are saved in local storage.
            </Note> 
            
            /*  (
    <Loader />
  ); */}
            <NewCard onClick={onAddNewCard}>+ New Card</NewCard>
          </Menu>
        </div>
      </div>
    </Container>
  );
}

export default KanbanBoard;
