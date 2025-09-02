import React from "react";
import type { EmailErrorType } from "./SignUpForm";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface EmailErrorProps {
  emailErrorType: EmailErrorType;
}

export default function EmailError({ emailErrorType }: EmailErrorProps) {
  let message = "";
  let containerClasses =
    "flex  my-1 md:mt-2 lg:my-3 rounded max-w-60 md:max-w-80  ";
  if (emailErrorType === "alreadyTaken") {
    message =
      "This address is already linked to an existing account. To continue, log in.";

    containerClasses += "bg-yellow-300 text-black lg:ml-7";
  } else if (emailErrorType === "invalidFormat") {
    message =
      "This email is invalid. Make sure it's written like example@email.com";

    containerClasses += "bg-transparent text-red-400 lg:ml-4";
  }

  return (
    <div className={containerClasses}>
      <AiOutlineExclamationCircle className="text-2xl " />
      <span className="">{message}</span>
    </div>
  );
}
