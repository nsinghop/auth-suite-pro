import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

// Attach token from storage on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (token) {
    if (config.headers) {
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }
  return config;
});

export default api;
