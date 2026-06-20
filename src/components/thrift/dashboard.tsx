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

  async function handlePay() {
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

    if (url) window.location.href = url;
  }

  async function handleWithdraw() {
    await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/savings/withdraw/request/`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Withdraw request sent to admin");
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const username = profile?.first_name || "User";
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

      <header className="border-b p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <Link to="/" className="flex items-center gap-3 font-bold text-lg">
          <img src="/favicon.ico" className="w-8 h-8 rounded-full" />
          <span>Welcome back, {username}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">

          <button
            onClick={handlePay}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-600 text-white"
          >
            <WalletIcon />
            Pay ₦{dailyAmount}
          </button>

          <button
            onClick={handleWithdraw}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white"
          >
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

        <MonthTabs month={month} setMonth={setMonth} />

        <ThriftCard month={month} year={year} dashboard={{ history: monthHistory }} />

      </main>

      {historyPopup && (
        <Modal onClose={() => setHistoryPopup(false)}>
          <div className="bg-white p-5 rounded-xl w-[90vw] max-w-md">

            <ModalHeader title="Transaction History" onClose={() => setHistoryPopup(false)} />

            <div className="space-y-2 max-h-80 overflow-y-auto">

              {unifiedHistory.map((h, i) => (
                <div key={i} className="border p-2 rounded flex justify-between items-center">

                  <div>
                    <p className="text-sm font-medium">
                      {h.type === "paid" ? "Payment" : "Withdrawal"}
                    </p>
                    <p className="text-xs text-gray-500">{h.date}</p>
                    <p className="text-xs">{h.status}</p>
                  </div>

                  <div className="flex items-center gap-2 font-bold">
                    {h.type === "paid" ? <WalletIcon /> : <WithdrawIcon />}
                    ₦{h.amount}
                  </div>

                </div>
              ))}

            </div>

          </div>
        </Modal>
      )}

    </div>
  );
}

/* ================= ICONS RESTORED ================= */

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

/* UI */
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