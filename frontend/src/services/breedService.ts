import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const breedService = {
  getFavoriteBreeds: async (token: string, idsOnly: boolean = false) => {
    const response = await axios.get(`${API_URL}/favorites/breeds`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (idsOnly) {
      return response.data.map((breed: any) => breed.id);
    }

    return response.data;
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
