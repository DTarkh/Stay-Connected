'use client'
import { useState, useEffect } from "react";
import { PiPlugsConnected } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import AddQuestion from "./AddQuestion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddQuestionMenuOpen, setIsAddQuestionMenuOpen] = useState(false);
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://nunu29.pythonanywhere.com/tags/");
        if (response.ok) {
          const data = await response.json();
          setTags(data);
        } else {
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = searchInput.trim();
    const tagQuery = selectedTag ? `tag=${encodeURIComponent(selectedTag)}` : "";
    const searchQuery = searchTerm ? `search=${encodeURIComponent(searchTerm)}` : "";
  
    let finalUrl = "/main"; 
    if (searchQuery || tagQuery) {
      finalUrl += "?"; 
      const queries = [];
      if (searchQuery) queries.push(searchQuery);
      if (tagQuery) queries.push(tagQuery);
      finalUrl += queries.join("&");
    }
  
    console.log("Navigating to:", finalUrl);
  
    router.push(finalUrl);
  };
  

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === "No tag" ? null : tag);
    setIsMenuOpen(false);
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
          onChange={handleChange}
          className="input input-bordered w-full h-10 pl-10 max-sm:w-[250px] border-[#14213D] rounded-lg text-black"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600"
        >
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
          <ul className="absolute mt-2 bg-white shadow-lg rounded p-2 z-10 text-black max-h-60 overflow-auto">
            <li
              key="no-tags"
              className="px-4 py-2 cursor-pointer hover:bg-cyan-400 hover:text-white transition-colors duration-200 rounded-lg mb-2 border-b border-gray-300 last:border-none"
              onClick={() => handleTagClick("No tag")}
            >
              No tag
            </li>
            {tags.length === 0 ? (
              <li className="px-4 py-2 text-center">Loading tags...</li>
            ) : (
              tags.map((tag: any) => (
                <li
                  key={tag.name}
                  className="px-4 py-2 cursor-pointer hover:bg-cyan-400 hover:text-white transition-colors duration-200 rounded-lg mb-2 border-b border-gray-300 last:border-none"
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="relative">
        <CiSquarePlus
          className="text-4xl cursor-pointer"
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
