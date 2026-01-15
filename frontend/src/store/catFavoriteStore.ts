import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catService } from "../services/catService";
import axios from "axios";

interface CatFavoriteStore {
  favoriteCats: string[];
  fetchFavoriteCats: (token: string) => Promise<void>;
  toggleFavoriteCat: (
    token: string,
    id: string,
    imageUrl: string,
    catName: string,
    breedId?: number
  ) => Promise<void>;
  removeFavoriteCat: (token: string, id: string) => void;
  setFavoriteCats: (ids: string[]) => void;
  clearFavorites: () => void;
}

export const useCatFavoriteStore = create<CatFavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteCats: [],
      fetchFavoriteCats: async (token: string) => {
        try {
          const catIds = await catService.getFavoriteCats(token, true);
          set({ favoriteCats: catIds });
        } catch (err) {
          console.error("Failed to fetch favorite cats:", err);
        }
      },

      removeFavoriteCat: async (token: string, id: string) => {
        const { favoriteCats } = get();
        const isCurrentlyFavorite = favoriteCats.includes(id);

        if (isCurrentlyFavorite) {
          const newFavorites = favoriteCats.filter((catId) => catId !== id);
          set({ favoriteCats: newFavorites });
        }

        try {
          await catService.removeFavoriteCat(token, id);
        } catch (err: any) {
          set({ favoriteCats });
          //  Ispiši error s backenda
          const errorMessage =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Unknown error occurred";
          console.error("Error removing cat from favorites:", errorMessage);
        }
      },

      toggleFavoriteCat: async (
        token: string,
        id: string,
        imageUrl: string,
        catName: string,
        breedId?: number
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
            if (breedId === undefined)
              throw new Error("Breed ID is required to add a favorite cat.");

            // dodaj u favorite
            await catService.addFavoriteCat(
              token,
              id,
              imageUrl,
              catName,
              breedId
            );
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
      setFavoriteCats: (ids) => set({ favoriteCats: ids }),
      clearFavorites: () => set({ favoriteCats: [] }),
    }),
    {
      name: "cat-favorites-storage",
      partialize: (state) => ({ favoriteCats: state.favoriteCats }),
    }
  )
);
