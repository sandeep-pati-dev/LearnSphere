import axios from "axios";

export const server = "http://localhost:5000";

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
