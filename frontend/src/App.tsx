import { useState } from "react";
import "./axiosSetup.ts";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import CheckEmailPage from "./features/auth/pages/CheckEmailPage";
import HomePage from "./features/home/pages/HomePage";
import EmailConfirmed from "./features/auth/pages/EmailConfirmed";
import LoginPage from "./features/auth/pages/LoginPage";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BreedPage from "./features/browse-breeds/pages/BreedPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>

        <main className="flex flex-col items-center flex-1 pt-16  ">
          {/* search bar mobile */}
          <div className="md:hidden px-4 py-2  ">
            <SearchBar />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/signup/confirmation-pending"
              element={<CheckEmailPage />}
            />
            <Route path="/signup/confirm" element={<EmailConfirmed />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/breeds/:id" element={<BreedPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
