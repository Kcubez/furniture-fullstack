import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Backend URL from environment
  headers: {
    "Content-Type": "application/json", // Send JSON data
  },
  withCredentials: true, // Include cookies in requests
});

api.interceptors.response.use(
  (response) => response, // If successful, just return response
  (error) => {
    if (error.response.status === 401) {
      // If unauthorized
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`; // Redirect to login
    }
    return Promise.reject(error);
  },
);

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
