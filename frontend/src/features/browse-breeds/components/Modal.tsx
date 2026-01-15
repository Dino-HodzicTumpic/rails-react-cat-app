import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XSquare } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useBaseStarSize } from "../hooks/useBaseStarSize";
import axios from "axios";
import { useCatRatingsStore } from "../../../store/catRatingStore";
import { useAuthStore } from "../../auth/store/authStore";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  closeModal: () => void;
  isOpen: boolean;
  catName: string;
  catPicUrl: string;
  catId: string;
  breedId: number;
}

export default function Modal({
  closeModal,
  isOpen,
  catName,
  catPicUrl,
  catId,
  breedId,
}: ModalProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const baseSize = useBaseStarSize();
  const { addCatRating, removeCatRating, ratings } = useCatRatingsStore();
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const existingRating = ratings[catId] ?? null;
  // disabled je rate button ako nije odabrana ocjena ili ocjena postoji i odabrana je ista ta ocjena
  const isDisabled =
    selectedRating === 0 ||
    (existingRating !== null && existingRating === selectedRating);

  useEffect(() => {
    if (ratings[catId]) {
      setSelectedRating(ratings[catId]);
    }
  }, [catId, ratings]);

  const handleRate = async () => {
    if (selectedRating <= 0) return;
    if (token) {
      closeModal();
      try {
        addCatRating(token, catId, selectedRating, catName, catPicUrl, breedId);
      } catch (err) {
        console.error("Error while trying to send rating to backend", err);
      }
    } else {
      navigate("login");
    }
  };

  const handleRemoveRating = async () => {
    closeModal();
    try {
      if (token) removeCatRating(token, catId);
    } catch (err) {
      console.error("Error while trying to delete rating on backend", err);
    }
  };

  return createPortal(
    <div className="fixed inset-0  z-50 bg-black/50 flex justify-center items-center">
      <div className=" relative bg-white p-4  rounded shadow-lg flex flex-col gap-4 min-w-2/3 min-h-1/2">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative inline-block">
            {" "}
            <FaStar
              className="text-blue-500"
              style={{
                fontSize: `${baseSize + selectedRating * 0.4}rem`,
                transition: "font-size 0.2s ease-in-out",
              }}
            />
            <span className="absolute inset-0 flex justify-center items-center text-white ">
              {selectedRating === 0 ? "?" : selectedRating}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <XSquare
            className="text-red-500 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col items-center md:mt-2">
          <h2 className="">Rate this cat</h2>
          <img
            src={catPicUrl}
            alt="cat picture"
            className=" w-1/3 h-20 md:h-28 xl:h-64   rounded-md mt-3"
          />
          <span className="font-bold mt-1 text-sm">{catName}</span>

          <div className="flex flex-col">
            <div className="flex mt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setSelectedRating(rating)}
                >
                  <FaStar
                    className={
                      rating <= (hoveredRating || selectedRating)
                        ? "text-yellow-400 mx-0.5 md:mx-1"
                        : "text-gray-300 mx-0.5 md:mx-1"
                    }
                  />
                </button>
              ))}
            </div>

            <button
              className={`rounded-2xl w-full mt-4 p-1
                ${
                  isDisabled
                    ? "bg-gray-300"
                    : "bg-yellow-300 font-bold  hover:bg-yellow-400 transition-colors cursor-pointer"
                }
             `}
              onClick={handleRate}
              disabled={isDisabled}
            >
              Rate
            </button>

            {existingRating && (
              <button
                className="rounded-2xl w-full mt-4 p-1 bg-white hover:bg-yellow-50 text-amber-300 cursor-pointer"
                onClick={handleRemoveRating}
              >
                Remove rating
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
