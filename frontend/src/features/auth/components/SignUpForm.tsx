import React, { useRef, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { authenticateWithGoogle } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = () => {};

  const handleChange = () => {};

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
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className=" text-left md:text-xl lg:text-2xl">
            Email address
          </label>
          <input
            className="border-2 rounded-md border-gray-400 p-1 md:p-4 md:text-xl lg:text-2xl"
            type="email"
            placeholder="name@domain.com"
            onChange={handleChange}
          />
          <button
            className="mt-1.5 bg-black text-white rounded-4xl p-1 md:p-4 md:text-xl lg:text-2xl cursor-pointer"
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
  );
}
