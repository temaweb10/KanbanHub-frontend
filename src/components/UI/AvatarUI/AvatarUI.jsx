import { Avatar } from "@mui/material";
import React from "react";
import styles from "./AvatarUI.module.scss";
import {serverUrl} from "../../../utils/constants";
function AvatarUI({className, style, onClick, setAvatarSettings, avatarSettings}) {

  if(avatarSettings?.avatarColor !== undefined && avatarSettings?.avatarColor !== '' && avatarSettings.avatarText !== undefined){
    return  <Avatar style={style} onClick={onClick} className={[styles.avatar, className].join(" ")}
     sx={{ bgcolor: avatarSettings.avatarColor }}
    >{avatarSettings?.avatarText?.slice(0, 2)}</Avatar>

  } else if(avatarSettings?.avatarUrl !== undefined){
    return <Avatar style={style} onClick={onClick} className={[styles.avatar, className].join(" ")} src={avatarSettings?.avatarUrl.substr( 0, 16 ) === "uploads/projects" ? serverUrl+avatarSettings?.avatarUrl : avatarSettings?.avatarUrl}/>

  } else if(!avatarSettings?.avatarUrl || !avatarSettings.avatarColor ){
    return <Avatar sx={{ bgcolor: "#f8f8fb!important",color:"#202430" }} style={style} onClick={onClick} className={[styles.avatar, className].join(" ")} >{avatarSettings?.avatarText?.slice(0, 2)}</Avatar>

  } else {
    return <Avatar style={style} onClick={onClick} className={[styles.avatar, className].join(" ")} />
  }
}

export default AvatarUI;
