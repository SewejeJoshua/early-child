import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Megaphone,
  LogOut,
  UserCircle,
  Home,
  Inbox,
  Check,
} from "lucide-react";

const EarlyAdminDash = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItem = "flex items-center gap-3 px-4 py-3 rounded-lg transition";
  const active = "bg-white text-green-600";
  const inactive = "text-white hover:bg-green-500";

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_ECHILDHOOD_API}/account/logout/`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.warn("Server failed to invalidate token.");
        }
      }
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      // Remove auth
      localStorage.removeItem("token");
      localStorage.removeItem("adminUser");

      // Save logout message
      localStorage.setItem("logoutMessage", "Logout successful");

      // Redirect to login
      navigate("/admin");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow z-40 flex items-center justify-between px-4 h-14">
        <h2 className="font-bold text-green-600">Admin Panel</h2>

        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 h-50 w-64 bg-green-600 text-white flex flex-col z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-green-500">
          <span className="text-lg font-bold">Admin Panel</span>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-3 p-4 border-b border-green-500">
          <UserCircle size={40} />
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-xs opacity-80">Administrator</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 flex flex-col gap-2 p-4">

          <NavLink
            to="dashboardhome"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

             <NavLink
            to="inbox"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <Inbox size={18} />
           Contact Inbox
          </NavLink>

          <NavLink
            to="broadcast"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <Megaphone size={18} />
            Broadcasts
          </NavLink>

          <NavLink
            to="broadcasted"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <Check size={18} />
            Broadcasted 
          </NavLink>

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-green-500">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-green-500 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[80vh]">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default EarlyAdminDash;