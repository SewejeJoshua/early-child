import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dailyAmount, setDailyAmount] = useState("1000");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    // basic frontend validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!dailyAmount || Number(dailyAmount) <= 0) {
      setError("Daily amount must be greater than 0");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/accounts/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
            daily_amount: Number(dailyAmount), // ✅ FIXED (was string)
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // better backend error handling
        const message =
          data?.detail ||
          data?.message ||
          (typeof data === "object" && JSON.stringify(data)) ||
          "Registration failed";

        throw new Error(message);
      }

      navigate("/thrift/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-1">
          Start your thrift
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          One card a month. Track every day.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Daily Amount */}
          <input
            type="number"
            placeholder="Daily Contribution (₦)"
            value={dailyAmount}
            onChange={(e) => setDailyAmount(e.target.value)}
            min={1}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/thrift/login"
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}