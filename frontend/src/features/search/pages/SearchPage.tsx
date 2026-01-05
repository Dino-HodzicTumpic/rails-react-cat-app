import React, { useEffect } from "react";
import { useBreedSearchStore } from "../../../store/breedSearchStore";
import SearchResults from "../components/SearchResults";
import AdvancedSearchLink from "../components/AdvancedSearchLink";

export default function SearchPage() {
  const { search } = useBreedSearchStore();

  return (
    <div className="flex flex-col items-center">
      <SearchResults />
      <AdvancedSearchLink />
    </div>
  );
}
