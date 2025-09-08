import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const [time, setTime] = useState<number>(5);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get("token");
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/confirmations`, {
          token,
        });
      } catch (err) {
        console.log(err);
      }
    };
    confirmEmail();
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <>
      <h1 className="font-bold text-2xl md:text-3xl ">CATSPACE</h1>
      <div className="flex flex-col items-center mt-8 text-2xl">
        <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1>Email confirmed!</h1>
        <p>Your account was succesfully created.</p>
        <p>Redirecting to home page in {time} seconds</p>
      </div>
    </>
  );
}
