import CloseIcon from "@mui/icons-material/Close";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styles from "./FindUser.module.scss";
function FindUser({ users, showFindUsers, setExecutor }) {
  const [userSearchValue, setUserSearchValue] = useState("");
  const [selectUsers, setSelectUsers] = useState([]);
  const [sortUsers, setSortUsers] = useState(users);

  return (
    <div
      className={styles.container}
      style={{ display: showFindUsers ? "block" : "none" }}
    >
      <div className={styles.inputContainer}>
        {selectUsers &&
          selectUsers.map((el) => {
            return (
              <div className={styles.userSelectContainer} key={Math.random()}>
                <span data-menu-item={true} className={styles.fullName}>
                  {el.user.fullName}
                </span>
                <CloseIcon
                  htmlColor="#7b7575"
                  titleAccess="Удалить выбранного исполнителя"
                  fontSize="18"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortUsers([...sortUsers, el]);
                    setSelectUsers(
                      selectUsers.filter((elSort) => {
                        return elSort.user._id !== el.user._id;
                      })
                    );
                    setUserSearchValue("");
                  }}
                  className={styles.icon}
                />
              </div>
            );
          })}
        <input
          className={styles.input}
          type="text"
          placeholder="Пользователь"
          value={userSearchValue}
          onChange={(e) => {
            setUserSearchValue(e.target.value);
            if (selectUsers.length) {
              setSortUsers(
                users.filter((item) => {
                  return (
                    item.user.fullName
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) &&
                    !(selectUsers.findIndex(
                      (el) => el.user._id == item.user._id
                    ) === -1
                      ? false
                      : true)
                  );
                })
              );
            } else {
              setSortUsers(
                users.filter((item) =>
                  item.user.fullName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }
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
          <span
            className={styles.userFullName}
            onClick={() => {
              setSelectUsers([]);
              setSortUsers(users);
            }}
          >
            Не назначен
          </span>
        </div>
        {sortUsers.map((el) => {
          return (
            <div
              key={Math.random()}
              className={styles.userItem}
              onClick={(e) => {
                e.stopPropagation();
                setExecutor([...selectUsers, el]);
                setSelectUsers([...selectUsers, el]);

                setSortUsers(
                  sortUsers.filter((elSort) => {
                    return elSort.user._id !== el.user._id;
                  })
                );
                setUserSearchValue("");
              }}
            >
              {" "}
              <Avatar className={styles.avatar} data-menu-item={true}>
                {el.user.fullName.slice(0, 2).toUpperCase()}
              </Avatar>
              <span className={styles.userFullName} data-menu-item={true}>
                {el.user.fullName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FindUser;
