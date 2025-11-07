import axios from "axios";

//  Base URL logic — works in both local dev and production
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api",
  withCredentials: false, // you can set true if using cookies in the future
});

// Attach JWT token automatically for authenticated requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
