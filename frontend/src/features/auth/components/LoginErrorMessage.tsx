import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function LoginErrorMessage() {
  return (
    <div className="flex  my-1 md:mt-2 lg:my-3 rounded max-w-60 md:max-w-80 bg-transparent text-red-400 lg:ml-4">
      <AiOutlineExclamationCircle className="text-2xl " />
      <span className="">Invalid email or password</span>
    </div>
  );
}
