import React from "react";
import type { BreedImages } from "./BreedGallery";
import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";

interface GalleryCardProps {
  image: BreedImages;
  catName: string;
  isFavorite?: boolean;
  toggleFavorite: (imageId: string, imageUrl: string) => void;
}

export default function GalleryCard({
  image,
  catName,
  isFavorite,
  toggleFavorite,
}: GalleryCardProps) {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    //check if loged in if not redirect to loginpage/register else toogleFavorite
    if (isLoggedIn) {
      toggleFavorite(image.id, image.url);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col items-center  w-40 md:w-56 xl:w-80  mb-3 rounded-xl bg-transparent shadow-xl">
      <img
        src={image.url}
        alt="cat picture"
        className=" w-full h-40 md:h-56 xl:h-80   rounded-md mt-3"
      />
      <div className=" w-40 md:w-56 xl:w-80">
        <h2 className="font-bold text-lg">{catName}</h2>
        <div>
          <h2>CatSpace rating: NR</h2>
        </div>
        <div className="flex flex-col hover:bg-blue-200 cursor-pointer rounded-xl p-1">
          <h2>Your rating</h2>
        </div>
        <div className="flex items-center justify-center gap-1 cursor-pointer hover:bg-blue-200 rounded-xl p-1 ">
          <FaStar color="blue" />
          <span className="">Rate</span>
        </div>

        <button className=" mt-1" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <FaHeart className="cursor-pointer text-2xl text-red-500 transition-all duration-200 " />
          ) : (
            <FaRegHeart
              className="cursor-pointer text-2xl text-gray-400 transition-all duration-200 
                hover:text-red-400 hover:scale-110"
            />
          )}
        </button>
      </div>
    </div>
  );
}
