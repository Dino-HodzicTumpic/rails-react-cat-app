import React, { useRef, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { authenticateWithGoogle } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { isValidEmail } from "../../../utils/validators";
import EmailError from "./EmailError";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
}

export type EmailErrorType = "none" | "alreadyTaken" | "invalidFormat";

export default function SignUpForm({ email, setEmail, onNext }: Props) {
  const setToken = useAuthStore((state) => state.setToken);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorType, setEmailErrorType] = useState<EmailErrorType>("none");
  const [takenEmails, setTakenEmails] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // osigurava promjenu error poruka i bordera ovisno o tome kako korisnik mjenja input
  useEffect(() => {
    if (!isSubmitted) return;
    if (isValidEmail(email)) {
      if (takenEmails.has(email)) {
        setEmailErrorType("alreadyTaken");
        setIsEmailError(true);
      } else {
        setIsEmailError(false);
        setEmailErrorType("none");
      }
    } else {
      setEmailErrorType("invalidFormat");
      setIsEmailError(true);
    }
  }, [email]);

  const checkEmail = async (email: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/registrations/check_email`,
        {
          email,
        }
      );

      if (response.status === 200) {
        onNext();
      }
    } catch (error) {
      setIsEmailError(true);
      setEmailErrorType("alreadyTaken");
      setTakenEmails((prev) => new Set(prev).add(email));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (isValidEmail(email)) {
      checkEmail(email);
    } else {
      setIsEmailError(true);
      setEmailErrorType("invalidFormat");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const userData = await authenticateWithGoogle(
        credentialResponse.credential
      );
      //console.log("User data:", userData);
      setToken(userData.token);
    } catch (err) {
      console.log("Auth failed", err);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl md:text-3xl ">CATSPACE</h1>
      <h1 className="font-bold text-2xl md:text-3xl mt-4 mb-14">
        SIGN UP TO UNLOCK ALL FEATURES
      </h1>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="email"
              className=" text-left md:text-xl lg:text-2xl"
            >
              Email address
            </label>
            <input
              id="email"
              value={email}
              className={`border-2 rounded-md  p-1 md:p-2 md:text-xl ${
                isEmailError
                  ? "border-red-500 focus:outline-0 "
                  : "border-gray-400 focus:outline-0 "
              }`}
              type="text"
              placeholder="name@domain.com"
              onChange={handleChange}
            />

            {isEmailError && <EmailError emailErrorType={emailErrorType} />}

            <button
              className="mt-1.5 bg-black text-white rounded-4xl p-1 md:p-2 md:text-xl lg:text-2xl cursor-pointer "
              type="submit"
            >
              Next
            </button>
          </div>
          <div className=" flex items-center my-4">
            <div className="border-gray-300 border-t flex-grow"></div>
            <span className="flex-shrink mx-2 md:text-xl">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Login failed")}
              theme="filled_black"
              size="large"
              text="signup_with"
              shape="pill"
            />
          </div>
        </form>
        <hr className="mt-10 mb-5 border-gray-200" />
        <div className="md:text-xl lg:text-2xl">
          Already have an acount?
          <Link className="font-bold underline" to="/login">
            Login here
          </Link>
        </div>
      </div>
    </>
  );
}
