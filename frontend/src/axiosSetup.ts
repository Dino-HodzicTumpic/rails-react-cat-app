import axios from "axios";
import { useAuthStore } from "./features/auth/store/authStore";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
