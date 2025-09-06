import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import CheckEmailPage from "./features/auth/pages/CheckEmailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/signup/confirmation-pending"
          element={<CheckEmailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
