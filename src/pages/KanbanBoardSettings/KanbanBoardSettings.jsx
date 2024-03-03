import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "../../axios";
import AvatarUI from "../../components/UI/AvatarUI/AvatarUI";
import Button from "../../components/UI/Button/Button";
import Form from "../../components/UI/Form/Form";
import formStyles from "../../components/UI/Form/Form.module.scss";
import Input from "../../components/UI/Input/Input";
import { BoardContext } from "../../context/BoardContext";
function KanbanBoardSettings() {
  const { projectContext } = useContext(BoardContext);
  const [settings, setSettings] = useState({
    nameProject: projectContext.nameProject,
  });

  const editProject = () => {
    axios
      .post(`/project/${projectContext._id}/edit`, { ...settings })
      .catch((err) => {
        alert("Ошибка при изменении дашбоарда");
      });
  };

  return (
    <Container maxWidth="lg" className="containerCenter">
      <Form>
        <div style={{ minWidth: "30%" }}>
          <h1 className={formStyles.formTitle}>Основные настройки</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <AvatarUI
              className={formStyles.avatarLarge}
              avatarText={projectContext.nameProject.slice(0, 1).toUpperCase()}
              avatarColor={""}
              avatarUrl={""}
            />
          </div>
          <h3 className={formStyles.formSubTitle}>Название дашбоарда</h3>
          <Input
            placeholder="Введите название"
            value={settings.nameProject}
            onChange={(e) => {
              setSettings({ ...settings, nameProject: e.target.value });
            }}
            required={true}
          />
          <Button  className={formStyles.button} onClick={editProject}>
            Сохранить изменения
          </Button>

        </div>
      </Form>
    </Container>
  );
}

export default KanbanBoardSettings;
