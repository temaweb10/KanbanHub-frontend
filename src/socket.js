import { io } from "socket.io-client";
const socket = io("http://localhost:3333", {
  cors: {
    origin: "http://localhost:3333",
    credentials: true,
  },
});

export default socket;
