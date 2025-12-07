import axios from "axios";
import { useAuthStore } from "@/features/auth/useAuthStore";

export const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
});

//ADD TOKEN AUTOMATICALLY
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})