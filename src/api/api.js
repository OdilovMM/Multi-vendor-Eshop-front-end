import axios from "axios";
import { API_BASE_URL } from "../utils/backendUrl";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // or retrieve from a Redux store

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
