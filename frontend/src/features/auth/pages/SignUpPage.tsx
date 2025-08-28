import React from "react";
import SignUpForm from "../components/SignUpForm";
import logo from "../../../assets/images/CatSpaceLogo.jpg";
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-32 h-32 rounded-4xl" />
      <h1 className="font-bold text-2xl md:text-3xl ">CATSPACE</h1>
      <h1 className="font-bold text-2xl md:text-3xl mt-4 mb-14">
        SIGN UP TO UNLOCK ALL FEATURES
      </h1>
      <SignUpForm></SignUpForm>
    </div>
  );
}
