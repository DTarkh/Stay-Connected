'use client';
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 
import { apiFetcher,  API_ROUTES } from "@/app/utils/apiClient";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null); 

    try {
      const data = await apiFetcher<{ tokens: { access: string; refresh: string } }>(
        'login',  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const { access, refresh } = data.tokens;

      Cookies.set('accessToken', access, { expires: 7, secure: true, SameSite: 'Strict' });
      Cookies.set('refreshToken', refresh, { expires: 7, secure: true, SameSite: 'Strict' });

      setMessage("Login successful!");

      router.push('/main');
    } catch (error) {
      setMessage("Failed to connect to the server.");
      console.error("Error:", error);
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username or Email
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

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <p>Don&apos;t have an account?</p> 
          <Link href="/register">
            <button className="text-blue-500 underline">Register here</button>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;