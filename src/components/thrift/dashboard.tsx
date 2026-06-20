import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MonthTabs } from "@/components/thrift/MonthTabs";
import { ThriftCard } from "@/components/thrift/ThriftCard";

type HistoryItem = {
  date: string;
  status: "paid" | "unpaid";
  amount: number;
  time?: string;
};

type DashboardData = {
  full_name?: string;
  today?: {
    date: string;
    status: "paid" | "unpaid";
  };
  streak?: number;
  total_saved?: number;
  withdrawable_balance?: number;
  history: HistoryItem[];
};

type ProfileData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  daily_amount?: number;
};

type WithdrawHistoryItem = {
  amount: number;
  daily_amount: number;
  total_saved: number;
  completed_days: number;
  status: string;
  date?: string;
};

type UnifiedHistory =
  | { type: "paid"; date: string; amount: number; status: string }
  | { type: "withdraw"; date?: string; amount: number; status: string };

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData | null>(null);
  const [withdrawHistory, setWithdrawHistory] = useState<WithdrawHistoryItem[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [historyPopup, setHistoryPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);

  const [detail, setDetail] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) navigate("/thrift/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/savings/dashboard/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/accounts/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, [token]);

  function showDetail(type: "success" | "error", text: string) {
    setDetail({ type, text });
    setTimeout(() => setDetail(null), 4000);
  }

  const parseDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const monthHistory = useMemo(() => {
    if (!data?.history) return [];
    return data.history.filter((h) => {
      const d = parseDate(h.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [data, month, year]);

  const monthlyTotalSaved = useMemo(() => {
    return monthHistory
      .filter((h) => h.status === "paid")
      .reduce((sum, h) => sum + Number(h.amount || 0), 0);
  }, [monthHistory]);

  const monthlyStreak = useMemo(() => {
    if (!monthHistory.length) return 0;

    const sorted = [...monthHistory].sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
    );

    let streak = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].status === "paid") streak++;
      else break;
    }
    return streak;
  }, [monthHistory]);

  const withdrawableBalance = data?.withdrawable_balance || 0;

  async function fetchProfile() {
    const res = await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/accounts/profile/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const json = await res.json();
    setProfile(json);
    setProfilePopup(true);
  }

  async function fetchHistory() {
    const res = await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/savings/withdraw/history/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const json = await res.json();
    setWithdrawHistory(json);
    setHistoryPopup(true);
  }

  async function handlePay() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/savings/payments/initialize/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month, year }),
        }
      );

      const data = await res.json();

      const url = data?.authorization_url || data?.data?.authorization_url;
      const errorMsg = data?.detail || data?.message;

      if (url) {
        window.location.href = url;
      } else {
        showDetail("error", errorMsg || "Payment initialization failed");
      }
    } catch {
      showDetail("error", "Network error during payment");
    }
  }

  async function handleWithdraw() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/savings/withdraw/request/`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showDetail("error", data?.detail || data?.message || "Withdraw failed");
        return;
      }

      showDetail("success", "Withdraw request sent successfully");
    } catch {
      showDetail("error", "Network error during withdraw");
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/accounts/logout/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    localStorage.clear();
    navigate("/thrift/login");
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const username =
    profile?.first_name ||
    data?.full_name?.split(" ")[0] ||
    "User";

  const dailyAmount = profile?.daily_amount || 0;

  const unifiedHistory: UnifiedHistory[] = [
    ...monthHistory.map((h) => ({
      type: "paid" as const,
      date: h.date,
      amount: h.amount,
      status: h.status,
    })),
    ...withdrawHistory.map((w) => ({
      type: "withdraw" as const,
      date: w.date,
      amount: w.amount,
      status: w.status,
    })),
  ];

  return (
    <div className="min-h-screen bg-background">

      {detail && (
        <div
          className={`p-3 text-center text-white ${
            detail.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {detail.text}
        </div>
      )}

      <header className="border-b p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <Link to="/" className="flex items-center gap-3 font-bold text-lg">
          <img src="/favicon.ico" className="w-8 h-8 rounded-full" />
          <span>Welcome back, {username}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">

          <button onClick={handlePay} className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-600 text-white">
            <WalletIcon />
            Pay ₦{dailyAmount}
          </button>

          <button onClick={handleWithdraw} className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white">
            <WithdrawIcon />
            Withdraw
          </button>

          <button onClick={fetchProfile}><UserIcon /></button>
          <button onClick={fetchHistory}><HistoryIcon /></button>

          <button onClick={handleLogout} className="border px-3 py-2 rounded-full">
            Logout
          </button>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 py-6 space-y-5">

        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Total Saved" value={`₦${monthlyTotalSaved}`} />
          <StatCard title="Streak" value={`${monthlyStreak} days`} />
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Withdrawable Balance</p>
          <p className="text-2xl font-bold text-green-600">
            ₦{withdrawableBalance}
          </p>
        </div>

        <MonthTabs month={month} setMonth={setMonth} />

        <ThriftCard month={month} year={year} dashboard={{ history: monthHistory }} />

      </main>

      {profilePopup && (
        <Modal onClose={() => setProfilePopup(false)}>
          <div className="bg-white p-5 rounded-xl w-[90vw] max-w-md">
            <ModalHeader title="Profile" onClose={() => setProfilePopup(false)} />
            <p>{profile?.first_name} {profile?.last_name}</p>
            <p>{profile?.email}</p>
            <p>{profile?.phone}</p>
            <p>Daily: ₦{profile?.daily_amount}</p>
          </div>
        </Modal>
      )}

      {historyPopup && (
        <Modal onClose={() => setHistoryPopup(false)}>
          <div className="bg-white p-5 rounded-xl w-[90vw] max-w-md">
            <ModalHeader title="Transaction History" onClose={() => setHistoryPopup(false)} />

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {unifiedHistory.map((h, i) => (
                <div key={i} className="border p-2 rounded flex justify-between items-center">
                  <div>
                    <p>{h.type === "paid" ? "Payment" : "Withdrawal"}</p>
                    <p className="text-xs text-gray-500">{h.date}</p>
                    <p className="text-xs">{h.status}</p>
                  </div>

                  <div className="font-bold">₦{h.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ICONS + UI (UNCHANGED) */

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.7 0 5-2.2 5-5s-2.3-5-5-5-5 2.2-5 5 2.3 5 5 5Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 22c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 3-6" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 3v6h6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 12h2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function WithdrawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 21h16" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ModalHeader({ title, onClose }: any) {
  return (
    <div className="flex justify-between mb-3">
      <h2 className="font-bold">{title}</h2>
      <button onClick={onClose}>X</button>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="border p-3 rounded-xl">
      <p>{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}