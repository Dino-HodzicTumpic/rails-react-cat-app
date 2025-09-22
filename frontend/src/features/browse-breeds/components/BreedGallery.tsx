import React from "react";
import { randomCatName } from "../../../utils/randomCatName";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCatNamesStore } from "../../../store/catNamesStore";

interface BreedImages {
  id: string;
  url: string;
}

interface BreedGalleryProps {
  images: BreedImages[];
}

export default function BreedGallery({ images }: BreedGalleryProps) {
  const { catNames } = useCatNamesStore();
  return (
    <>
      <h2 className="font-bold mt-10 md:text-2xl">Breed Gallery</h2>
      <div className="mt-8 flex flex-col items-center md:grid md:grid-cols-2 md:justify-items-center md:gap-5 md:w-3/4 mx-auto">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="flex flex-col items-center  w-40 md:w-56 xl:w-80  mb-3 rounded-xl bg-transparent shadow-xl"
          >
            <img
              src={image.url}
              alt="cat picture"
              className=" w-full h-40 md:h-56 xl:h-80   rounded-md mt-3"
            />
            <div className=" w-40 md:w-56 xl:w-80">
              <h2 className="font-bold text-lg">{catNames[image.id]}</h2>
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

              <button className=" mt-1">
                <FaRegHeart className="cursor-pointer text-2xl  text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// dodaj gumb za dodat u favorite i dodat za ratinge your rating i catSpace rating
