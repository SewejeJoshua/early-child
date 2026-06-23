import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/favicon.ico" className="w-8 h-8 rounded-full" />
            Early Childhood
          </Link>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:opacity-90"
            >
              ← Back
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/thrift/login");
              }}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative p-6">

        {/* TOP RIGHT COUNT */}
        <div className="absolute mt-14 top-4 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-bold">
          {totalCount}
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-bold mb-4">Users Management</h1>

        {/* SEARCH */}
        <div className="mb-4 mt-10">
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
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">

          <div className="flex items-center gap-2 font-medium text-gray-700">
            <img src="/favicon.ico" className="w-5 h-5 rounded-full" />
            Early Childhood Admin Panel
          </div>

          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} Early Childhood. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}