import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MonthTabs } from "@/components/thrift/MonthTabs";
import { ThriftCard } from "@/components/thrift/ThriftCard";

type HistoryItem = {
  date: string;
  status: "paid" | "unpaid";
  amount: number;
};

type DashboardData = {
  today: {
    date: string;
    status: "paid" | "unpaid";
  };
  streak: number;
  total_saved: number;
  history?: HistoryItem[];
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData | null>(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) navigate("/thrift/login");
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/savings/dashboard/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  async function handlePay() {
    const res = await fetch(
      `${import.meta.env.VITE_ECHILDHOOD_API}/payments/initiate-monthly/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ month, year }),
      }
    );

    const json = await res.json();

    if (json?.authorization_url) {
      window.location.href = json.authorization_url;
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          Verdant
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/thrift/login");
          }}
        >
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* 🔥 GLOBAL STATS (ONLY ONCE — FIXED) */}
        <div className="grid grid-cols-2 gap-4">
          <Stat title="Total Saved (All Time)" value={`₦${data.total_saved ?? 0}`} />
          <Stat title="Streak (All Time)" value={`${data.streak ?? 0} days`} />
        </div>

        {/* 💳 PAY BUTTON (MONTHLY ACTION) */}
        <button
          onClick={handlePay}
          className="px-4 py-2 bg-primary text-white rounded-full"
        >
          Pay for {new Date(0, month).toLocaleString("default", { month: "long" })}
        </button>

        {/* 📅 MONTH SELECTOR */}
        <MonthTabs month={month} setMonth={setMonth} />

        {/* 📊 MONTHLY CARD */}
        <ThriftCard
          month={month}
          year={year}
          dashboard={data}
        />
      </main>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 bg-card">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}