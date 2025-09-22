import React from "react";
import { FaStar } from "react-icons/fa";

interface StarsProps {
  rating: number;
  max?: number;
}

export const Stars = ({ rating, max = 5 }: StarsProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, i) => (
        <FaStar key={i} color={i < rating ? "gold" : "lightgray"} />
      ))}
    </div>
  );
};
