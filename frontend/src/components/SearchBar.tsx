import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useBreedSearchStore } from "../store/breedSearchStore";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const {
    query,
    setQuery,
    suggestions,
    isAutocompleteOpen,
    closeAutocomplete,
    search,
  } = useBreedSearchStore();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close autocomplete when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        closeAutocomplete();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAutocomplete]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    closeAutocomplete();
    await search();
    navigate(`/search?q=${query}`);
  };

  const handleSuggestionClick = (suggestion: any) => {
    closeAutocomplete();
    navigate(`/breeds/${suggestion.id}`);
  };

  return (
    <div className=" relative flex items-center gap-2 mt-0.5 md:w-full ">
      <form className="w-full" onSubmit={handleSearch}>
        <FaSearch
          className=" absolute right-40 top-1.5 md:top-2 md:right-6 w-5 h-5 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search breeds by name"
          className="outline-none w-full  rounded  p-1 md:p-2 text-center bg-gray-200"
        />
      </form>

      {/* Autocomplete Dropdown */}
      {isAutocompleteOpen && suggestions.length > 0 && (
        <div
          className="absolute top-10 z-50 flex flex-col bg-blue-400 border border-gray-300 rounded shadow-lg w-full"
          ref={dropdownRef}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex  gap-5  cursor-pointer p-2 hover:bg-gray-100 border-b border-gray-300 w-full pb-2"
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <img
                src={suggestion.sample_image_url}
                alt="breed_picture"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start text-left ">
                <span>{suggestion.breed_name}</span>
                <span className="text-gray-600">{suggestion.origin}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
