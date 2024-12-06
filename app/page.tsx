"use client";

import { FormEvent } from "react";

// import { FormEvent } from "react";

// import {getSession} from '@/lib'
const Page = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    console.log({ username, password });
  };

  // const session = await getSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-500 mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-500 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">New To StayConnected?</span>
            <span className="cursor-pointer text-gray-500 text-xl font-bold">
              Sign Up
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-00 hover:text-gray-100 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
