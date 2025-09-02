import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import PasswordForm from "../components/PasswordForm";
import NicknameForm from "../components/NicknameForm";
import logo from "../../../assets/images/CatSpaceLogo.jpg";
export default function SignUpPage() {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, swtNickname] = useState<string>("");

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

      {step === 2 && <NicknameForm />}
    </div>
  );
}
