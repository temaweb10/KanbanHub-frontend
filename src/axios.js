import axios from "axios";

const istance = axios.create({
  baseURL: "http://localhost:3333",
});

istance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default istance;
