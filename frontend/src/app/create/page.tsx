"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateIdeaPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [price, setPrice] = useState("");

  const handlePost = async () => {

    // FRONTEND VALIDATION
    if (!title || !idea || !price) {
      alert("Please fill all fields.");
      return;
    }

    // TITLE LENGTH
    if (title.trim().length < 5) {
      alert("Title must be at least 5 characters.");
      return;
    }

    // IDEA LENGTH
    if (idea.trim().length < 20) {
      alert("Idea content must be at least 20 characters.");
      return;
    }

    // NEGATIVE PRICE CHECK
    if (Number(price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    try {

      // GET LOGGED IN USER
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.username) {
        alert("Please login first.");
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/ideas",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: title.trim(),
            content: idea.trim(),
            price,
            creator: user.username,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Idea posted successfully!");

      router.push("/marketplace");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white overflow-hidden">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-lg font-black">
                C
              </div>

              <div>
                <h1 className="text-2xl font-black">
                  ContentBay
                </h1>

                <p className="text-xs text-gray-500 -mt-1">
                  Post an Idea
                </p>
              </div>

            </div>

            {/* BACK BUTTON */}
            <Link
              href="/marketplace"
              className="border border-white/10 px-5 py-2.5 rounded-full text-sm hover:bg-white/10 transition"
            >
              Back to Marketplace
            </Link>

          </div>

        </nav>

        {/* PAGE CONTENT */}
        <section className="max-w-3xl mx-auto px-6 py-16">

          {/* HEADER */}
          <div className="mb-12">

            <h1 className="text-5xl font-black leading-tight">
              Share Your Creative Idea
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Publish your story threads, scripts, concepts,
              or creative ideas for others to discover.
            </p>

          </div>

          {/* FORM CARD */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">

            {/* TITLE */}
            <div className="mb-6">

              <label className="block text-sm text-gray-300 mb-3">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter a title for your idea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
              />

            </div>

            {/* IDEA CONTENT */}
            <div className="mb-6">

              <label className="block text-sm text-gray-300 mb-3">
                Story Thread / Idea
              </label>

              <textarea
                placeholder="Write your story thread, script idea, or creative concept here..."
                rows={10}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none focus:border-pink-400 transition"
              />

            </div>

            {/* PRICE */}
            <div>

              <label className="block text-sm text-gray-300 mb-3">
                Price (USD)
              </label>

              <input
                type="number"
                placeholder="Enter price in dollars"
                value={price}
                onChange={(e) => {

                  const value = e.target.value;

                  if (Number(value) >= 0 || value === "") {
                    setPrice(value);
                  }

                }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
              />

            </div>

            {/* BUTTON */}
            <button
              onClick={handlePost}
              className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Post Idea
            </button>

          </div>

        </section>

      </main>

    </ProtectedRoute>

  );
}