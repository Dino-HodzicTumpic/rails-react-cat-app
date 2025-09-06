import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import PasswordForm from "../components/PasswordForm";
import NicknameForm from "../components/NicknameForm";
import logo from "../../../assets/images/CatSpaceLogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUpPage() {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/registrations`,
        {
          email,
          password,
          nickname,
        }
      );

      navigate("/signup/confirmation-pending");
    } catch (err: any) {
      window.alert(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-32 h-32 rounded-4xl" />

      {step === 0 && (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <PasswordForm
          onNext={() => {
            setStep(2);
          }}
          goBack={() => {
            setStep(0);
          }}
          setPassword={setPassword}
          password={password}
        />
      )}

      {step === 2 && (
        <NicknameForm
          goBack={() => {
            setStep(1);
          }}
          nickname={nickname}
          setNickname={setNickname}
          handleSignUp={handleSignUp}
        />
      )}
    </div>
  );
}
