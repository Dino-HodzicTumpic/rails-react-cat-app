import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catService } from "../services/catService";

interface CatFavoriteStore {
  favoriteCats: string[];
  fetchFavoriteCats: (token: string) => Promise<void>;
  toggleFavoriteCat: (
    token: string,
    id: string,
    imageUrl: string,
    catName: string
  ) => Promise<void>;
  clearFavorites: () => void;
}

export const useCatFavoriteStore = create<CatFavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteCats: [],
      fetchFavoriteCats: async (token: string) => {
        try {
          const catIds = await catService.getFavoriteCats(token);
          set({ favoriteCats: catIds });
        } catch (err) {
          console.error("Failed to fetch favorite cats:", err);
        }
      },
      toggleFavoriteCat: async (
        token: string,
        id: string,
        imageUrl: string,
        catName: string
      ) => {
        const { favoriteCats } = get();
        const isCurrentlyFavorite = favoriteCats.includes(id);

        // optimistic update
        const newFavorites = isCurrentlyFavorite
          ? favoriteCats.filter((catId) => catId !== id)
          : [...favoriteCats, id];

        set({ favoriteCats: newFavorites });

        // updateaj i na backendu
        try {
          if (isCurrentlyFavorite) {
            // makni iz favorita
            await catService.removeFavoriteCat(token, id);
          } else {
            // dodaj u favorite
            await catService.addFavoriteCat(token, id, imageUrl, catName);
          }
        } catch (err: any) {
          set({ favoriteCats });
          //  Ispiši error s backenda
          const errorMessage =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Unknown error occurred";
          console.error("Error toggling cat favorite:", errorMessage);
        }
      },
      clearFavorites: () => set({ favoriteCats: [] }),
    }),
    {
      name: "cat-favorites-storage",
      partialize: (state) => ({ favoriteCats: state.favoriteCats }),
    }
  )
);
