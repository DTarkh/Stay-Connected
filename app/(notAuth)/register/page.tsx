"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState<{ message: string; color: string }>({
    message: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage({
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiFetcher<{ username: string } | null>(
        API_ROUTES.register,
        undefined,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (data) {
        setMessage({
          message: `Registration successful! Welcome, ${data.username}!`,
          color: "green",
        });
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });

        setTimeout(() => {
          router.push("/login");
        }, 800);
      } else {
        setMessage({
          message: "Registration failed. Please try again.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        message: "An unexpected error occurred.",
        color: "red",
      });
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
        <h2 className="text-2xl font-bold text-black mb-6">Sign Up</h2>

        {message.message && (
          <p className={`mb-4 text-center text-${message.color}-500`}>
            {message.message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-500 mb-2">
            Username
          </label>
          <div className="relative flex items-center">
            <CgProfile
              size="25"
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-500 mb-2">
            Email
          </label>
          <div className="relative flex items-center">
            <CiMail
              size="25"
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-500 mb-2">
            Enter Password
          </label>
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

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-500 mb-2">
            Confirm Password
          </label>

          <div className="relative flex items-center">
            <CiLock
              size="25"
              color="gray"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm your password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
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

        <button
          type="submit"
          className={`w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-900 hover:text-gray-100 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/login">
            <button className="text-blue-500 hover:underline">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
