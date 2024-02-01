import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FindUser.module.scss";
function FindUser({ users }) {
  const [userSearchValue, setUserSearchValue] = useState("");
  const [sortUsers, setSortUsers] = useState(users);
  console.log(users);
  useEffect(() => {
    console.log(sortUsers);
  }, [sortUsers]);
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {" "}
        <input
          className={styles.input}
          type="text"
          placeholder="Пользователь"
          value={userSearchValue}
          onChange={(e) => {
            setUserSearchValue(e.target.value);
            setSortUsers(
              users.filter((item) =>
                item.user.fullName
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
        />
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userItem}>
          <PeopleOutlineIcon
            htmlColor="#7b7575"
            titleAccess="Исполнители"
            fontSize="24"
            className={styles.icon}
          />
          <span className={styles.userFullName}>Не назначен</span>
        </div>
        {sortUsers.map((el) => {
          console.log(el);
          return (
            <div className={styles.userItem}>
              {" "}
              <Avatar className={styles.avatar}>
                {el.user.fullName.slice(0, 2).toUpperCase()}
              </Avatar>
              <span className={styles.userFullName}>{el.user.fullName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FindUser;
