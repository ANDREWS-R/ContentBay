"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PurchasesPage() {

  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {

    const fetchPurchases = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        const response = await fetch(
          `http://localhost:5000/api/ideas/purchases/${user.username}`
        );

        const data = await response.json();

        setIdeas(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchPurchases();

  }, []);

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-black">
                My Purchases
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Ideas you purchased
              </p>
            </div>

            <Link
              href="/marketplace"
              className="border border-white/10 px-5 py-2.5 rounded-full text-sm hover:bg-white/10 transition"
            >
              Back
            </Link>

          </div>

        </nav>

        {/* CONTENT */}
        <section className="max-w-7xl mx-auto px-6 py-14">

          {ideas.length === 0 ? (

            <div className="text-center text-gray-500 py-20">
              No purchases yet.
            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

              {ideas.map((idea) => (

                <div
                  key={idea._id}
                  className="bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden"
                >

                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                    alt={idea.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-xl font-bold">
                      {idea.title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      by {idea.creator}
                    </p>

                    <Link
                      href={`/marketplace/${idea._id}`}
                      className="inline-block mt-6 bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      View Idea
                    </Link>

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