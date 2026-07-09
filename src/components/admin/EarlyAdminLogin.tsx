import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Earlylogo from "@/assets/images/early-logo.jpeg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.detail || data?.message || "Login failed");
        return;
      }

      // Allow only admins
      const isAdmin =
        data?.user?.is_staff === true ||
        data?.user?.is_superuser === true;

      if (!isAdmin) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setError("Only administrators are allowed to log in.");
        return;
      }

      // Save tokens only for admins
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Optional: Save admin info
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/admin/EarlyAdminDash", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border rounded-xl space-y-4 bg-white shadow"
      >
        <div className="text-center space-y-2">
          <img
            src={Earlylogo}
            className="w-16 h-16 mx-auto rounded-full"
            alt="Logo"
          />

          <h1 className="text-xl font-bold">Login here</h1>

          <p className="text-sm text-gray-500">
            Welcome back
          </p>
        </div>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email or Username"
          disabled={loading}
          className="w-full p-3 border rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          className="w-full p-3 border rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {error && (
          <div className="p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}