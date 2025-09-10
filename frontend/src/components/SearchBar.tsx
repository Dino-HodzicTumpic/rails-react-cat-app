import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className=" relative flex items-center gap-2 mt-0.5 ">
      <FaSearch className=" absolute right-40 md:top-2 md:right-42 w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search breeds"
        className="outline-none  rounded  p-1 md:p-2 text-center bg-gray-200"
      />
    </div>
  );
}
