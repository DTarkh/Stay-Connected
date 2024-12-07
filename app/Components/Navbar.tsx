"use client";
import { useState, useEffect } from "react";
import { PiPlugsConnected } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";  

interface Tag {
  name: string;
}

const Navbar = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data: Tag[] = await apiFetcher("tags", { method: "GET" });  
        setTags(data);
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
    <nav className="flex bg-cyan-500 px-10 py-3 items-center gap-5 max-sm:flex-col">
      {/* Home Button */}
      <button
        className="bg-transparent border-none cursor-pointer"
        onClick={() => router.push("/main")}
      >
        <PiPlugsConnected className="text-4xl" />
      </button>

      {/* Search Field */}
      <div className="relative w-full ml-5 flex items-center gap-3">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <CiSearch size={20} className="max-lg:hidden" />
        </span>
        <input
          type="text"
          placeholder="Type here"
          value={searchInput}
          onChange={handleChange}
          className="input input-bordered w-full h-10 pl-10 border-[#14213D] rounded-lg text-black"
        />
      </div>

      {/* Choose Tag Button */}
      <div className="relative flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600 whitespace-nowrap"
        >
          {selectedTag ? selectedTag : "Choose Tag"}
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
              tags.map((tag) => (
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

      {/* Search Button */}
      <div className="relative">
        <button
          type="submit"
          onClick={handleSearch}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <CiSearch size={20} />
        </button>
      </div>

      {/* Add Question Button */}
      <Link href="/add">
        <CiSquarePlus className="text-4xl cursor-pointer" />
      </Link>

      {/* Logout Button */}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
