import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catService } from "../services/catService";

interface CatRatingStore {
  ratings: Record<string, number>;
  averageRatings: Record<string, number>;
  addCatRating: (
    token: string,
    id: string,
    rating: number,
    cat_name: string,
    image_url: string,
    breedId: number
  ) => Promise<void>;
  removeCatRating: (token: string, id: string) => Promise<void>;
  clearRatings: () => void;
}

export const useCatRatingsStore = create<CatRatingStore>()(
  persist(
    (set, get) => ({
      ratings: {},
      averageRatings: {},
      addCatRating: async (
        token: string,
        id: string,
        rating: number,
        cat_name: string,
        image_url: string,
        breedId: number
      ) => {
        const { ratings, averageRatings } = get();

        // updatea rating
        const newRatings = { ...ratings, [id]: rating };
        set({
          ratings: newRatings,
          averageRatings: {
            ...averageRatings,
            [id]: averageRatings[id] ?? rating,
          },
        });

        //updateaj i na backendu
        try {
          await catService.addCatRating(
            token,
            id,
            rating,
            cat_name,
            image_url,
            breedId
          );
        } catch (err) {
          set({ ratings });
          console.error("Error updating baceknd with cat rating", err);
        }
      },

      removeCatRating: async (token: string, id: string) => {
        const { ratings } = get();
        const { [id]: _, ...newRatings } = ratings;
        set({ ratings: newRatings });

        // updateaj i na backendu
        try {
          await catService.removeCatRating(token, id);
        } catch (err) {
          set({ ratings });
          console.error("Error updating backend with delted cat rating", err);
        }
      },

      clearRatings: () => set({ ratings: {} }),
    }),
    {
      name: "ratings-storage",
      partialize: (state) => ({
        ratings: state.ratings,
        averageRatings: state.averageRatings,
      }),
    }
  )
);
