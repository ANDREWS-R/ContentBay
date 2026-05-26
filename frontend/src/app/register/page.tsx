"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert("Account created successfully!");

    router.push("/marketplace");

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

};

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl" />

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-10">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl font-black shadow-lg">
            C
          </div>

          <h1 className="text-4xl font-black mt-5">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2 text-center">
            Join ContentBay and start sharing creative work.
          </p>

        </div>

        {/* FORM CARD */}
        <div className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 shadow-2xl">

          {/* USERNAME */}
          <div className="mb-5">

            <label className="block text-sm text-gray-300 mb-3">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm text-gray-300 mb-3">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-400 transition"
            />

          </div>

          {/* SIGN UP BUTTON */}
          <button
            onClick={handleSignup}
            className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>

          {/* LOGIN LINK */}
          <Link
            href="/login"
            className="w-full mt-4 border border-white/10 bg-white/[0.03] py-4 rounded-2xl font-semibold flex items-center justify-center hover:bg-white/[0.05] transition"
          >
            Already have an account? Login
          </Link>

        </div>

      </div>

    </main>
  );
}