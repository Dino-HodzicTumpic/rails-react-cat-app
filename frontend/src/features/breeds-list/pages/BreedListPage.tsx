import axios from "axios";
import React, { useEffect, useState } from "react";
import BreedCard from "../../../components/BreedCard";

interface BreedData {
  breed_id: number;
  breed_name: string;
  origin: string;
  sample_image_url: string;
}

interface Breeds {
  breedsData: BreedData[];
}

export default function BreedListPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [breeds, setBreeds] = useState<Breeds>({ breedsData: [] });
  const breedsPerPage = 6;
  const totalBreeds = 67;
  const totalPages = Math.ceil(totalBreeds / breedsPerPage);
  const startIndex = (currentPage - 1) * breedsPerPage;
  const endIndex = startIndex + breedsPerPage;
  const currentBreeds = breeds.breedsData?.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/breeds`
        );
        setBreeds({ breedsData: response.data.breeds });
      } catch (err) {
        console.error("Error while fetching breeds in browse-breeds", err);
      }
    };

    fetchBreeds();
  }, []);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-3/4  ">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {currentBreeds?.map((breed) => (
          <div
            key={breed.breed_id}
            className="opacity-0 animate-[fadeIn_0.25s_ease-in-out_forwards]"
          >
            {" "}
            <BreedCard
              key={breed.breed_id}
              id={breed.breed_id}
              breed_name={breed.breed_name}
              origin={breed.origin}
              sample_image_url={breed.sample_image_url}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2  my-8  ">
        <button
          className="border rounded w-20  h-8 bg-gray-300 p-1 cursor-pointer"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/*Mobilni prikaz*/}
        <div className="flex  md:hidden items-center space-x-2">
          <span className="px-4  py-2 border rounded bg-white">
            {currentPage} / {totalPages}
          </span>
        </div>

        {/*Desktop prikaz*/}
        <div className="hidden md:flex space-x-2">
          {" "}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`border w-8 h-8 rounded  p-1 cursor-pointer ${i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="border rounded h-8 w-20 bg-gray-300 p-1 cursor-pointer"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
