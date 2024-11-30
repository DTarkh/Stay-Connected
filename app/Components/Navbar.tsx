import { PiPlugsConnected } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
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
          className="input input-bordered w-full h-10 pl-10 max-lg:hidden border-[#14213D] rounded-lg"
        />
        <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600">
          Search
        </button>
      </div>
      <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600">
        Choose Tag
      </button>
    </nav>
  );
};

export default Navbar;
