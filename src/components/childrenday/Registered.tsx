import { useEffect, useState } from "react";
import { Trash2, X, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_ECHILDHOOD_API;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  parent_name: string;
  parent_phone: string;
  medical_notes: string;
  email: string;
  school: string;
  receipt_url: string;
  pass_code: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 5;

const Registered = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = token
    ? { Authorization: `Token ${token}` } // change to Bearer if needed
    : {};

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  // FETCH USERS
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/registrations/`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];

      setUsers(list);
      setFilteredUsers(list);
    } catch (err) {
      console.error(err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // FETCH DELETED USERS
  const fetchDeletedUsers = async () => {
    try {
      const res = await fetch(`${API}/api/Deleted-registrations/`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch deleted users");

      const data = await res.json();
      setDeletedUsers(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error(err);
      setDeletedUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDeletedUsers();
  }, []);

  // SEARCH
  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.first_name} ${user.last_name} ${user.email} ${user.parent_phone} ${user.pass_code}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [search, users]);

  // PAGINATION
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  // DELETE USER
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await fetch(`${API}/api/registrations/${id}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      // ⚡ Instant UI update
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== id));

      // 🔄 Background refresh
      fetchDeletedUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const renderTableRows = (user: User, isDeleted = false) => {
    const { date, time } = formatDateTime(user.created_at);

    return (
      <tr key={user.id} className="text-center hover:bg-gray-50">
        <td className="p-2 border">
          {user.first_name} {user.last_name}
        </td>
        <td className="p-2 border">{user.age}</td>
        <td className="p-2 border">{user.gender}</td>
        <td className="p-2 border">{user.parent_name}</td>
        <td className="p-2 border">{user.email}</td>
        <td className="p-2 border">{user.parent_phone}</td>
        <td className="p-2 border">{user.medical_notes}</td>
        <td className="p-2 border">{user.school}</td>
        <td className="p-2 border font-mono">{user.pass_code}</td>
        <td className="p-2 border">{date}</td>
        <td className="p-2 border">{time}</td>

        {!isDeleted && (
          <td className="p-2 border">
            <img
              src={user.receipt_url}
              alt="receipt"
              onClick={() => setPreviewImage(user.receipt_url)}
              onError={(e: any) => (e.target.style.display = "none")}
              className="w-16 h-16 object-cover mx-auto rounded cursor-pointer"
            />
          </td>
        )}

        <td className="p-2 border">
          {!isDeleted && (
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deletingId === user.id}
              className="p-2 bg-red-500 text-white rounded flex items-center justify-center mx-auto disabled:opacity-50"
            >
              {deletingId === user.id ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search name, email, or pass code..."
        className="border p-2 mb-4 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* USERS TABLE */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Parent Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Parent Phone</th>
                <th className="p-2 border">Medical Notes</th>
                <th className="p-2 border">School</th>
                <th className="p-2 border">Pass Code</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Receipt</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={13} className="p-4 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => renderTableRows(user))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-between mt-4 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* DELETED USERS */}
      <h2 className="text-xl font-bold mt-10 mb-4">Deleted Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-red-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Parent Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Parent Phone</th>
              <th className="p-2 border">Medical Notes</th>
              <th className="p-2 border">School</th>
              <th className="p-2 border">Pass Code</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>

          <tbody>
            {deletedUsers.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-4 text-center">
                  No deleted users
                </td>
              </tr>
            ) : (
              deletedUsers.map((user) => renderTableRows(user, true))
            )}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={previewImage}
              className="max-w-[90vw] max-h-[90vh] rounded"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-white p-1 rounded"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registered;