import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(), // ✅ IMPORTANT FIX
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || data?.message || "Invalid login credentials"
        );
      }

      // ✅ STORE FULL USER
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ JWT TOKENS (CORE FIX)
      if (data?.access) {
        localStorage.setItem("accessToken", data.access);
      }

      if (data?.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      // Optional: store expiry-aware flag
      localStorage.setItem("isAuthenticated", "true");

      // Optional: decode role safely fallback
      const role = data?.role || "user";

      // Redirect based on role
      if (role === "admin") {
        navigate("/thrift/admin");
      } else {
        navigate("/thrift/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Log in to your thrift card.
        </p>

        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          {/* Username (Email input UI but sent as username) */}
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-primary"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          {/* Signup link */}
          <p className="text-sm text-center text-muted-foreground">
            New here?{" "}
            <Link
              to="/thrift/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}