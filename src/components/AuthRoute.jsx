import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "../../src/context/UserContext";

function AuthRoute({ children }) {
  const userData = useContext(UserContext);

  if (userData) {
    return children;
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default AuthRoute;
