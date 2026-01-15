import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const catService = {
  getFavoriteCats: async (token: string, idsOnly: boolean = false) => {
    const response = await axios.get(`${API_URL}/favorites/cats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (idsOnly) {
      return response.data.map((cat: any) => cat.cat_api_id);
    }
    return response.data;
  },

  getFavoriteCatsWithRatings: async (token: string) => {
    const response = await axios.get(`${API_URL}/favorites/cats_with_ratings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  addFavoriteCat: async (
    token: string,
    id: string,
    imageUrl: string,
    name: string,
    breedId: number
  ) => {
    try {
      axios.post(
        `${API_URL}/favorites/cats/${id}`,
        { cat: { image_url: imageUrl, name: name, breed_id: breedId } },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log("Error adding favorite cat:", err);
    }
  },

  removeFavoriteCat: async (token: string, id: string) => {
    try {
      axios.delete(`${API_URL}/favorites/cats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Error removing favorite cat:", err);
    }
  },

  addCatRating: async (
    token: string,
    id: string,
    rating: number,
    cat_name: string,
    image_url: string,
    breedId: number
  ) => {
    try {
      const url = `${API_URL}/cats/${id}/ratings`;

      console.log("Trying to POST to URL:", url);
      axios.post(
        `${API_URL}/cats/${id}/ratings`,
        {
          rating: rating,
          cat_name: cat_name,
          image_url: image_url,
          breed_id: breedId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Error while sending cat rating to backend", err);
    }
  },

  removeCatRating: async (token: string, id: string) => {
    try {
      axios.delete(`${API_URL}/cats/${id}/ratings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Error removing cat rating:", err);
    }
  },
};
