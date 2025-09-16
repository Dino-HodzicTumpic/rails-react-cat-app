import axios from "axios";
import React, { useEffect, useState } from "react";
import BreedCard from "./BreedCard";
interface Breed {
  id: number;
  breed_name: string;
  description: string;
  sample_image_url: string;
}

export default function BrowseByBreed() {
  const [ftBreeds, setFtBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchFtBreeds = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/breeds/featured`
        );
        setFtBreeds(response.data.ft_breeds);
      } catch (err) {
        console.log("Failed to fetch featured breeds:", err);
      }
    };

    fetchFtBreeds();
  }, []);

  return (
    <div className="mt-2">
      <h2 className="font-bold mb-4 md:mb-6 md:text-2xl">Featured Breeds</h2>
      <div className="flex flex-col gap-4 md:ml-6  md:grid grid-rows-2 grid-cols-2">
        {ftBreeds.map((ftBreed, index) => (
          <React.Fragment key={ftBreed.id}>
            <BreedCard
              breedId={ftBreed.id}
              breed_name={ftBreed.breed_name}
              description={ftBreed.description}
              sample_image_url={ftBreed.sample_image_url}
            />
            {index < ftBreeds.length - 1 && (
              <hr className="mx-5 text-blue-400 md:hidden" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
