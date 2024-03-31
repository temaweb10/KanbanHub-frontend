import React, {useContext, useEffect, useState} from 'react'
import styles from './MenuSetAvatar.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu  from "../Menu/Menu";
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import axios from '../../axios'
import {useParams} from "react-router-dom";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import FileUpload from '../FileUpload/FileUpload'
import ProjectService from "../../API/ProjectService";
import {useFetching} from "../../hooks/useFetching";
import {socket,handleProjectUpdated} from "../../socket";
import {UserContext} from "../../context/UserContext";
import {BoardContext} from "../../context/BoardContext";
import {serverUrl} from "../../utils/constants";

function MenuSetAvatar({setMenuVisible, menuVisible}) {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [selectAvatarImage, setSelectAvatarImage] = useState(null);
    const [avatarSettings,setAvatarSettings] = useState({
        avatarUrl:''
    })
    const params = useParams()
    const idProject = params.idProject
    const { projectContext, updateBoardContext } = useContext(BoardContext);
    const userData = useContext(UserContext);
    const handleTabChange = (e, tabIndex) => {setCurrentTabIndex(tabIndex);}
    const [editProject, isEditProjectLoading, editProjectError] = useFetching(async (editData,idProject) => {
        const {data} = await ProjectService.editProject(editData,idProject)
        console.log(data)
        updateBoardContext(data)
        socket.emit(
          "changeProject",
          JSON.stringify({
              idUserChangedProject: userData._id,
              idProject: idProject,
          })
        );
    })
    useEffect(() => {
        const handleProjectUpdated = (resStringify) => {
            const resDataParse = JSON.parse(resStringify);
            if (userData._id !== resDataParse.idUserChangedProject) {
                updateBoardContext(resDataParse.projectUpdated);
                console.log("обновился у второго")
            }

        };
        socket.on("changeProjectState", handleProjectUpdated);
    }, []);
    return (
        <Menu setMenuVisible={setMenuVisible} visible={menuVisible} haveClose={false} className={styles.modalContent}>
            <Tabs className={styles.tabs} value={currentTabIndex} onChange={handleTabChange} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}>
                <Tab label='Цвета' className={styles.tab}   />
                <Tab label='Загрузить'  />
                <Tab label='Ссылка' />

            </Tabs>

            {currentTabIndex === 0 && <div className={styles.avatarMenuContent}>
                <div className={styles.colorsBox}></div>
            </div>}

            {currentTabIndex === 1 &&
                <div className={styles.avatarMenuContent}>
                    <FileUpload
                        uploadUrl={serverUrl+"project/"+idProject+"/upload-avatar"}
                        idProject={idProject}
                        textButton={"Установить аватар"}
                        text={"Нажмите , или перенисите изображение"}
                        icon={<CropOriginalIcon fontSize={"large"}/>}
                    />
                </div>}

            {currentTabIndex === 2 && <div className={styles.avatarMenuContent}>
                <Input value={avatarSettings.avatarUrl} onChange={(e) => {
                    setAvatarSettings({...avatarSettings, avatarUrl: e.target.value})
                }} placeholder="Вставьте ссылку на изображение"/>
                <Button onClick={(e)=>{
                    e.preventDefault()
                    editProject({avatarUrl:avatarSettings.avatarUrl},idProject)
                    axios
                        .post(`/project/${idProject}/edit`,  {avatarUrl:avatarSettings.avatarUrl} )
                        .catch((err) => {
                            alert("Ошибка при изменении дашбоарда");
                        });
                }}>Загрузить картинку</Button>
            </div>}
        </Menu>
    )
}




export default MenuSetAvatar