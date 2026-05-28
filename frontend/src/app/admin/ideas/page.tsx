"use client";

import { useEffect, useState } from "react";

export default function AdminIdeasPage() {

  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    fetchIdeas();
  }, []);


  const fetchIdeas = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/ideas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setIdeas(data);

    } catch (error) {

      console.log(error);

    }

  };


  const deleteIdea = async (id: string) => {

    const confirmDelete = confirm(
      "Delete this idea?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/idea/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchIdeas();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Idea Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-zinc-800">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Creator
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {ideas.map((idea) => (

              <tr
                key={idea.id}
                className="border-t border-zinc-800"
              >

                <td className="p-4">
                  {idea.title}
                </td>

                <td className="p-4">
                  {idea.creator}
                </td>

                <td className="p-4">
                  ₹{idea.price}
                </td>

                <td className="p-4">

                  {idea.sold
                    ? "Sold"
                    : "Available"}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteIdea(idea.id)
                    }
                    className="bg-red-600 px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}