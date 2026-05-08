"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

    if (result?.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Login gagal");
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Login Test</h1>

      <form
        onSubmit={handleLogin}
        className="mt-5 flex flex-col gap-3 max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-black text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
