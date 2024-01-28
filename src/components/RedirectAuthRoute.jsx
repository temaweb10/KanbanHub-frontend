import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuthMe, selectorIsAuth } from "../redux/slices/auth";
import Loader from "./Loader/Loader";
function RedirectAuthRoute({ children }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const userData = useSelector((state) => state.auth);
  const userDataIsLoading = userData?.status === "loading";

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  /*   isAuth === true && !userDataIsLoading ? (
    <Navigate
      to={`/user/${userData?.data?._id}/dashboards/ `}
      replace
    />
  ) : (
    ""
  ) */

  if (!userDataIsLoading) {
    if (isAuth === true) {
      return (
        <Navigate to={`/user/${userData?.data?._id}/dashboards/ `} replace />
      );
    } else if (isAuth === false) {
      return <Navigate replace to="/login" />;
    }
  } else {
    return <Loader />;
  }
}

export default RedirectAuthRoute;
