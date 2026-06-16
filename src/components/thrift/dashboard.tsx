import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MonthTabs } from "@/components/thrift/MonthTabs";
import { ThriftCard } from "@/components/thrift/ThriftCard";

type HistoryItem = {
  date: string;
  status: "paid" | "unpaid";
  amount: number;
};

type DashboardData = {
  history: HistoryItem[];
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

  // FILTER MONTH HISTORY ONLY
  const monthHistory = useMemo(() => {
    if (!data?.history) return [];

    return data.history.filter((h) => {
      const d = new Date(h.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [data, month]);

  // GET TODAY (FOR PAYMENT TARGET DAY)
  const today = new Date();
  const currentDay = today.getDate();

  async function handlePay() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/savings/payments/initialize/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            month,
            year,
            day: currentDay,
          }),
        }
      );

      const json = await res.json();

      if (json?.authorization_url) {
        window.location.href = json.authorization_url;
      } else {
        alert("Payment failed to initialize");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error");
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
      <header className="border-b p-3 flex justify-between items-center">
        <Link to="/" className="font-bold">
          Verdant
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/thrift/login");
          }}
          className="text-sm px-3 py-1 border rounded-full"
        >
          Logout
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* MONTH SELECTOR */}
        <MonthTabs month={month} setMonth={setMonth} />

        {/* PAY BUTTON (DAY-BASED) */}
        <button
          onClick={handlePay}
          className="px-5 py-3 bg-primary text-white rounded-full font-semibold w-full md:w-auto"
        >
          Pay
        </button>

        {/* THRIFT CARD */}
        <div className="max-w-3xl mx-auto">
          <ThriftCard
            month={month}
            year={year}
            dashboard={{ history: monthHistory }}
          />
        </div>
      </main>
    </div>
  );
}