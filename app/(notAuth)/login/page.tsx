"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";
import { CiLock } from "react-icons/ci";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null);

    try {
      const data = await apiFetcher<{
        tokens: { access: string; refresh: string };
      } | null>(API_ROUTES.login, undefined, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (data) {
        const { access, refresh } = data.tokens;

        Cookies.set("accessToken", access, { expires: 7, sameSite: "Strict" });
        Cookies.set("refreshToken", refresh, {
          expires: 7,
          sameSite: "Strict",
        });

        setMessage("Login successful!");
        router.push("/main");
      } else {
        setMessage(
          "Invalid credentials. Please check your username and password."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 rounded shadow text-black"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-black mb-6">Login</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-500 mb-2">
            Username or Email
          </label>
          <div className="relative flex items-center">
            <CgProfile
              size="25"
              color="gray"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username or email"
              value={formData.username}
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-gray-500 mb-2">
              Password
            </label>
            <Link
              href="/forgotpass"
              className="text-gray-500 text-sm cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <CiLock
              size="25"
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
            {passwordVisible ? (
              <GoEye
                onClick={() => setPasswordVisible(false)}
                size="20"
                color="grey"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <GoEyeClosed
                onClick={() => setPasswordVisible(true)}
                size="20"
                color="grey"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 text-sm">New To StayConnected?</span>
          <Link href={"/register"}>
            <span className="cursor-pointer text-gray-500 text-base font-bold">
              Sign Up
            </span>
          </Link>
        </div>
        <button
          type="submit"
          className={`w-full bg-purple-600 text-white font-bold py-2 px-4 rounded  hover:text-gray-100 transition-colors  hover:bg-purple-900  ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
