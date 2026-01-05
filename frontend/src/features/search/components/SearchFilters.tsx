import React, { use, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useBreedSearchStore } from "../../../store/breedSearchStore";
import { useNavigate } from "react-router-dom";
import FilterCard from "./FilterCard";

const MIN = 1;
const MAX = 5;

const filterConfig = {
  personality: [
    { key: "intelligence", label: "Intelligence" },
    { key: "energy", label: "Energy level" },
    { key: "vocalisation", label: "Vocalisation" },
  ],
  social: [
    { key: "affection", label: "Affection level" },
    { key: "child_friendly", label: "Child friendly" },
    { key: "dog_friendly", label: "Dog friendly" },
    { key: "stranger_friendly", label: "Stranger friendly" },
    { key: "social_needs", label: "Social needs" },
  ],
  care: [
    { key: "health_issues", label: "Health issues" },
    { key: "grooming", label: "Grooming" },
  ],
};

const renderTicks = () => {
  const ticks = [];
  for (let i = MIN + 1; i < MAX; i++) {
    const position = ((i - MIN) / (MAX - MIN)) * 100;
    ticks.push(
      <div
        key={i}
        className="absolute w-0.5 h-2 bg-gray-300"
        style={{ left: `${position}%`, top: "100%", marginTop: "2px" }}
      />
    );
  }
  return ticks;
};

export default function SearchFilters() {
  const filters = useBreedSearchStore((state) => state.filters);
  const setFilters = useBreedSearchStore((state) => state.setFilters);
  const advancedSearch = useBreedSearchStore((state) => state.advancedSearch);
  const resetAllFilters = useBreedSearchStore((state) => state.resetAllFilters);
  const removeFilter = useBreedSearchStore((state) => state.removeFilter);
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    advancedSearch(filters);
    navigate("/advanced-search");
  };

  const updateFilter = (key: string, value: [number, number]) => {
    setFilters({
      ...filters,
      [key]: {
        min: value[0],
        max: value[1],
      },
    });
  };

  const getFilterValue = (key: string): [number, number] => {
    const filter = (filters as any)[key];
    return [filter?.min ?? MIN, filter?.max ?? MAX];
  };

  const isDefaultRange = (range?: { min: number; max: number }) =>
    !range || (range.min === 1 && range.max === 5);

  const activeFilters = Object.entries(filters).filter(
    ([_, range]) => !isDefaultRange(range)
  );

  return (
    <div className=" bg-gray-50 py-10 px-4">
      <div className="md:max-w-3/4 mx-auto bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Filters</h2>

        {Object.entries(filterConfig).map(([section, items]) => (
          <div key={section} className="mb-8">
            <h3 className="text-base font-medium text-gray-700 mb-4 capitalize">
              {section === "care" ? "Care & health" : section}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map(({ key, label }) => {
                const value = getFilterValue(key);

                return (
                  <div key={key} className=" mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        {label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {value[0]} - {value[1]}
                      </span>
                    </div>

                    <div className=" relative px-2.5">
                      <Range
                        step={1}
                        min={MIN}
                        max={MAX}
                        values={value}
                        onChange={(values) =>
                          updateFilter(key, values as [number, number])
                        }
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="relative h-1 rounded"
                            style={{
                              ...props.style,
                              background: getTrackBackground({
                                values: value,
                                colors: ["#E5E7EB", "#3B82F6", "#E5E7EB"],
                                min: MIN,
                                max: MAX,
                              }),
                            }}
                          >
                            {renderTicks()}
                            {children}
                          </div>
                        )}
                        renderThumb={({ props, index }) => {
                          const { key, ...rest } = props;
                          return (
                            <div
                              key={index}
                              {...rest}
                              className="w-5 h-5 bg-white border-3 border-blue-500 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-105 focus:outline-none"
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="flex justify-between mt-2 px-2.5 text-xs text-gray-400">
                      <span>1</span>
                      <span>5</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Current filters:
          </h4>
          <div className="grid grid-cols-1 md:flex md:flex-wrap  p-4 mb-2">
            {activeFilters.length === 0 ? (
              <span className=" text-gray-500">No active filters</span>
            ) : (
              activeFilters.map(([key, range]) => (
                <FilterCard
                  key={key}
                  label={key}
                  value={range}
                  onRemove={() => removeFilter(key)}
                />
              ))
            )}
          </div>
          <div className="flex space-x-3 ">
            <button
              className="w-full rounded bg-red-500 text-white font-medium p-2  hover:bg-red-600 transition-all duration-150 cursor-pointer"
              onClick={resetAllFilters}
            >
              Reset all filters
            </button>
            <button
              className="w-full rounded bg-blue-500 text-white font-medium p-2  hover:bg-blue-600 transition-all duration-150 cursor-pointer"
              onClick={handleApplyFilters}
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
