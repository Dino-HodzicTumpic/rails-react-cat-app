import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  hasLetter,
  hasMinLength,
  hasNumberOrSpecial,
  isValidPassword,
} from "../../../utils/validators";

interface PasswordFormProps {
  password: string;
  onNext: () => void;
  goBack: () => void;
  setPassword: (password: string) => void;
}

export default function PasswordForm({
  goBack,
  onNext,
  setPassword,
  password,
}: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="w-1/2 mt-8 mb-4 bg-gray-400">
        <div className="h-1 w-1/2 bg-green-400 transition-all duration-500  "></div>
      </div>
      <div className="flex">
        <div className="text-xl mr-4 cursor-pointer" onClick={goBack}>
          ←
        </div>
        <div className="flex flex-col items-start mb-4">
          <p className="">Step 1 of 2</p>
          <p className="font-bold">Create a password</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" relative flex flex-col max-w-md ">
          <label htmlFor="password" className="font-bold text-left md:text-lg ">
            Password
          </label>
          <input
            className="border-2 border-gray-400 rounded-md  p-1 md:p-2 md:text-xl "
            id="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute  right-3 top-8 md:top-10 lg:top-12 text-gray-500"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>

          <div className="max-w-60 md:max-w-80 mt-4">
            <p className="font-bold">Your password must contain at least</p>
            <ul className="font-bold">
              <li className="flex items-center">
                {hasLetter(password) ? (
                  <AiOutlineCheckCircle className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="text-red-500" />
                )}
                <span>1 letter</span>
              </li>
              <li className="flex items-center">
                {hasNumberOrSpecial(password) ? (
                  <AiOutlineCheckCircle className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="text-red-500" />
                )}
                <span>1 number or special character</span>
              </li>
              <li className="flex items-center">
                {hasMinLength(password) ? (
                  <AiOutlineCheckCircle className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="text-red-500" />
                )}
                <span>6 characters</span>
              </li>
            </ul>
          </div>
          <button
            disabled={!isValidPassword(password)}
            className="mt-8 bg-black text-white rounded-4xl p-1 md:p-2 md:text-xl lg:text-2xl cursor-pointer "
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}
