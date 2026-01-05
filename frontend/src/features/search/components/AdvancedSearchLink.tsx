import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function AdvancedSearchLink() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search-filters");
  };

  return (
    <div className="bg-gray-100 shadow-md rounded mt-4 mb-7 mx-auto md:w-1/2 p-4">
      <div
        className="flex justify-center gap-1 items-stretch mt-1 mb-4 cursor-pointer"
        onClick={handleClick}
      >
        {" "}
        <span className="bg-amber-300  w-1"></span>
        <span className="font-bold text-lg">Advanced search</span>
      </div>
      <p>
        Create a more specific search by selecting ranges for cat attributes
        such as Intelligence, Energy Level, Affection etc. Choose the scores
        that match your preferences to find the perfect breed
      </p>
    </div>
  );
}
