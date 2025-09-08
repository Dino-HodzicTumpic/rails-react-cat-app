import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  nickname: string;
  email: string;
  setToken: (newToken: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      nickname: "",
      email: "",
      setToken: (newToken) => set({ token: newToken }),
      setNickname: (nickname) => set({ nickname }),
      setEmail: (email) => set({ email }),
      clearToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
