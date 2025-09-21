import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", // Spring Boot backend
   // if you use cookies/session
});

// attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
