import React, { useState, useEffect } from "react";
import { FaRegHeart, FaStar, FaHeart, FaRegStar } from "react-icons/fa";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useCatRatingsStore } from "../../../store/catRatingStore";
import Modal from "../../browse-breeds/components/Modal";
import { useCatFavoriteStore } from "../../../store/catFavoriteStore";
import { useBreedFavoritesStore } from "../../../store/breedFavoritesStore";

type CardType = "cat" | "breed";

interface FavoriteCardProps {
  image_url: string;
  breedName: string;
  catName?: string;
  breedId?: number;
  catId?: string;
  rating?: number;
  averageRating?: number;
  cardType: CardType;
}

export default function FavoriteCard({
  image_url,
  breedName,
  catName,
  breedId,
  catId,
  rating,
  averageRating,
  cardType,
}: FavoriteCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const removeFavoriteCat = useCatFavoriteStore(
    (state) => state.removeFavoriteCat
  );
  const removeFavoriteBreed = useBreedFavoritesStore(
    (state) => state.removeFavoriteBreed
  );
  const storeRating = useCatRatingsStore((state) => state.ratings[catId!]);
  const displayRating = storeRating ?? rating;

  const handleFavoriteClick = () => {
    //check if loged in if not redirect to loginpage/register else remove from favorites
    if (isLoggedIn && token) {
      if (cardType === "cat") {
        removeFavoriteCat(token, catId!);
      } else if (cardType === "breed") {
        removeFavoriteBreed(token, breedId!);
      }
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

  const navigateToBreedPage = () => {
    if (breedId) {
      navigate(`/breeds/${breedId}`);
    }
  };

  return (
    <div className="flex flex-col  items-center  w-40 md:w-56 xl:w-80  mb-3 mt-3 rounded-xl bg-white shadow-xl">
      <img
        src={image_url}
        alt="cat picture"
        className=" w-full h-40 md:h-56 xl:h-80   rounded-md cursor-pointer "
        onClick={navigateToBreedPage}
      />
      <div className=" w-40 md:w-56 xl:w-80">
        <h2
          className="font-bold text-lg cursor-pointer"
          onClick={navigateToBreedPage}
        >
          {cardType === "cat" ? catName : breedName}
        </h2>
        {cardType === "cat" && (
          <div>
            <h2>
              CatSpace rating: {averageRating === 0 ? "N/A" : averageRating}
            </h2>
          </div>
        )}

        {cardType === "cat" && (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer hover:bg-blue-200 rounded-xl p-1 "
            onClick={openModal}
          >
            {displayRating ? (
              <>
                <span className="">Your rating: {displayRating}/10</span>{" "}
                <FaStar color="blue" />
              </>
            ) : (
              <>
                <span className="">Rate</span> <FaRegStar color="blue" />
              </>
            )}
          </div>
        )}

        <button className=" mt-1" onClick={handleFavoriteClick}>
          <FaHeart className="cursor-pointer text-2xl text-red-500 transition-all duration-200 " />
        </button>
      </div>

      {isOpen && cardType === "cat" && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          catName={catName!}
          catPicUrl={image_url}
          catId={catId!}
          breedId={breedId!}
        />
      )}
    </div>
  );
}
