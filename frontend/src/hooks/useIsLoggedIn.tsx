import { useAuthStore } from "../features/auth/store/authStore";

export const useIsLoggedIn = () => {
  const token = useAuthStore((state) => state.token);
  return !!token;
};
