"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
    <main className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 mb-4 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-4 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white w-full py-3 rounded-lg"
      >
        Login
      </button>
    </main>
  );
}