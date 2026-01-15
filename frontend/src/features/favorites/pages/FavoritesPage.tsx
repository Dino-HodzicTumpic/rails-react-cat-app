import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CatsGrid from "../components/CatsGrid";
import BreedsGrid from "../components/BreedsGrid";
import FavoriteCard from "../components/FavoriteCard";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "cats";

  return (
    <div className="w-2/3 mt-4 ">
      <h1 className="font-bold text-xl text-left md:text-2xl">Favorites</h1>
      <div className="border-t-2"></div>
      <div className="flex  mt-4 mb-4">
        <button
          className={`p-2  md:py-2 md:px-4 rounded font-bold cursor-pointer ${
            type === "cats"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSearchParams({ type: "cats" })}
        >
          Cats
        </button>
        <button
          className={`p-2  md:py-2 md:px-4 rounded font-bold cursor-pointer ${
            type === "breeds"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSearchParams({ type: "breeds" })}
        >
          Breeds
        </button>
      </div>
      <div
        key={type}
        className="opacity-0 animate-[fadeIn_0.25s_ease-in-out_forwards]"
      >
        {type === "cats" ? <CatsGrid /> : <BreedsGrid />}
      </div>
    </div>
  );
}
