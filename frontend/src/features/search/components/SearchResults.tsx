import React from "react";
import { useBreedSearchStore } from "../../../store/breedSearchStore";
import ResultCard from "./ResultCard";

export default function SearchResults() {
  const { results, totalCount, isLoading, query } = useBreedSearchStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full  h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col ">
      <div className="mt-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Search results for: {query}
        </h2>
        <h2 className="text-lg">Found {totalCount} results</h2>
      </div>

      {totalCount === 0 ? (
        <div>
          <p>No breeds found for your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:gap-y-6 gap-x-28 mb-4 ">
          {results.map((breed) => (
            <ResultCard
              key={breed.id}
              id={breed.id}
              breed_name={breed.breed_name}
              origin={breed.origin}
              sample_image_url={breed.sample_image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
