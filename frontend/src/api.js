import axios from "axios";
import { server } from "./main.jsx";

const api = axios.create({
  baseURL: `${server}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
