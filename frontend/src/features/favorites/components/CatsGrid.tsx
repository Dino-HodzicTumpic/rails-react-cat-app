import axios from "axios";
import React, { useEffect, useState } from "react";
import { useBreedFavoritesStore } from "../../../store/breedFavoritesStore";
import { useAuthStore } from "../../auth/store/authStore";
import { Navigate, useNavigate } from "react-router-dom";
import { catService } from "../../../services/catService";
import FavoriteCard from "./FavoriteCard";
import { useCatFavoriteStore } from "../../../store/catFavoriteStore";

interface CatData {
  cat_api_id: string;
  name: string;
  image_url: string;
  breed_id: number;
  breed_name: string;
  average_rating: number;
  rating: number;
}

interface CatsData {
  cats: CatData[];
}

export default function CatsGrid() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [catsData, setCatsData] = useState<CatData[]>([]);
  const favoriteCats = useCatFavoriteStore((state) => state.favoriteCats);
  const setFavoriteCats = useCatFavoriteStore((state) => state.setFavoriteCats);

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        const responseData = await catService.getFavoriteCatsWithRatings(token);
        setCatsData(responseData.favorite_cats);

        const ids = responseData.favorite_cats.map(
          (cat: CatData) => cat.cat_api_id
        );
        setFavoriteCats(ids);
      } catch (err) {
        console.error("Error while fetching favorite cats with ratings", err);
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
      {catsData
        .filter((cat) => favoriteCats.includes(cat.cat_api_id))
        .map((cat) => (
          <FavoriteCard
            key={cat.cat_api_id}
            image_url={cat.image_url}
            catName={cat.name}
            breedName={cat.breed_name}
            breedId={cat.breed_id}
            cardType={"cat"}
            catId={cat.cat_api_id}
            rating={cat.rating}
            averageRating={cat.average_rating}
          />
        ))}
    </div>
  );
}
