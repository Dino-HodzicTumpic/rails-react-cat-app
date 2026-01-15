import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useBreedFavoritesStore } from "../../../store/breedFavoritesStore";
import { breedService } from "../../../services/breedService";
import FavoriteCard from "./FavoriteCard";

interface BreedData {
  id: number;
  name: string;
  image_url: string;
}

interface BreedsData {
  breeds: BreedData[];
}

export default function BreedsGrid() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [breedsData, setBreedsData] = useState<BreedData[]>([]);
  const favoriteBreeds = useBreedFavoritesStore(
    (state) => state.favoriteBreeds
  );
  const setFavoriteBreeds = useBreedFavoritesStore(
    (state) => state.setFavoriteBreeds
  );

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        const responseData = await breedService.getFavoriteBreeds(token);
        setBreedsData(responseData.favorite_breeds);

        const ids = responseData.favorite_breeds.map(
          (breed: BreedData) => breed.id
        );
        setFavoriteBreeds(ids);
      } catch (err) {
        console.error("Error while fetching favorite breeds", err);
      }
    };
    if (token) {
      fetchData(token);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex flex-col gap-5  items-center md:grid md:grid-cols-3 ">
      {breedsData
        .filter((breed) => favoriteBreeds.includes(breed.id))
        .map((breed) => (
          <FavoriteCard
            key={breed.id}
            image_url={breed.image_url}
            breedName={breed.name}
            cardType={"breed"}
            breedId={breed.id}
          />
        ))}
    </div>
  );
}
