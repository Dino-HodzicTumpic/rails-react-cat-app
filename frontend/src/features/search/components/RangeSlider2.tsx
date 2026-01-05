import React from "react";

interface RangeSliderProps {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  leftLabel?: string;
  rightLabel?: string;
}

const MIN = 1;
const MAX = 5;

export default function RangeSlider2({
  label,
  value,
  onChange,
  leftLabel = "1",
  rightLabel = "5",
}: RangeSliderProps) {
  const [minValue, maxValue] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val <= maxValue) onChange([val, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val >= minValue) onChange([minValue, val]);
  };

  const leftPercent = ((minValue - MIN) / (MAX - MIN)) * 100;
  const rightPercent = ((maxValue - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="mb-6">
      {/* Label i trenutno vrijednosti */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {minValue} - {maxValue}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-4">
        <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 -translate-y-1/2"></div>
        <div
          className="absolute h-1 bg-blue-500 rounded top-1/2 -translate-y-1/2"
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        ></div>

        {/* Slider inputs */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-4 bg-transparent appearance-none pointer-events-none top-0"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-4 bg-transparent appearance-none pointer-events-none top-0"
          style={{ zIndex: 3 }}
        />

        {/* Thumb styling */}
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            pointer-events: auto;
            appearance: none;
            width: 20px;
            height: 20px;
            background: white;
            border: 3px solid #3B82F6;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.1s;
          }
          input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.1); }
          input[type=range]::-webkit-slider-thumb:active { transform: scale(1.05); }
          
          input[type=range]::-moz-range-thumb {
            pointer-events: auto;
            width: 20px;
            height: 20px;
            background: white;
            border: 3px solid #3B82F6;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.1s;
          }
          input[type=range]::-moz-range-thumb:hover { transform: scale(1.1); }
          input[type=range]::-moz-range-thumb:active { transform: scale(1.05); }
        `}</style>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
