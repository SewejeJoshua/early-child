import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Earlylogo from "@/assets/images/early-logo.jpeg";

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
            daily_amount: Number(dailyAmount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">

        <div className="px-8 pt-8 pb-4 text-center">

          <img
            src={Earlylogo}
            alt="Early Child Logo"
            className="w-20 h-20 rounded-full mx-auto shadow-md border-4 border-white"
          />

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500 text-sm">
            Join our digital thrift platform and start saving daily.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="px-8 pb-8 space-y-4"
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="Password (minimum 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          <input
            type="number"
            placeholder="Daily Contribution (₦)"
            value={dailyAmount}
            onChange={(e) => setDailyAmount(e.target.value)}
            min={1}
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
                    <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs uppercase tracking-wide text-gray-400">
                Already registered?
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/thrift/login"
              className="font-semibold text-primary hover:underline transition"
            >
              Log in here
            </Link>
          </p>
        </form>

         
      </div>
    </div>
  );
}