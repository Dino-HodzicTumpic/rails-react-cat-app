import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import CheckEmailPage from "./features/auth/pages/CheckEmailPage";
import HomePage from "./features/home/pages/HomePage";
import EmailConfirmed from "./features/auth/pages/EmailConfirmed";
import LoginPage from "./features/auth/pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/signup/confirmation-pending"
          element={<CheckEmailPage />}
        />
        <Route path="/signup/confirm" element={<EmailConfirmed />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
