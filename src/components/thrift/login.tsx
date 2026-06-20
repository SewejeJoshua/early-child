import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Earlylogo from "@/assets/images/early-logo.jpeg";

function decodeToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

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
          headers: { "Content-Type": "application/json" },
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

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      const payload = decodeToken(data.access);

      console.log("TOKEN PAYLOAD:", payload);

      // ✅ CLEAN ROLE CHECK (no unsafe fallback)
      const role = payload?.role || (payload?.is_staff ? "admin" : "user");

      if (role === "admin") {
        navigate("/thrift_admin/admindashboard", { replace: true });
      } else {
        navigate("/thrift/dashboard", { replace: true });
      }
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
          <p className="text-sm text-gray-500">Welcome back </p>
        </div>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email or Username"
          disabled={loading}
          className="w-full p-3 border rounded disabled:opacity-50"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          className="w-full p-3 border rounded disabled:opacity-50"
        />

        {error && (
          <div className="p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}