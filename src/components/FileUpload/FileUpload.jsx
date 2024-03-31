import React, {useContext, useState} from 'react';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import Button from '../UI/Button/Button'
import axios from "../../axios";
import styles from './FileUpload.module.scss'
import {socket} from "../../socket";
import {UserContext} from "../../context/UserContext";
import {BoardContext} from "../../context/BoardContext";
function FileUpload({uploadUrl,textButton,text,icon,idProject}) {
  const [selectAvatarImage, setSelectAvatarImage] = useState(null);
  const userData = useContext(UserContext);
  const { projectContext, updateBoardContext } = useContext(BoardContext);
  const editProject = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('avatar', selectAvatarImage);

    axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      updateBoardContext({...projectContext,avatarUrl:response.avatarUrl,avatarColor:undefined})
      socket.emit(
        "changeProject",
        JSON.stringify({
          idUserChangedProject: userData._id,
          idProject: idProject,
        })
      );
    }).catch(error => {
      console.error(error);
    });

  };
  return (<div>
    <div className={styles.fileUploadBox}>
      <div className={styles.fileUpload}>

        <div className={styles.fileUploadInner}>
          {icon}
          <p>{text}</p>
        </div>

        <input
          type="file"
          name="myImage"
          className={styles.fileUploadInput}
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectAvatarImage(event.target.files[0]);
          }}/>

      </div>

      <Button onClick={editProject}>{textButton}</Button>

    </div>
  </div>)
}

export default FileUpload;