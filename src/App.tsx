import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "@/components/Gallery";

import EarlyAdminLogin from "@/components/admin/EarlyAdminLogin";
import EarlyAdminDash from "@/components/admin/EarlyAdminDash";
import DashboardHome from "@/components/admin/DashboardHome";
import Broadcast from "@/components/admin/Broadcast";
import Inbox from "@/components/admin/Inbox";
import BMessage from "@/components/admin/BroadcastedMessage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/admin" element={<EarlyAdminLogin />} />

          {/* ADMIN DASHBOARD WITH NESTED ROUTES */}
          <Route path="/admin/EarlyAdminDash" element={<EarlyAdminDash />}>

            <Route index element={<DashboardHome />} />

            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="broadcasted" element={<BMessage />} />
          </Route>

          {/* Catch-all must ALWAYS be last */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;