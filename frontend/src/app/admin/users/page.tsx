"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };


  const deleteUser = async (id: string) => {

    const confirmDelete = confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        User Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-zinc-800">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">
                Username
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-zinc-800"
              >

                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteUser(user.id)
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