import React from "react";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-center w-40 md:w-56 xl:w-80 mb-3 rounded-xl bg-gray-200 animate-pulse">
      <div className="w-full h-40 md:h-56 xl:h-80 bg-gray-300 rounded-md " />
      <div className="w-40 md:w-56 xl:w-80 mt-2 space-y-2 px-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-6 bg-gray-300 rounded w-full mb-1" />
      </div>
    </div>
  );
}
