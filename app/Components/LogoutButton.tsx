'use client';
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-600 whitespace-nowrap"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
