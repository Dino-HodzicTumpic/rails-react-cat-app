import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {};

  const handleChange = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className=" text-left ">
            Email address
          </label>
          <input
            className="border-2 rounded-md border-gray-400 p-1"
            type="email"
            placeholder="name@domain.com"
            onChange={handleChange}
          />
          <button
            className="mt-1.5 bg-black text-white rounded-4xl p-1"
            type="submit"
          >
            Next
          </button>
        </div>
        <div className=" flex items-center my-4">
          <div className="border-gray-300 border-t flex-grow"></div>
          <span className="flex-shrink mx-2">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div>
          <button className="flex w-full bg-black text-white rounded-4xl p-1 items-center ">
            <FcGoogle className="text-xl ml-3"></FcGoogle>
            <span className="ml-12">Sign up with Google</span>
          </button>
        </div>
      </form>
      <hr className="mt-10 mb-5 border-gray-200" />
      <div>
        Already have an acount?
        <Link className="font-bold underline" to="/login">
          Login here
        </Link>
      </div>
    </div>
  );
}
