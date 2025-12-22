import axios from "axios";
import { create } from "zustand";

interface Breed {
  id: number;
  breed_name: string;
  origin: string;
  description: string;
  sample_image_url: string;
}

interface Suggestion {
  id: number;
  breed_name: string;
  origin: string;
  sample_image_url: string;
}

interface BreedSearchState {
  // Search query
  query: string;

  // Autocomplete
  suggestions: Suggestion[];
  isAutocompleteOpen: boolean;

  // Results
  results: Breed[];
  totalCount: number;
  isLoading: boolean;

  // Actions
  setQuery: (query: string) => void;
  closeAutocomplete: () => void;
  search: () => Promise<void>;
}

const debounce = (fn: (query: string) => void, delay = 300) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (query: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(query);
    }, delay);
  };
};

const API_URL = import.meta.env.VITE_API_URL;
const createFetchAutoComplete = (set: any) =>
  debounce(async (query: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/search/breeds_autocomplete`,
        {
          params: { query },
        }
      );

      set({
        suggestions: response.data.suggestions,
        isAutocompleteOpen: response.data.suggestions.length > 0,
      });
    } catch (err) {
      console.log("Autocomplete error", err);
    }
  }, 300);

export const useBreedSearchStore = create<BreedSearchState>((set, get) => {
  const fetchAutocompleteDebounced = createFetchAutoComplete(set);

  return {
    query: "",
    suggestions: [],
    isAutocompleteOpen: false,
    results: [],
    isLoading: false,
    totalCount: 0,

    setQuery: (query: string) => {
      set({ query });
      if (query.length > 0) {
        fetchAutocompleteDebounced(query);
      } else {
        set({ suggestions: [], isAutocompleteOpen: false });
      }
    },

    closeAutocomplete: () => set({ isAutocompleteOpen: false }),

    search: async () => {
      const { query } = get();

      if (!query) {
        set({ results: [], totalCount: 0 });
        return;
      }

      set({ isLoading: true });
      try {
        const response = await axios.get(`${API_URL}/search/breeds`, {
          params: { query },
        });

        set({
          results: response.data.search_results,
          totalCount: response.data.search_results.length,
          isLoading: false,
        });
      } catch (err) {
        console.error("Search error:", err);
        set({ isLoading: false });
      }
    },
  };
});
