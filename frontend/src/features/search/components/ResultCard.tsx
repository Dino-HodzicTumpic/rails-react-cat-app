import React from "react";
import { useBreedFavoritesStore } from "../../../store/breedFavoritesStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";

interface ResultCardProps {
  id: number;
  breed_name: string;
  origin: string;
  sample_image_url: string;
}

export default function ResultCard({
  id,
  breed_name,
  origin,
  sample_image_url,
}: ResultCardProps) {
  const { favoriteBreeds, toggleFavoriteBreed } = useBreedFavoritesStore();
  const isBreedFavorite = favoriteBreeds.includes(0); // Replace 0 with actual breed id
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleToggleFavoriteBreed = () => {
    //if logedIn
    if (token) {
      toggleFavoriteBreed(id, token);
    } else {
      navigate("/signup");
    }
  };
  return (
    <div
      className="border rounded flex-col mt-6 "
      onClick={() => navigate(`/breeds/${id}`)}
    >
      <img
        src={sample_image_url}
        alt={`${breed_name} picture`}
        className="cursor-pointer w-full h-40 
        md:h-96  object-cover "
      />

      <div className="flex flex-col items-center gap-1 p-2">
        <h2 className="cursor-pointer text-lg font-bold">{breed_name}</h2>
        <span className="cursor-pointer">{origin}</span>
        <button
          className=""
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavoriteBreed();
          }}
        >
          {isBreedFavorite ? (
            <FaHeart className=" cursor-pointer text-2xl text-blue-500 transition-all duration-200" />
          ) : (
            <FaRegHeart
              className=" cursor-pointer text-2xl text-gray-400 transition-all duration-200  
        
                        hover:text-blue-400 hover:scale-110"
            />
          )}
        </button>
      </div>
    </div>
  );
}
