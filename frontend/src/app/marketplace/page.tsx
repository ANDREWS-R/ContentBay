"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketplacePage() {

  const router = useRouter();

  const [ideas, setIdeas] = useState([]);

  // LOGOUT FUNCTION
  const handleLogout = () => {

    localStorage.clear();

    router.push("/");

  };

  // FETCH IDEAS
  useEffect(() => {

    const fetchIdeas = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/ideas"
        );

        const data = await response.json();

        setIdeas(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchIdeas();

  }, []);

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
                  Marketplace
                </p>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4">

              <Link
                href="/create"
                className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Post an Idea
              </Link>

              {/* PROFILE DROPDOWN */}
              <div className="relative group">

                <button
                  className="border border-white/10 px-5 py-2.5 rounded-full text-sm hover:bg-white/10 transition"
                >
                  Profile
                </button>

                {/* DROPDOWN */}
                <div className="absolute right-0 mt-3 w-52 bg-[#111] border border-white/10 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                  <Link
                    href="/purchases"
                    className="block px-5 py-4 text-sm hover:bg-white/5 transition"
                  >
                    My Purchases
                  </Link>

                  <Link
                    href="/my-ideas"
                    className="block px-5 py-4 text-sm hover:bg-white/5 transition"
                  >
                    My Ideas
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-4 text-sm hover:bg-white/5 transition border-t border-white/10"
                  >
                    Logout
                  </button>

                </div>

              </div>

            </div>

          </div>

        </nav>

        {/* HEADER */}
        <section className="max-w-7xl mx-auto px-6 pt-14">

          <h1 className="text-5xl font-black leading-tight">
            Explore Creative Ideas
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Discover stories, scripts, concepts, and creative work shared by creators.
          </p>

        </section>

        {/* IDEAS GRID */}
        <section className="max-w-7xl mx-auto px-6 py-14">

          {ideas.length === 0 ? (

            <div className="text-center py-20 text-gray-500">
              No ideas posted yet.
            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

              {ideas.map((idea: any) => (

                <div
                  key={idea.id}
                  className="bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/[0.05] transition"
                >

                  {/* IMAGE */}
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                    alt={idea.title}
                    className="w-full h-56 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">

                    <h2 className="text-xl font-bold leading-snug">
                      {idea.title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      by {idea.creator}
                    </p>

                    <div className="flex items-center justify-between mt-6">

                      <p className="text-2xl font-black">
                        ${idea.price}
                      </p>

                      <Link
                        href={`/marketplace/${idea.id}`}
                        className="bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
                      >
                        View
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </ProtectedRoute>

  );
}