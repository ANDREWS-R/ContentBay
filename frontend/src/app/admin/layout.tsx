"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-[260px] bg-zinc-950 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-black mb-10">
          ContentBay
        </h1>

        <div className="flex flex-col gap-3">

          <Link
            href="/admin"
            className="bg-zinc-900 hover:bg-zinc-800 transition px-5 py-4 rounded-2xl"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/users"
            className="bg-zinc-900 hover:bg-zinc-800 transition px-5 py-4 rounded-2xl"
          >
            Manage Users
          </Link>

          <Link
            href="/admin/ideas"
            className="bg-zinc-900 hover:bg-zinc-800 transition px-5 py-4 rounded-2xl"
          >
            Manage Ideas
          </Link>

        </div>

      </aside>


      {/* PAGE CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}