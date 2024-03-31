import { io } from "socket.io-client";
import {serverUrl} from "./utils/constants";

export const socket = io(serverUrl, {
  cors: {
    origin: serverUrl,
    credentials: true,
  },
});

export  const handleProjectUpdated = (resStringify,myUserId,updateBoardContext) => {
  const resDataParse = JSON.parse(resStringify);
  if (myUserId !== resDataParse.idUserChangedProject) {
    updateBoardContext(resDataParse.projectUpdated);
  }
}



