"use client";

import Link from "next/link";
import { Sparkles, PenSquare, ShoppingBag, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-lg font-black">
              C
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                ContentBay
              </h1>

              <p className="text-xs text-gray-500 -mt-1">
                Marketplace for creators
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>

          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20">

        {/* BACKGROUND GLOWS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute right-0 top-20 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT SIDE */}
          <div>

            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-5 py-2 rounded-full text-sm text-orange-200 mb-8">
              <Sparkles size={16} />
              Built for creative people
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-[1.02] tracking-tight">

              Share Ideas.

              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500">
                Sell Creativity.
              </span>

            </h1>

            <p className="mt-8 text-gray-300 text-xl leading-relaxed max-w-2xl">
              ContentBay is a platform where creators can publish
              and sell scripts, stories, concepts, video ideas,
              creative writing, and digital creative work.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              {/* UPDATED HERE */}
              <Link
                href="/login"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
              >
                Explore Marketplace
              </Link>

              <Link
                href="/register"
                className="border border-white/15 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Start Creating
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />

            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[40px] p-5 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop"
                alt="creative work"
                className="w-full h-[560px] object-cover rounded-[30px]"
              />

            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="text-center max-w-3xl mx-auto mb-20">

          <h2 className="text-5xl font-black leading-tight">

            A Better Place For
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-500">
              Creative Exchange
            </span>

          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Simple tools for creators to publish ideas
            and for buyers to discover original work.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition">

            <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-8">
              <PenSquare className="text-purple-400" size={30} />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Publish Creative Work
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Share scripts, concepts, stories,
              creative writing, and digital ideas
              through a clean creator-focused platform.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition">

            <div className="w-16 h-16 rounded-3xl bg-pink-500/10 flex items-center justify-center mb-8">
              <ShoppingBag className="text-pink-400" size={30} />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Discover Original Ideas
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Explore creative work from different
              creators and find concepts that inspire
              your next project.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition">

            <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center mb-8">
              <ShieldCheck className="text-green-400" size={30} />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Simple & Organized
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Manage listings, purchases, and creative
              content through a streamlined marketplace
              experience.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}