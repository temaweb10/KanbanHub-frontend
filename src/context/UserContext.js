import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDataIsLoading, setUserDataIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(localStorage.getItem("token"));
      try {
        const { data } = await axios.get("/auth/me");
        setUserData(data);
        setUserDataIsLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserData();
  }, []);

  return (
    !userDataIsLoading && (
      <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    )
  );
};
