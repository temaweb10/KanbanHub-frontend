import React from "react";
import HeaderBoard from "../components/HeaderBoard/HeaderBoard";
import { BoardProvider } from "../context/BoardContext";
import { UserContext, UserProvider } from "../context/UserContext";
function BoardLayout({ children }) {
  return (
    <>
      <UserProvider>
        <BoardProvider>
          <HeaderBoard />
          {children}
        </BoardProvider>
      </UserProvider>
    </>
  );
}

export default BoardLayout;
