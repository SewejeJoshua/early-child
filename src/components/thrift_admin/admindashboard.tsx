import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MonthTabs } from "@/components/thrift/MonthTabs";
import { ThriftCard } from "@/components/thrift/ThriftCard";

type AdminUser = {
  user_id: number;
  email: string;
  full_name?: string;
  daily_amount?: number;
  total_saved: number;
  transactions: number;
};

type AdminDashboardData = {
  total_users: number;
  total_platform_savings: number;
  active_savers: number;
  today_contributions: number;
  pending_withdrawals: number;
  daily_inflow: {
    date: string;
    total_inflow: number;
    transactions: number;
  };
  users: AdminUser[];

  // ✅ FIXED: matches backend exactly
  total_withdrawable_balance?: number;
};

type AuditLog = {
  id: number;
  action: string;
  description: string;
  created_at: string;
  user: number;
};

type WithdrawalRequest = {
  id: number;
  amount: string;
  user_full_name: string;
  phone: string;
  email: string;
  daily_amount: string;
  completed_days: number;
  streak: number;
  total_saved: string;
  status: "pending" | "approved" | "rejected" | "sent";
  admin_note: string | null;
  created_at: string;
  updated_at: string;
  user: number;
};

type CalendarItem = {
  day: number;
  date: string;
  status: "paid" | "unpaid";
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();

  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [loadingUserData, setLoadingUserData] = useState(false);

  const [noteModal, setNoteModal] = useState<{
    open: boolean;
    id: number | null;
    status: "approved" | "rejected" | "sent" | null;
  }>({ open: false, id: null, status: null });

  const [adminNote, setAdminNote] = useState("");

  const activeRequestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!token) navigate("/thrift/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/dashboard/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setData);

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/audit-logs/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setLogs);

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/withdrawals/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setWithdrawals);
  }, [token]);

  useEffect(() => {
    if (!selectedUser || !token) return;

    const requestId = Date.now();
    activeRequestRef.current = requestId;

    setLoadingUserData(true);
    setCalendar([]);

    fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/users/${selectedUser}/dashboard/?year=${year}&month=${month + 1}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((r) => r.json())
      .then((res) => {
        if (activeRequestRef.current !== requestId) return;
        setCalendar(Array.isArray(res?.calendar) ? res.calendar : []);
      })
      .finally(() => {
        if (activeRequestRef.current === requestId) {
          setLoadingUserData(false);
        }
      });
  }, [selectedUser, month, year, token]);

  useEffect(() => {
    setCalendar([]);
  }, [selectedUser]);

  async function updateWithdrawal(
    id: number,
    status: "approved" | "rejected" | "sent",
    note?: string
  ) {
    const res = await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/withdrawals/${id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          admin_note: note || null,
        }),
      }
    );

    if (!res.ok) return;

    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status,
              admin_note: note || w.admin_note,
              updated_at: new Date().toISOString(),
            }
          : w
      )
    );
  }

  function openNoteModal(id: number, status: "approved" | "rejected" | "sent") {
    setNoteModal({ open: true, id, status });
    setAdminNote("");
  }

  function submitNote() {
    if (!noteModal.id || !noteModal.status) return;

    updateWithdrawal(noteModal.id, noteModal.status, adminNote);

    setNoteModal({ open: false, id: null, status: null });
    setAdminNote("");
  }

  function getStatusColor(status: string) {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  }

  function isDisabled(status: string) {
    return status === "approved" || status === "rejected";
  }

  async function downloadExcel() {
    const res = await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/savings/admin/export/excel/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "savings-report.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* NOTE MODAL unchanged */}
      {noteModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-[320px]">
            <h2 className="font-semibold mb-2">Admin Note</h2>

            <textarea
              className="w-full border rounded p-2 text-sm"
              placeholder="Write reason / note..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() =>
                  setNoteModal({ open: false, id: null, status: null })
                }
                className="px-3 py-1 border rounded text-sm"
              >
                Cancel
              </button>

              <button
                onClick={submitNote}
                className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER unchanged */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link to="/" className="font-bold text-lg">
            Thrift Admin
          </Link>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/thrift_admin/users")}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg"
            >
              Users Profile
            </button>

            <button
              onClick={downloadExcel}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg"
            >
              Export Excel
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/thrift/login");
              }}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[280px_1fr_340px] gap-6">

        {/* USERS unchanged */}
        <aside className="bg-white border rounded-2xl shadow-sm p-4 sticky top-24 h-fit">
          <h2 className="text-xs uppercase text-gray-500 mb-3">
            Active Users ({data.active_savers})
          </h2>

          <div className="space-y-2 max-h-[65vh] overflow-y-auto">
            {data.users.map((u) => (
              <button
                key={u.user_id}
                onClick={() => setSelectedUser(u.user_id)}
                className="w-full text-left p-3 rounded-xl border hover:bg-gray-50"
              >
                <p className="text-sm font-medium truncate">
                  {u.full_name?.trim() || u.email}
                </p>
                <p className="text-xs text-gray-500">
                  ₦{u.total_saved.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER */}
        <section className="space-y-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat label="Total Users" value={data.total_users} />
            <Stat label="Active Savers" value={data.active_savers} />
            <Stat
              label="Platform Savings"
              value={`₦${data.total_platform_savings.toLocaleString()}`}
            />
            <Stat
              label="Daily Inflow"
              value={`₦${data.daily_inflow.total_inflow.toLocaleString()}`}
            />
            <Stat label="Today Contributions" value={data.today_contributions} />
            <Stat label="Pending Withdrawals" value={data.pending_withdrawals} />

            {/* FIXED FIELD */}
            <Stat
              label="Withdrawable Balance"
              value={`₦${(data.total_withdrawable_balance || 0).toLocaleString()}`}
            />
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-4">
            <MonthTabs month={month} setMonth={setMonth} />
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-4">
            {selectedUser ? (
              <div className={loadingUserData ? "opacity-60" : ""}>
                <ThriftCard
                  key={`${selectedUser}-${month}-${year}`}
                  month={month}
                  year={year}
                  dashboard={{ history: calendar }}
                  isAdmin
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-10">
                Select a user to view savings calendar
              </p>
            )}
          </div>
        </section>

        {/* WITHDRAWALS unchanged */}
        <aside className="space-y-6">
          <div className="bg-white border rounded-2xl shadow-sm p-4">
            <h2 className="text-xs uppercase text-gray-500 mb-3">
              Withdrawals
            </h2>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
              {withdrawals.map((w) => (
                <div key={w.id} className="border rounded-xl p-3 bg-gray-50">

                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(w.status)}`}>
                    {w.status}
                  </span>

                  <p className="font-medium text-sm mt-2">
                    {w.user_full_name}
                  </p>

                  <p className="text-xs text-gray-500">{w.email}</p>

                  {w.admin_note && (
                    <p className="text-xs text-gray-600 mt-1">
                      Note: {w.admin_note}
                    </p>
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      disabled={isDisabled(w.status)}
                      onClick={() => openNoteModal(w.id, "approved")}
                      className="text-xs px-2 py-1 rounded bg-emerald-600 text-white disabled:opacity-40"
                    >
                      Approve
                    </button>

                    <button
                      disabled={isDisabled(w.status)}
                      onClick={() => openNoteModal(w.id, "rejected")}
                      className="text-xs px-2 py-1 rounded bg-red-500 text-white disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-4">
            <h2 className="text-xs uppercase text-gray-500 mb-3">
              Audit Logs
            </h2>

            <div className="space-y-2 max-h-[40vh] overflow-y-auto">
              {logs.map((l) => (
                <div key={l.id} className="text-xs border-b pb-2">
                  <p className="text-gray-700">{l.description}</p>
                  <p className="text-gray-400">
                    {new Date(l.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}

/* Stat unchanged */
function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}