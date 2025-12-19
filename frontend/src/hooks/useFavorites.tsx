import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../features/auth/store/authStore";
//not used it was replaced by catFavoritesStore and breedFavoriteStore
export const useFavorites = (initialFavorites: string[] = []) => {
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(initialFavorites)
  );
  const token = useAuthStore((state) => state.token);

  const toggleFavorite = async (id: string, imageUrl: string) => {
    const isCurrentlyFavorite = favorites.has(id);

    try {
      if (isCurrentlyFavorite) {
        //APi poziv removeCat from user favorites
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorites/cats/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setFavorites((prevFavs) => {
          const newFavorites = new Set(prevFavs);
          newFavorites.delete(id);
          return newFavorites;
        });
      } else {
        // APi poziv addeCat to user favorites
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/cats/${id}`,
          { cat: { image_url: imageUrl } },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        setFavorites((prevFavs) => new Set(prevFavs).add(id));
      }
    } catch (err: any) {
      console.error("backend returned this error:", err.response.data);
    }
  };

  const isFavorite = (id: string) => favorites.has(id);

  return { favorites, toggleFavorite, isFavorite };
};
