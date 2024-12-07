'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true); 

    try {
      const data = await apiFetcher<{ username: string }>(
        'register',  
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      setMessage(`Registration successful! Welcome!`);
      setFormData({ username: "", email: "", password: "", confirm_password: "" }); 

      setTimeout(() => {
        router.push("/login"); 
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An unexpected error occurred.");
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="w-full p-2 border rounded"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/login">
            <button className="text-blue-500 underline">Login here</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
