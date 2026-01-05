import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  leftLabel?: string;
  rightLabel?: string;
}

const RangeSlider = ({
  label,
  onChange,
  value,
  leftLabel = "1",
  rightLabel = "5",
}: RangeSliderProps) => {
  const MIN = 1;
  const MAX = 5;

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

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {value[0]} - {value[1]}
        </span>
      </div>

      <div className="relative px-2.5">
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={value}
          onChange={(values) => onChange(values as [number, number])}
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
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-5 h-5 bg-white border-3 border-blue-500 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-105 focus:outline-none"
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>

      <div className="flex justify-between mt-3 px-2.5 text-xs text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};

export default function App() {
  const [intelligence, setIntelligence] = useState<[number, number]>([1, 5]);
  const [energyLevel, setEnergyLevel] = useState<[number, number]>([1, 5]);
  const [vocalisation, setVocalisation] = useState<[number, number]>([1, 5]);
  const [social, setSocial] = useState<[number, number]>([1, 5]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Filters
        </h2>
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Personality
        </h3>

        <RangeSlider
          label="Intelligence"
          value={intelligence}
          onChange={setIntelligence}
          leftLabel="1"
          rightLabel="5"
        />

        <RangeSlider
          label="Energy level"
          value={energyLevel}
          onChange={setEnergyLevel}
          leftLabel="1"
          rightLabel="5"
        />

        <RangeSlider
          label="Vocalisation"
          value={vocalisation}
          onChange={setVocalisation}
          leftLabel="1"
          rightLabel="5"
        />

        <RangeSlider
          label="Social"
          value={social}
          onChange={setSocial}
          leftLabel="1"
          rightLabel="5"
        />

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Current values:
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              Intelligence: {intelligence[0]} - {intelligence[1]}
            </div>
            <div>
              Energy level: {energyLevel[0]} - {energyLevel[1]}
            </div>
            <div>
              Vocalisation: {vocalisation[0]} - {vocalisation[1]}
            </div>
            <div>
              Social: {social[0]} - {social[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
