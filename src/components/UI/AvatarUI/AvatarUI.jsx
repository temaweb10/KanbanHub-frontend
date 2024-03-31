import { Avatar } from "@mui/material";
import React from "react";
import styles from "./AvatarUI.module.scss";
import {serverUrl} from "../../../utils/constants";

function AvatarUI({className, style, onClick, setAvatarSettings, avatarSettings}) {
  if(avatarSettings?.avatarColor !== undefined && avatarSettings?.avatarColor !== ''){
    return  <Avatar onClick={onClick} className={[styles.avatar, className].join(" ")} style={{ ...style, backgroundColor: `${avatarSettings?.avatarColor}!important` }}
    />
  } else if(avatarSettings?.avatarUrl !== undefined){
    return <Avatar onClick={onClick} className={[styles.avatar, className].join(" ")} src={serverUrl+avatarSettings?.avatarUrl}/>
  } else if(!avatarSettings?.avatarUrl || !avatarSettings.avatarColor ){
    return <Avatar onClick={onClick} className={[styles.avatar, className].join(" ")} >{avatarSettings?.avatarText?.slice(0, 2)}</Avatar>
  }
}

export default AvatarUI;
