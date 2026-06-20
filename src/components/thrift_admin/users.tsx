import { useEffect, useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  daily_amount: number;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};

export default function UsersPage() {
  const token = localStorage.getItem("accessToken");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 30;

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  async function fetchUsers(pageNum: number) {
    setLoading(true);

    try {
      const res = await fetch(
        `https://earlychildhood-backend.onrender.com/savings/admin/users/?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ApiResponse = await res.json();

      setUsers(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }

  // SEARCH FILTER
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return users;

    return users.filter((u) => {
      return (
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        String(u.daily_amount).includes(q)
      );
    });
  }, [users, search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-background p-6 relative">

      {/* 🔥 SMALL TOP-RIGHT COUNT (ONLY "4") */}
      <div className="absolute mt-14 top-4 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-bold">
        {totalCount}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Users Management</h1>

        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          ← Back
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4  mt-14">
        <input
          type="text"
          placeholder="Search by name, email, phone or amount..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Daily Amount</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{u.name || "-"}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone || "-"}</td>
                  <td className="p-3">
                    ₦{Number(u.daily_amount || 0).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-green-600 text-white rounded-full disabled:opacity-40"
        >
          Previous
        </button>

        <p className="text-sm">
          Page <b>{page}</b> of <b>{totalPages || 1}</b>
        </p>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded-full disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}