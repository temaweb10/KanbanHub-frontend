import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import AvatarUI from "../../components/UI/AvatarUI/AvatarUI";
import Button from "../../components/UI/Button/Button";
import Form from "../../components/UI/Form/Form";
import formStyles from "../../components/UI/Form/Form.module.scss";
import Input from "../../components/UI/Input/Input";
import { BoardContext } from "../../context/BoardContext";
import {UserContext} from "../../context/UserContext";
import MenuSetAvatar from "../../components/MenuSetAvatar/MenuSetAvatar";
import ProjectService from "../../API/ProjectService";
import {useFetching} from "../../hooks/useFetching";

function KanbanBoardSettings() {
  const { projectContext } = useContext(BoardContext);
  const userData = useContext(UserContext);
  const [settings, setSettings] = useState({nameProject: projectContext.nameProject});
  const [menuAvatarVisible,setMenuAvatarVisible] = useState(false)
  const [editProject, isEditProjectLoading, editProjectError] = useFetching(async () => {
    await ProjectService.editProject(settings,projectContext._id)
  })
  console.log(projectContext)
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
                position:'relative'
            }}
          >
            <AvatarUI
              className={formStyles.avatarLarge}
              onClick={()=>{setMenuAvatarVisible(true)}}
              avatarSettings={{avatarUrl:projectContext?.avatarUrl,avatarColor:projectContext?.avatarColor,avatarText:projectContext.nameProject}}
            />
              <MenuSetAvatar setMenuVisible={setMenuAvatarVisible} menuVisible={menuAvatarVisible}/>
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
