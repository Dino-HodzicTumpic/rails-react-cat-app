import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useAuthStore } from "../store/authStore";

export default function CheckEmailPage() {
  const userEmail = useAuthStore((state) => state.email);
  return (
    <>
      <h1 className="font-bold text-2xl md:text-3xl ">CATSPACE</h1>
      <div className="flex flex-col  items-center mt-12">
        <h1 className="font-bold text-2xl md:text-3xl ">Check your email</h1>
        <AiOutlineMail className="w-8 h-8 my-3" />
        <p>We sent a confirmation email to:</p>
        <p className="font-bold">{userEmail}</p>
        <p className="mt-3">
          If you don't receive this email please check your spam folder.
        </p>
      </div>
    </>
  );
}
