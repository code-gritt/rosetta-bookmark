import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://rosetta-bookmark-2.onrender.com/api/",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
