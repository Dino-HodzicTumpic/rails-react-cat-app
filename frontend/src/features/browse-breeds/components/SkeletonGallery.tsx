import React from "react";
import SkeletonCard from "./SkeletonCard";

interface SkeletonGalleryProps {
  count?: number;
}

export default function SkeletonGallery({ count = 4 }: SkeletonGalleryProps) {
  return (
    <div className="mt-8 flex flex-col items-center md:grid md:grid-cols-2 md:justify-items-center md:gap-5 md:w-3/4 mx-auto">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}
