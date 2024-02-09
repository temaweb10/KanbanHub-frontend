import React from "react";
import { UserContext, UserProvider } from "../context/UserContext";
import Header from "./Header/Header";
function PageLayout({ children }) {
  return (
    <UserProvider>
      <Header />
      {children}
    </UserProvider>
  );
}

export default PageLayout;
