import axios from "axios";
import { FcRating } from "react-icons/fc";
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

export type Rating = 1 | 2 | 3 | 4 | 5;

export type RatingRange = {
  min: Rating;
  max: Rating;
};

const DEFAULT_RANGE: RatingRange = { min: 1, max: 5 };

interface SearchFilters {
  intelligence?: RatingRange;
  affection?: RatingRange;
  energy?: RatingRange;
  social_needs?: RatingRange;
  health_issues?: RatingRange;
  stranger_friendly?: RatingRange;
  child_friendly?: RatingRange;
  dog_friendly?: RatingRange;
  vocalisation?: RatingRange;
  grooming?: RatingRange;
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

  //filters
  filters: SearchFilters;

  // Actions
  setQuery: (query: string) => void;
  closeAutocomplete: () => void;
  search: () => Promise<void>;
  advancedSearch: (filters: SearchFilters) => Promise<void>;
  setFilters: (filters: SearchFilters) => void;
  removeFilter: (key: string) => void;
  resetAllFilters: () => void;
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
    filters: {
      intelligence: { ...DEFAULT_RANGE },
      affection: { ...DEFAULT_RANGE },
      energy: { ...DEFAULT_RANGE },
      social_needs: { ...DEFAULT_RANGE },
      health_issues: { ...DEFAULT_RANGE },
      stranger_friendly: { ...DEFAULT_RANGE },
      child_friendly: { ...DEFAULT_RANGE },
      dog_friendly: { ...DEFAULT_RANGE },
      vocalisation: { ...DEFAULT_RANGE },
      grooming: { ...DEFAULT_RANGE },
    },

    setFilters: (filters: SearchFilters) => {
      set({ filters });
    },

    removeFilter: (key: string) => {
      const filters = get().filters;
      set({ filters: { ...filters, [key]: { ...DEFAULT_RANGE } } });
    },

    resetAllFilters: () => {
      const filters = get().filters;
      const newFilters = Object.fromEntries(
        Object.keys(filters).map((key) => [key, { ...DEFAULT_RANGE }])
      );
      set({ filters: newFilters });
    },

    advancedSearch: async (filters: SearchFilters) => {
      set({ isLoading: true });
      try {
        const response = await axios.post(`${API_URL}/search/breeds/advanced`, {
          filters,
        });

        set({
          results: response.data.search_results,
          totalCount: response.data.search_results.length,
          isLoading: false,
        });
      } catch (err) {
        console.error("Advanced search error:", err);
        set({ isLoading: false });
      }
    },

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
