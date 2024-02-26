import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import Loader from "../components/Loader/Loader";
export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projectContext, setProjectContext] = useState(null);
  const [projectDataIsLoading, setProjectDataIsLoading] = useState(true);
  const params = useParams();

  const updateBoardContext = (newData) => {
    setProjectContext({
      ...newData,
      usersProject: projectContext?.usersProject,
    });
  };

  useEffect(() => {
    const getInfoProject = async () => {
      try {
        const { data } = await axios.get(`/project/${params.idProject}`);
        const usersInProject = await axios.get(
          `/project/${params.idProject}/users`
        );

        setProjectContext({ ...data, usersProject: usersInProject.data });
        setProjectDataIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    getInfoProject();
  }, []);

  return !projectDataIsLoading ? (
    <BoardContext.Provider
      value={{
        projectContext,
        updateBoardContext,
      }}
    >
      {children}
    </BoardContext.Provider>
  ) : (
    <Loader style={{ height: "100vh" }} />
  );
};
