type HistoryItem = {
  date: string;
  status: "paid" | "unpaid";
  amount: number;
};

type Props = {
  month: number;
  year: number;
  dashboard: {
    today: { date: string; status: string };
    streak: number;
    total_saved: number;
    history?: HistoryItem[];
  };
};

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export function ThriftCard({ month, year, dashboard }: Props) {
  const days = daysInMonth(year, month);

  // 🔥 SAFE FALLBACK (prevents crash)
  const history = dashboard.history ?? [];

  // 🔥 convert to Set safely
  const paidDates = new Set(
    history
      .filter((h) => h?.status === "paid")
      .map((h) => h.date)
  );

  function formatDate(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const weeks = [
    { label: "Week 1", days: range(1, 7) },
    { label: "Week 2", days: range(8, 14) },
    { label: "Week 3", days: range(15, 21) },
    { label: "Week 4", days: range(22, days) },
  ];

  return (
    <div className="border rounded-2xl bg-card">
      <div className="p-4 border-b">
        <h2 className="font-bold">
          {MONTHS[month]} {year}
        </h2>
      </div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {weeks.map((w) => (
          <div key={w.label} className="border rounded-xl">
            <div className="p-2 text-xs font-bold bg-primary/10">
              {w.label}
            </div>

            <div className="p-2 space-y-2">
              {w.days.map((d) => {
                const key = formatDate(d);
                const paid = paidDates.has(key);

                return (
                  <div key={d} className="flex justify-between text-sm">
                    <span>Day {d}</span>
                    <span
                      className={`size-3 rounded ${
                        paid ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function range(s: number, e: number) {
  return Array.from({ length: e - s + 1 }, (_, i) => s + i);
}