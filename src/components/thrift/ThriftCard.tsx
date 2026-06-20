type HistoryItem = {
  date: string;
  status: "paid" | "unpaid";
  amount: number;
};

type Props = {
  month: number;
  year: number;
  dashboard:
    | {
        history?: HistoryItem[];
      }
    | null
    | undefined;

  isAdmin?: boolean;
  onToggle?: (date: string, status: "paid" | "unpaid") => void;
};

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function ThriftCard({
  month,
  year,
  dashboard,
  isAdmin = false,
  onToggle,
}: Props) {
  const days = daysInMonth(year, month);

  const rawHistory: HistoryItem[] = Array.isArray(dashboard?.history)
    ? dashboard.history
    : [];

  // 🔥 STEP 1: STRICT MONTH EXTRACTION (NO MIXING)
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  const monthHistory = rawHistory.filter((h) => {
    const d = new Date(h.date);
    const hKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return hKey === monthKey;
  });

  // 🔥 STEP 2: BUILD CLEAN INDEX (ONLY THIS MONTH)
  const statusMap: Record<string, "paid" | "unpaid"> = {};

  monthHistory.forEach((h) => {
    statusMap[h.date] = h.status;
  });

  function formatDate(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  function isPastDate(date: string) {
    const today = new Date().toISOString().split("T")[0];
    return date < today;
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
        {weeks.map((week) => (
          <div key={week.label} className="border rounded-xl">
            <div className="p-2 text-xs font-bold bg-primary/10">
              {week.label}
            </div>

            <div className="p-2 space-y-2">
              {week.days.map((day) => {
                const date = formatDate(day);

                // 🔥 ONLY THIS MONTH'S DATA IS VALID
                const status = statusMap[date] ?? "unpaid";

                const paid = status === "paid";
                const missed = status === "unpaid" && isPastDate(date);

                return (
                  <div
                    key={day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>Day {day}</span>

                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={() => onToggle?.(date, status)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          paid
                            ? "bg-green-500 border-green-500"
                            : missed
                            ? "bg-red-500 border-red-500"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      >
                        {paid && (
                          <span className="text-white text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          paid
                            ? "bg-green-500 border-green-500"
                            : missed
                            ? "bg-red-500 border-red-500"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      >
                        {paid && (
                          <span className="text-white text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    )}
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

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}