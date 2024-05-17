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
import AvatarUI from "../UI/AvatarUI/AvatarUI";
function MenuSetAvatar({setMenuVisible, menuVisible}) {
    const { projectContext, updateBoardContext } = useContext(BoardContext);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [selectAvatarImage, setSelectAvatarImage] = useState(null);
    const [selectAvatarColor, setSelectAvatarColor] = useState(null);
    const [avatarSettings,setAvatarSettings] = useState({
        avatarUrl:projectContext?.avatarUrl,
        avatarColor:projectContext?.avatarColor
    })
    const params = useParams()
    const idProject = params.idProject

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

    const colors = ["#ff607c","#ffb55d","#35aaff","#ef7171","#66caa0","#aabbf5"]

    return (
        <Menu setMenuVisible={setMenuVisible} visible={menuVisible} haveClose={false} className={styles.modalContent}>
            <Tabs className={styles.tabs} value={currentTabIndex} onChange={handleTabChange} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}>
                <Tab label='Цвета' className={styles.tab}   />
                <Tab label='Загрузить'  />
                <Tab label='Ссылка' />

            </Tabs>

            {currentTabIndex === 0 && <div className={styles.avatarMenuContent}>
                <div className={styles.avatarColorsBox}>
                    <div className={styles.avatarResult}>
                        <AvatarUI style={{borderRadius:"10px",width: "120px",height: "120px",marginBottom:"10px",fontSize:"48px"}} avatarSettings={{avatarColor:avatarSettings.avatarColor,avatarText:projectContext.nameProject}}/>
                        <Button isDisabled={avatarSettings.avatarColor === undefined || avatarSettings.avatarColor === ""} style={{width:"100%"}} onClick={(e)=>{
                            e.preventDefault()
                                editProject({avatarUrl:"",avatarColor:avatarSettings.avatarColor},idProject)


                        }}>Сохранить</Button>
                    </div>
                    <div>
                        <div className={styles.avatarColorsSection}>
                            {colors.map((color, i) => <div onClick={(e) => setAvatarSettings((actualSettings)=> {
                                console.log(actualSettings)
                                return {...actualSettings,avatarText:userData.fullName, avatarColor: color}
                            })} style={{border: color === avatarSettings.avatarColor ? "1px solid rgb(134 133 133);" : "0px", backgroundColor: color}}></div>)}
                        </div>
                    </div>

                </div>
            </div>}

            {currentTabIndex === 1 && <div className={styles.avatarMenuContent}>
                <FileUpload
                  uploadUrl={serverUrl + "project/" + idProject + "/upload-avatar"}
                  idProject={idProject}
                  textButton={"Установить аватар"}
                        text={"Нажмите , или перенисите изображение"}
                        icon={<CropOriginalIcon fontSize={"large"}/>}
                    />

                </div>}

            {currentTabIndex === 2 && <div className={styles.avatarMenuContent}>
                <Input value={avatarSettings.avatarUrl} onChange={(e) => {
                    setAvatarSettings({...avatarSettings, avatarUrl: e.target.value})}} placeholder="Вставьте ссылку на изображение"/>
                <Button onClick={(e)=>{
                    e.preventDefault()
                    editProject({avatarUrl:avatarSettings.avatarUrl,avatarColor:""},idProject)
                   /* axios
                        .post(`/project/${idProject}/edit`,  {avatarUrl:avatarSettings.avatarUrl} )
                        .catch((err) => {
                            alert("Ошибка при изменении дашбоарда");
                        });*/
                }}>Загрузить картинку</Button>
            </div>}
        </Menu>
    )
}




export default MenuSetAvatar