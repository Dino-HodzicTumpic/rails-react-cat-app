import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { randomCatName } from "../../../utils/randomCatName";
import { Stars } from "../../../components/Stars";
import BreedGallery from "../components/BreedGallery";
import SkeletonGallery from "../components/SkeletonGallery";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { useCatNamesStore } from "../../../store/catNamesStore";
import { ImGift } from "react-icons/im";

interface BreedInfo {
  id: number;
  breed_name: string;
  description: string;
  sample_image_url: string;
  temperament?: string;
  affection_level?: number;
  grooming?: number;
  life_span?: string;
  intelligence?: number;
  child_friendly?: number;
  dog_friendly?: number;
  social_needs?: number;
  vocalisation?: number;
  health_issues?: number;
  energy_level?: number;
  stranger_friendly?: number;
  alt_names?: string;
  origin?: string;
}

interface BreedImage {
  url: string;
  id: string;
  isLiked: boolean;
}

export default function BreedPage({}) {
  const { id } = useParams<{ id: string }>();
  const [breedInfo, setBreedInfo] = useState<BreedInfo | null>(null);
  const [breedImages, setBreedImages] = useState<BreedImage[] | null>(null);
  const { catNames, setCatName } = useCatNamesStore();

  useEffect(() => {
    const getBreedInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/breeds/${id}/details`
        );

        setBreedInfo(response.data.breed_info);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    getBreedInfo();
  }, [id]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/breeds/${id}/images`
        );

        response.data.breed_images.forEach((img: BreedImage) => {
          catNames[img.id] ??
            (() => {
              const newName = randomCatName();
              setCatName(img.id, newName);
              return newName;
            })();
        });
        setBreedImages(response.data.breed_images);

        console.log(response);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    getImages();
  }, [id]);

  return (
    <div className="flex flex-col mx-4">
      <div className="flex flex-col items-center ">
        <img
          src={breedInfo?.sample_image_url}
          alt="Breed cover picture"
          className="rounded-2xl w-2/3 md:w-1/2"
        />
        <h2 className="font-bold text-xl">{breedInfo?.breed_name}</h2>
        <div className="flex justify-start  gap-12 my-2">
          <span className="">Origin {breedInfo?.origin}</span>
          <span>Lifespan {breedInfo?.life_span} years</span>
        </div>
        <div className=" w-full flex justify-start md:justify-center">
          <h4 className="font-bold ">About</h4>
        </div>

        <p className="text-left  md:mx-40 xl:mx-80 ">
          {breedInfo?.description}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-6">
        <div className="flex flex-col">
          <span className="font-bold">
            Temperament{" "}
            <span className="font-normal">{breedInfo?.temperament}</span>
          </span>
          <span className="font-bold md:mt-2 md:mb-1">
            Alt names{" "}
            <span className="font-normal">{breedInfo?.alt_names}</span>
          </span>
        </div>
        <div className="flex">
          <span className="w-36 font-bold">Intelligence:</span>
          <Stars rating={breedInfo?.intelligence || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Affection level:</span>
          <Stars rating={breedInfo?.affection_level || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Child friendly:</span>
          <Stars rating={breedInfo?.child_friendly || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Dog friendly:</span>
          <Stars rating={breedInfo?.dog_friendly || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Social needs:</span>
          <Stars rating={breedInfo?.social_needs || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Vocalisation:</span>
          <Stars rating={breedInfo?.vocalisation || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Health issues:</span>
          <Stars rating={breedInfo?.health_issues || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Energy level:</span>
          <Stars rating={breedInfo?.energy_level || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Stranger friendly:</span>
          <Stars rating={breedInfo?.stranger_friendly || 0} />
        </div>
        <div className="flex">
          <span className="w-36  font-bold">Grooming:</span>
          <Stars rating={breedInfo?.grooming || 0} />
        </div>
      </div>

      {breedImages ? (
        <BreedGallery images={breedImages} />
      ) : (
        <SkeletonGallery />
      )}
    </div>
  );
}

// TODOOOOOOOOOOOOOOOO request jos jedan za onih 10 slika da dobijemo i onda  css
