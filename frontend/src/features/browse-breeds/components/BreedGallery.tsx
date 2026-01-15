import React from "react";
import { randomCatName } from "../../../utils/randomCatName";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCatNamesStore } from "../../../store/catNamesStore";
import GalleryCard from "./GalleryCard";
import { useFavorites } from "../../../hooks/useFavorites";
import { useCatFavoriteStore } from "../../../store/catFavoriteStore";

export interface BreedImages {
  id: string;
  url: string;
  isLiked: boolean;
  userRating: number | null;
  averageRating: number | null;
}

interface BreedGalleryProps {
  images: BreedImages[];
  breedId?: number;
}

export default function BreedGallery({ images, breedId }: BreedGalleryProps) {
  const { catNames } = useCatNamesStore();

  const initialFavorites = images
    .filter((img) => img.isLiked)
    .map((img) => img.id);

  //const { isFavorite, toggleFavorite } = useFavorites(initialFavorites);
  const { favoriteCats, toggleFavoriteCat } = useCatFavoriteStore();
  return (
    <>
      <h2 className="font-bold mt-10 md:text-2xl">Breed Gallery</h2>
      <div className="mt-8 flex flex-col items-center md:grid md:grid-cols-2 md:justify-items-center md:gap-5 md:w-3/4 mx-auto">
        {images.map((image) => (
          <GalleryCard
            key={image.id}
            image={image}
            catName={catNames[image.id]}
            breedId={breedId}
            favoriteCats={favoriteCats}
            toggleFavorite={toggleFavoriteCat}
          />
        ))}
      </div>
    </>
  );
}
// dodaj gumb za dodat u favorite i dodat za ratinge your rating i catSpace rating
