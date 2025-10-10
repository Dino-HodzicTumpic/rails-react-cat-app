import axios from "axios";
import { GiToken } from "react-icons/gi";

const API_URL = import.meta.env.VITE_API_URL;

export const catService = {
  getFavoriteCats: async (token: string) => {
    const response = await axios.get(`${API_URL}/favorites/cats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map((cat: any) => cat.cat_api_id);
  },

  addFavoriteCat: async (token: string, id: string, imageUrl: string) => {
    try {
      axios.post(
        `${API_URL}/favorites/cats/${id}`,
        { cat: { image_url: imageUrl } },
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
};
