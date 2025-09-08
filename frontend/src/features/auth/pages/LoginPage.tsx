import React, { useState } from "react";
import logo from "../../../assets/images/CatSpaceLogo.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import { authenticateWithGoogle } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { getDeviceInfo } from "../../../utils/device";
import { useNavigate } from "react-router-dom";
import LoginErrorMessage from "../components/LoginErrorMessage";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const setToken = useAuthStore((state) => state.setToken);
  const navigator = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const userData = await authenticateWithGoogle(
        credentialResponse.credential
      );

      setToken(userData.token);
    } catch (err) {
      console.log("Auth failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // poziv na backend
    // posalji device_info
    const device_info = getDeviceInfo();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/logins`,
        {
          email,
          password,
          device_info,
        }
      );
      setToken(response.data.token);
      //redirect na homePage
      navigator("/");
    } catch (err) {
      setInvalidCredentials(true);
    }
  };

  return (
    <div className="bg-gray-200 flex flex-col  items-center mx-auto rounded-2xl">
      <img src={logo} alt="Logo" className="w-24 h-24 rounded-4xl mt-4" />
      <h2 className="font-bold my-5">Log in to CATSPACE</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col">
          <label htmlFor="email" className="font-bold text-left md:text-lg">
            Email
          </label>
          <input
            className="border-2 rounded-md  p-1 md:p-2 md:text-xl border-gray-400 focus:outline-0"
            type="text"
            id="email"
            placeholder="name@domain.com"
            value={email}
            onChange={handleChangeEmail}
          />

          <label
            htmlFor="password"
            className="font-bold text-left mt-3 md:text-lg"
          >
            Password
          </label>
          <input
            className="border-2 border-gray-400 rounded-md  p-1 md:p-2 md:text-xl "
            id="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleChangePassword}
          />

          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute  right-3 top-26 md:top-33 text-gray-500"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>

          {invalidCredentials && <LoginErrorMessage />}
          <button
            type="submit"
            className="mt-3  bg-black text-white rounded-4xl p-1 md:p-2 md:text-xl lg:text-2xl cursor-pointer"
          >
            Continue
          </button>

          <hr className="my-6" />

          <div className="flex justify-center mb-5">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Login failed")}
              theme="filled_black"
              size="large"
              text="signup_with"
              shape="pill"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
