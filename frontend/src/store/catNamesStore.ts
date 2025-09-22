import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CatNamesState {
  catNames: Record<string, string>; // id -> ime
  setCatName: (id: string, name: string) => void;
}

export const useCatNamesStore = create(
  persist<CatNamesState>(
    (set) => ({
      catNames: {},
      setCatName: (id, name) =>
        set((state) => ({
          catNames: { ...state.catNames, [id]: name },
        })),
    }),
    {
      name: "cat-names", // ime u localStorage
    }
  )
);
