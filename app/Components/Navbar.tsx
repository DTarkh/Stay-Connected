"use client";

import { useState } from "react";
import { PiPlugsConnected } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import AddQuestion from "./AddQuestion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddQuestionMenuOpen, setIsAddQuestionMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const tags = ["#React", "#Frontend", "#Fetching"];

  const handleTagClick = (tag) => {
    setSearchInput(tag); // Set the search input to the clicked tag
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <nav className="flex bg-cyan-500 px-10 py-3 items-center gap-5">
      <PiPlugsConnected className="text-4xl" />

      <div className="relative w-[40vw] ml-5 flex items-center gap-3">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <CiSearch size={20} className="max-lg:hidden" />
        </span>
        <input
          type="text"
          placeholder="Type here"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full h-10 pl-10 max-sm:w-[250px] border-[#14213D] rounded-lg"
        />
        <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Choose Tag
        </button>
        {isMenuOpen && (
          <ul className="absolute mt-2 bg-white shadow-lg rounded p-2 z-10">
            {tags.map((tag) => (
              <li
                key={tag}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="">
        <CiSquarePlus
          className="text-4xl"
          onClick={() => setIsAddQuestionMenuOpen((prev) => !prev)}
        />
        {isAddQuestionMenuOpen && (
          <div className="absolute bg-opacity-50 bg-slate-900 w-full h-[100vh] flex justify-center items-center left-0 top-0">
            <AddQuestion />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
