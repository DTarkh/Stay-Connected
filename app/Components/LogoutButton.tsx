'use client';
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
