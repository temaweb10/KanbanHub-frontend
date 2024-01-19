import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuthMe, selectorIsAuth } from "../redux/slices/auth";
function AuthRoute({ children }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const userData = useSelector((state) => state.auth);
  const userDataIsLoading = userData?.status === "loading";
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  if (!userDataIsLoading) {
    if (isAuth) {
      return children;
    } else {
      return <Navigate replace to="/register" />;
    }
  }
}

export default AuthRoute;
