import React from "react";
import { useBreedSearchStore } from "../../../store/breedSearchStore";
import ResultCard from "../components/ResultCard";

export default function AdvancedSearchResultsPage() {
  const isLoading = useBreedSearchStore((state) => state.isLoading);
  const results = useBreedSearchStore((state) => state.results);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full  h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div>
      {results.length === 0 ? (
        <div>
          <p>No breeds found for your search</p>
        </div>
      ) : (
        results.map((result) => (
          <ResultCard
            key={result.id}
            id={result.id}
            breed_name={result.breed_name}
            origin={result.origin}
            sample_image_url={result.sample_image_url}
          />
        ))
      )}
    </div>
  );
}
