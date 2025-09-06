import axios from "axios";
import React from "react";

interface NicknameFormProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  goBack: () => void;
  handleSignUp: () => void;
}

export default function NicknameForm({
  nickname,
  setNickname,
  goBack,
  handleSignUp,
}: NicknameFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <>
      <div className="w-1/2 mt-8 mb-4 bg-gray-400">
        <div className="h-1 w-full bg-green-400 transition-all duration-500  "></div>
      </div>
      <div className="flex">
        <div className="text-xl mr-4 cursor-pointer" onClick={goBack}>
          ←
        </div>
        <div className="flex flex-col items-start mb-4">
          <p className="">Step 2 of 2</p>
          <p className="font-bold">What should we call you?</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="flex flex-col max-w-60">
          <label htmlFor="nickname" className="font-bold text-left md:text-lg ">
            Nickname <br />
            <span className="font-normal">
              This nickname will appear on your profile
            </span>
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md  p-1 md:p-2 md:text-xl"
          />

          <button
            className="mt-1.5 bg-black text-white rounded-4xl p-1 md:p-2 md:text-xl lg:text-2xl cursor-pointer"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
