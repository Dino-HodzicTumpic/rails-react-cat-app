import React, { useEffect } from "react";

interface filterRange {
  min: number;
  max: number;
}

interface FilterChipProps {
  label: string;
  value: filterRange;
  onRemove?: () => void;
}

export default function FilterChip({
  label,
  value,
  onRemove,
}: FilterChipProps) {
  const formatLabel = (label: string): string => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatedLabel = formatLabel(label);

  return (
    <div className="flex flex-col w-full md:w-1/5  px-3 py-1 border border-black   text-sm  mr-2 mb-2">
      <div className="flex  justify-end">
        <button className="text-black mr-2 cursor-pointer" onClick={onRemove}>
          X
        </button>
      </div>

      <span className="flex mb-2">
        <span className="w-32 ">{formatedLabel}:</span>
        <span className="">
          {value["min"]} - {value["max"]}
        </span>
      </span>
    </div>
  );
}
