import { create } from "zustand";
import { persist } from "zustand/middleware";
import { breedService } from "../services/breedService";

interface BreedFavoritesStore {
  favoriteBreeds: number[];
  fetchFavoriteBreeds: (token: string) => Promise<void>;
  toggleFavoriteBreed: (breedId: number, token: string) => Promise<void>;
  clearFavorites: () => void;
}

export const useBreedFavoritesStore = create<BreedFavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteBreeds: [],
      fetchFavoriteBreeds: async (token: string) => {
        try {
          const breedIds = await breedService.getFavoriteBreeds(token);
          set({ favoriteBreeds: breedIds });
        } catch (err) {
          console.error("Failed to fetch favorite breeds:", err);
        }
      },

      toggleFavoriteBreed: async (breedId: number, token: string) => {
        const { favoriteBreeds } = get();
        const isCurrentlyFavorite = favoriteBreeds.includes(breedId);

        //optimistic update
        const newFavorites = isCurrentlyFavorite
          ? favoriteBreeds.filter((id) => id !== breedId)
          : [...favoriteBreeds, breedId];

        set({ favoriteBreeds: newFavorites });

        // updateaj i na backendu
        try {
          if (isCurrentlyFavorite) {
            //makni iz favorita
            await breedService.removeFavoriteBreed(breedId, token);
          } else {
            //dodaj u favorite
            await breedService.addFavoriteBreed(breedId, token);
          }
        } catch (err: any) {
          set({ favoriteBreeds });
          // 👇 Ispiši error s backenda
          const errorMessage =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Unknown error occurred";
          console.error("Error toggling breed favorite:", errorMessage);
        }
      },

      clearFavorites: () => set({ favoriteBreeds: [] }),
    }),
    {
      name: "breed-favorites-storage",
      partialize: (state) => ({ favoriteBreeds: state.favoriteBreeds }),
    }
  )
);
