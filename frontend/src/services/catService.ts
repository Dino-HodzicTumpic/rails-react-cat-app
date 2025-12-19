import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const catService = {
  getFavoriteCats: async (token: string) => {
    const response = await axios.get(`${API_URL}/favorites/cats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map((cat: any) => cat.cat_api_id);
  },

  addFavoriteCat: async (
    token: string,
    id: string,
    imageUrl: string,
    name: string
  ) => {
    try {
      axios.post(
        `${API_URL}/favorites/cats/${id}`,
        { cat: { image_url: imageUrl, name: name } },
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
    cat_name: string
  ) => {
    try {
      const url = `${API_URL}/cats/${id}/ratings`;

      console.log("Trying to POST to URL:", url);
      axios.post(
        `${API_URL}/cats/${id}/ratings`,
        { rating: rating, cat_name: cat_name },
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
