
import axios from "axios";


const api = axios.create({
    baseURL: "http://103.140.0.164:7080",
    timeout: 10000,
    headers: {
        'Content-Type':'application/json',
    },
});

// Request interceptor

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor

api.interceptors.request.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized access");
        }
        return Promise.reject(error);
    }
);

export default api;
