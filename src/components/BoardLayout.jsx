import React from "react";
import HeaderBoard from "../components/HeaderBoard/HeaderBoard";
import { UserContext, UserProvider } from "../context/UserContext";
function BoardLayout({ children }) {
  return (
    <>
      <UserProvider>
        <HeaderBoard />
        {children}
      </UserProvider>
    </>
  );
}

export default BoardLayout;
