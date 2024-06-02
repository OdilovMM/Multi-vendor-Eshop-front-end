import axios from "axios";
import { API_BASE_URL } from "../utils/backendUrl";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

export default api;
