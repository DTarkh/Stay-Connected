"use client";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "./LogoutButton";

interface Tag {
  name: string;
}

const Navbar = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await apiFetcher<Tag[]>(API_ROUTES.tags, undefined, {
          method: "GET",
        });
        setTags(data || []);
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
    const tagQuery = selectedTag
      ? `tag=${encodeURIComponent(selectedTag)}`
      : "";
    const searchQuery = searchTerm
      ? `search=${encodeURIComponent(searchTerm)}`
      : "";

    let finalUrl = "/home";
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
    <nav className="flex justify-between items-center bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-500 px-8 py-4 shadow-md max-sm:flex-col gap-5">
      {/* Home Button */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
        onClick={() => router.push("/home")}
      >
        <Image src="/../icon.svg" alt="Home Icon" width={30} height={30} />
        <span className="text-xl font-bold text-white tracking-wide">
          StayConnected
        </span>
      </div>

      {/* Search Field */}
      {pathname === "/home" && (
        <>
          <div className="relative w-full max-w-md ml-10 flex items-center">
            <span className="absolute left-3 text-gray-400">
              <CiSearch size={22} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            />
          </div>

          {/* Choose Tag Button */}

          <div
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">
              {selectedTag || "Choose Tag"}
            </button>
            {isMenuOpen && (
              <ul className="absolute pt-2 bg-white shadow-lg rounded-lg py-2 z-10 text-gray-800 max-h-60 overflow-auto w-48">
                <li
                  key="no-tags"
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300"
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
                      className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300"
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
          <button
            type="submit"
            onClick={handleSearch}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            <CiSearch size={22} />
            <span className="ml-2">Search</span>
          </button>

          {/* Add Question Button */}
          <Link href="/add">
            <CiSquarePlus
              size={30}
              className="text-white cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </>
      )}

      {/* Logout Button */}
      <LogoutButton />
      <Link href="/profile">
        <CgProfile
          size={30}
          className="text-white cursor-pointer hover:scale-110 transition-transform duration-300"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
