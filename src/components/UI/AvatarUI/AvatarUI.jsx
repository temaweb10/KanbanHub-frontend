import { Avatar } from "@mui/material";
import React from "react";
import styles from "./AvatarUI.module.scss";
function AvatarUI({
  className,
  style,
  avatarUrl,
  avatarText,
  avatarColor,
  onClick,
}) {
  console.log(avatarUrl !== "" ? avatarUrl : avatarText);
  console.log({
    className,
    style,
    avatarUrl,
    avatarText,
    avatarColor,
    onClick,
  });
  return (
    <Avatar
      className={[styles.avatar, className].join(" ")}
      style={
        avatarColor !== undefined && ""
          ? { ...style, backgroundColor: `${avatarColor}!important` }
          : { ...style, backgroundColor: `#f8f8fb` }
      }
      onClick={onClick}
      src={avatarUrl !== "" && avatarUrl}
      alt={avatarText}
    >
      {avatarUrl == "" && avatarText}
    </Avatar>
  );
}

export default AvatarUI;
