import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "@/components/Gallery";

// admin (legacy)
import EarlyAdminLogin from "@/components/admin/EarlyAdminLogin";
import EarlyAdminDash from "@/components/admin/EarlyAdminDash";
import DashboardHome from "@/components/admin/DashboardHome";
import Broadcast from "@/components/admin/Broadcast";
import Inbox from "@/components/admin/Inbox";
import BMessage from "@/components/admin/BroadcastedMessage";

// children's day
import ChildrensDayRegistrationForm from "@/components/ChildrensDayRegistrationForm";
import Childadminlogin from "@/components/childrenday/Childadminlogin";
import Childadmindash from "./components/childrenday/Childadmindash";
import Childdashhome from "@/components/childrenday/Childdashhome";
import Registered from "@/components/childrenday/Registered";

// thrift user
import Landing from "@/components/thrift/Landing";
import SignupPage from "@/components/thrift/signup";
import LoginPage from "@/components/thrift/login";
import Dashboard from "@/components/thrift/dashboard";

// ✅ FIXED ADMIN PATH IMPORT (IMPORTANT)
import AdminDashboard from "@/components/thrift_admin/admindashboard";
import Users from "@/components/thrift_admin/users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* ADMIN LOGIN (old system) */}
          <Route path="/admin" element={<EarlyAdminLogin />} />

          {/* CHILDREN DAY */}
          <Route
            path="/childrensdayregistrationform"
            element={<ChildrensDayRegistrationForm />}
          />
          <Route path="/childrenday" element={<Childadminlogin />} />

          {/* THRIFT USER */}
          <Route path="/thrift" element={<Landing />} />
          <Route path="/thrift/signup" element={<SignupPage />} />
          <Route path="/thrift/login" element={<LoginPage />} />
          <Route path="/thrift/dashboard" element={<Dashboard />} />

          {/* ===================================================
              ✅ FIXED THRIFT ADMIN ROUTES (IMPORTANT FIX)
          =================================================== */}

          {/* redirect safety */}
          <Route
            path="/thrift_admin"
            element={<Navigate to="/thrift_admin/admindashboard" replace />}
          />

          {/* actual admin dashboard */}
          <Route
            path="/thrift_admin/admindashboard"
            element={<AdminDashboard />}
          />
           <Route
            path="/thrift_admin/users"
            element={<Users />}
          />
          {/* ===================================================
              LEGACY ADMIN SYSTEM (unchanged)
          =================================================== */}
          <Route path="/admin/EarlyAdminDash" element={<EarlyAdminDash />}>
            <Route index element={<DashboardHome />} />
            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="broadcasted" element={<BMessage />} />
          </Route>

          {/* CHILD ADMIN DASHBOARD */}
          <Route path="/childrenday/Childadmindash" element={<Childadmindash />}>
            <Route index element={<Childdashhome />} />
            <Route path="dashboardhome" element={<Childdashhome />} />
            <Route path="registered" element={<Registered />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;