import React, { useState, useEffect } from "react";
import type { BreedImages } from "./BreedGallery";
import { FaRegHeart, FaStar, FaHeart, FaRegStar } from "react-icons/fa";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import Modal from "./Modal";
import { useCatRatingsStore } from "../../../store/catRatingStore";

interface GalleryCardProps {
  image: BreedImages;
  catName: string;
  favoriteCats?: string[];
  toggleFavorite: (
    token: string,
    imageId: string,
    imageUrl: string,
    name: string
  ) => void;
}

export default function GalleryCard({
  image,
  catName,
  favoriteCats,
  toggleFavorite,
}: GalleryCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ratings = useCatRatingsStore((state) => state.ratings);
  const averageRatings = useCatRatingsStore((state) => state.averageRatings);
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const isFavorite = favoriteCats?.includes(image.id) ?? false;
  const userRating = ratings[image.id] ?? image.userRating;
  const isRated = userRating !== null;
  const averageRating =
    averageRatings[image.id] ?? image.averageRating ?? "N/A";

  const handleFavoriteClick = () => {
    //check if loged in if not redirect to loginpage/register else toogleFavorite
    if (isLoggedIn && token) {
      toggleFavorite(token, image.id, image.url, catName);
    } else {
      navigate("/signup");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
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
          <h2>CatSpace rating: {averageRating}</h2>
        </div>

        <div
          className="flex items-center justify-center gap-1 cursor-pointer hover:bg-blue-200 rounded-xl p-1 "
          onClick={openModal}
        >
          {isRated ? (
            <>
              <span className="">Your rating: {userRating}/10</span>{" "}
              <FaStar color="blue" />
            </>
          ) : (
            <>
              <span className="">Rate</span> <FaRegStar color="blue" />
            </>
          )}
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

      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          catName={catName}
          catPicUrl={image.url}
          catId={image.id}
        />
      )}
    </div>
  );
}
