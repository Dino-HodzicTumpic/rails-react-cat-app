import React, { useState } from "react";
import { DiVim } from "react-icons/di";
import { Link, useNavigate } from "react-router-dom";

interface FeaturedBreedCardProps {
  breedId: number;
  breed_name: string;
  description: string;
  sample_image_url: string;
}

export default function FeaturedBreedCard({
  breedId,
  breed_name,
  description,
  sample_image_url,
}: FeaturedBreedCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row  items-center md:items-start  rounded-2xl ">
      <img
        src={sample_image_url}
        alt="Breed picture"
        className="rounded-2xl w-1/2 md:w-1/3 md:h-full cursor-pointer"
        onClick={() => navigate(`/breeds/${breedId}`)}
      />
      <div className="md:w-[400px]">
        <h2 className="font-bold md:text-lg cursor-pointer">
          <Link to={`/breeds/${breedId}`}>{breed_name}</Link>
        </h2>
        <div
          className={`relative overflow-hidden mx-3 ${
            isExpanded ? "max-h-full" : "max-h-16 md:max-h-full"
          }`}
        >
          <p className="text-left">{description}</p>

          {!isExpanded && (
            <div className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent md:hidden"></div>
          )}
        </div>
        <span
          className="text-blue-500 cursor-pointer mt-1 inline-block md:hidden"
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? "See less" : "See more"}
        </span>
      </div>
    </div>
  );
}
