import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const breedService = {
  getFavoriteBreeds: async (token: string) => {
    const response = await axios.get(`${API_URL}/favorites/breeds`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.map((breed: any) => breed.id);
  },

  addFavoriteBreed: async (breedId: number, token: string) => {
    return axios.post(
      `${API_URL}/favorites/breeds/${breedId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  removeFavoriteBreed: async (breedId: number, token: string) => {
    return axios.delete(`${API_URL}/favorites/breeds/${breedId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
