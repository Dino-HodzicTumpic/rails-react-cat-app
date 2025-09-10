import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/CatSpaceLogo.jpg";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import SearchBar from "./SearchBar";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const isLoggedIn = useIsLoggedIn();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="sticky top-0 left-0 right-0  z-50 w-full  ">
      <nav className="flex flex-col  shadow-md">
        <div className="flex items-center justify-around h-16">
          {" "}
          <div className=" flex items-center gap-2 ">
            <img
              src={logo}
              alt="app logo"
              className="w-8 h-8 md:w-10 md:h-10 rounded-4xl "
            />
            <h2 className="font-bold md:text-2xl">CATSPACE</h2>
          </div>
          {/* desktop meni */}
          <ul className="hidden md:flex gap-8">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/browse-breeds">Browse Breeds</NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink to="/favorites">Favorites</NavLink>
              ) : (
                <NavLink to="signup">Sign up</NavLink>
              )}
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink to="/profile">Profile</NavLink>
              ) : (
                <NavLink to="/login">Log in</NavLink>
              )}
            </li>
          </ul>
          <div className="hidden md:block">
            <SearchBar></SearchBar>
          </div>
          {/* hamburger ikona (vidljiva samo na malim ekranima) */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* mobilni meni (prikaže se samo kad je isOpen = true) */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col gap-4 p-4">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/browse-breeds">Browse Breeds</NavLink>
              </li>
              <li>
                {isLoggedIn ? (
                  <NavLink to="/favorites">Favorites</NavLink>
                ) : (
                  <NavLink to="signup">Sign up</NavLink>
                )}
              </li>
              <li>
                {isLoggedIn ? (
                  <NavLink to="/profile">Profile</NavLink>
                ) : (
                  <NavLink to="/login">Log in</NavLink>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
