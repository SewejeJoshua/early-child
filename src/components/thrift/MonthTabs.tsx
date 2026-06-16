const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export function MonthTabs({
  month,
  setMonth,
}: {
  month: number;
  setMonth: (m: number) => void;
}) {
  return (
    <div className="w-full max-w-xs">
      <label className="text-sm text-muted-foreground">
        Select Month
      </label>

      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="w-full mt-1 p-2 border rounded-lg bg-card"
      >
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}