import React, { useEffect } from "react";
import { useBreedSearchStore } from "../../../store/breedSearchStore";
import SearchResults from "../components/SearchResults";

export default function SearchPage() {
  const { search } = useBreedSearchStore();

  return (
    <div>
      <SearchResults />
    </div>
  );
}
