"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function IdeaDetailsPage() {

  const params = useParams();

  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isOwner, setIsOwner] = useState(false);

  const [hasPurchased, setHasPurchased] = useState(false);

  // FETCH SINGLE IDEA
  useEffect(() => {

    const fetchIdea = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/ideas/${params.id}`
        );

        const data = await response.json();

        setIdea(data);

        // GET CURRENT USER
        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        // CHECK OWNERSHIP
        if (user.username === data.creator) {
          setIsOwner(true);
        }

        // CHECK PURCHASE
        if (
          data.purchasedBy &&
          data.purchasedBy.includes(user.username)
        ) {
          setHasPurchased(true);
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    if (params.id) {
      fetchIdea();
    }

  }, [params.id]);

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          Loading idea...
        </p>
      </main>
    );
  }

  // IDEA NOT FOUND
  if (!idea) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          Idea not found.
        </p>
      </main>
    );
  }

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white">

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
                  Idea Details
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
        <section className="max-w-4xl mx-auto px-6 py-16">

          {/* TITLE */}
          <div className="mb-10">

            <h1 className="text-5xl font-black leading-tight">
              {idea.title}
            </h1>

            <div className="flex items-center gap-4 mt-5 text-gray-400">

              <p>
                by {idea.creator}
              </p>

              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />

              <p className="text-white font-semibold">
                ${idea.price}
              </p>

            </div>

          </div>

          {/* IDEA CONTENT CARD */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-6">
              Full Idea
            </h2>

            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {idea.content}
            </div>

            {/* BUY BUTTON */}
            {!isOwner && !hasPurchased && (

              <Link
                href={`/payment?id=${idea._id}&title=${encodeURIComponent(
                  idea.title
                )}&price=${idea.price}`}
                className="inline-block mt-10 bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
              >
                Buy This Idea
              </Link>

            )}

          </div>

        </section>

      </main>

    </ProtectedRoute>

  );
}