"use client";
import { CiMail } from "react-icons/ci";
import { FormEvent } from "react";

const Page = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    console.log({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
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
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-900 hover:text-gray-100 transition-colors"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
