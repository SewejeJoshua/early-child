import { useState } from "react";
import { useNavigate } from "react-router-dom";

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
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
        setError(data?.detail || "Login failed");
        return;
      }

      // store tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // decode token
      const payload = decodeToken(data.access);

      console.log("TOKEN PAYLOAD:", payload);

      // ----------------------------
      // 🔥 STRICT ADMIN DETECTION
      // ----------------------------

      const userId = String(payload?.user_id);

      // IMPORTANT: backend said admin is determined by token
      const isAdmin =
        payload?.is_staff === true ||
        payload?.is_admin === true ||
        payload?.role === "admin" ||
        userId === "1"; // fallback rule

      if (isAdmin) {
        navigate("/thrift_admin/admindashboard", { replace: true });
      } else {
        navigate("/thrift/dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border rounded-xl space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}