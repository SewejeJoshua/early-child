import { useEffect, useState } from "react";
import { Trash2, X, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_ECHILDHOOD_API;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  school: string;

  football: string;
  football_club: string;

  parent_name: string;
  parent_phone: string;
  medical_notes: string;
  email: string;

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
    ? { Authorization: `Token ${token}` }
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
      `
      ${user.first_name}
      ${user.last_name}
      ${user.email}
      ${user.parent_phone}
      ${user.pass_code}
      ${user.school}
      ${user.football_club}
      ${user.football}
      `
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

      const res = await fetch(
        `${API}/api/registrations/${id}/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...authHeader,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== id));

      fetchDeletedUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  // FOOTBALL FIX
  const formatFootball = (value: any) => {
    if (!value) return "No";
    const v = String(value).toLowerCase();
    if (["yes", "true", "1"].includes(v)) return "Yes";
    if (["no", "false", "0"].includes(v)) return "No";
    return value;
  };

  const formatClub = (user: User) => {
    if (formatFootball(user.football) !== "Yes") return "No";
    return user.football_club || "Not provided";
  };

  // TABLE ROWS
  const renderTableRows = (user: User, isDeleted = false) => {
    const { date, time } = formatDateTime(user.created_at);

    return (
      <tr key={user.id} className="text-center hover:bg-gray-50">
        <td className="p-2 border whitespace-nowrap">
          {user.first_name} {user.last_name}
        </td>

        <td className="p-2 border">{user.age}</td>
        <td className="p-2 border capitalize">{user.gender}</td>
        <td className="p-2 border">{user.school}</td>

        <td className="p-2 border font-medium">
          {formatFootball(user.football)}
        </td>

        <td className="p-2 border">{formatClub(user)}</td>

        <td className="p-2 border">{user.parent_name}</td>
        <td className="p-2 border">{user.email}</td>
        <td className="p-2 border">{user.parent_phone}</td>
        <td className="p-2 border">{user.medical_notes || "-"}</td>
        <td className="p-2 border font-mono">{user.pass_code}</td>
        <td className="p-2 border">{date}</td>
        <td className="p-2 border">{time}</td>

        {!isDeleted && (
          <td className="p-2 border">
            <img
              src={user.receipt_url}
              onClick={() => setPreviewImage(user.receipt_url)}
              className="w-16 h-16 object-cover mx-auto rounded cursor-pointer"
            />
          </td>
        )}

        <td className="p-2 border">
          {!isDeleted && (
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deletingId === user.id}
              className="p-2 bg-red-500 text-white rounded"
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

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* USERS TABLE */}
      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>School</th>
                <th>Football</th>
                <th>Club</th>
                <th>Parent</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Notes</th>
                <th>Code</th>
                <th>Date</th>
                <th>Time</th>
                <th>Receipt</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((u) => renderTableRows(u))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* DELETED USERS TABLE */}
      <h2 className="text-xl font-bold mt-10 mb-4">Deleted Users</h2>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-red-100">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>School</th>
              <th>Football</th>
              <th>Club</th>
              <th>Parent</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Code</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {deletedUsers.map((u) => renderTableRows(u, true))}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="relative">
            <img src={previewImage} className="max-w-[90vw]" />
            <button onClick={() => setPreviewImage(null)}>
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registered;