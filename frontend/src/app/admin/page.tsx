"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalIdeas: 0,
    soldIdeas: 0,
    revenue: 0,
  });

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    fetchDashboard();

  }, [router]);


  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setStats(data);

    } catch (error) {

      console.log(error);

      alert("Failed to load dashboard");

    }

  };

  return (
    <main className="text-white">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>


      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL USERS */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <h2 className="text-lg text-gray-400">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalUsers}
          </p>

        </div>


        {/* AVAILABLE IDEAS */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <h2 className="text-lg text-gray-400">
            Marketplace Ideas
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalIdeas}
          </p>

        </div>


        {/* SOLD IDEAS */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <h2 className="text-lg text-gray-400">
            Sold Ideas
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.soldIdeas}
          </p>

        </div>


        {/* REVENUE */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <h2 className="text-lg text-gray-400">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-4">
            ₹{stats.revenue}
          </p>

        </div>

      </div>

    </main>
  );
}