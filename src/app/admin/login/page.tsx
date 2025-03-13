"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin page if already logged in
    const isLoggedIn = getCookie("isLoggedIn");
    if (isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const staticUsername = "admin";
    const staticPassword = "password";

    if (username === staticUsername && password === staticPassword) {
      setCookie("isLoggedIn", "true", { maxAge: 60 * 60 * 24 }); // 1 day
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Created by{" "}
            <a href="https://www.nextcraftsolution.site/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Next Craft Solutions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 