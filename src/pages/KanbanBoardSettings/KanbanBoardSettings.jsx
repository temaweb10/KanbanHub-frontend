import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import Form from "../../components/UI/Form/Form";
import formStyles from "../../components/UI/Form/Form.module.scss";
import Input from "../../components/UI/Input/Input";
import { BoardContext } from "../../context/BoardContext";

function KanbanBoardSettings() {
  const { projectContext } = useContext(BoardContext);
  const [settings, setSettings] = useState({
    nameProject: projectContext.nameProject,
  });
  return (
    <Container
      maxWidth="lg"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form>
        <div style={{ minWidth: "30%" }}>
          <h1 className={formStyles.formTitle}>Основные настройки</h1>
          <Input
            placeholder="Введите название"
            value={settings.nameProject}
            onChange={(e) => {
              setSettings({ ...settings, nameProject: e.target.value });
            }}
          />
        </div>
      </Form>
    </Container>
  );
}

export default KanbanBoardSettings;
