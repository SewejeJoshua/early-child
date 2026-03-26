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
import ChildrensDayRegistrationForm from "@/components/ChildrensDayRegistrationForm";
import Childadminlogin from "@/components/childrenday/Childadminlogin";
import Childadmindash from "./components/childrenday/Childadmindash";
import Childdashhome from "@/components/childrenday/Childdashhome";
import Registered from "@/components/childrenday/Registered";
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

          <Route path="/childrensdayregistrationform" element={<ChildrensDayRegistrationForm />} />
          
          <Route path="/childrenday" element={<Childadminlogin />} />

          {/* ADMIN DASHBOARD WITH NESTED ROUTES */}
          <Route path="/admin/EarlyAdminDash" element={<EarlyAdminDash />}>

            <Route index element={<DashboardHome />} />

            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="broadcasted" element={<BMessage />} />
          </Route>

            {/* Childernday */}
            <Route path="/childrenday/Childadmindash" element={<Childadmindash />}>
            <Route index element={<Childdashhome />} />
            <Route path="dashboardhome" element={<Childdashhome />} /> 
            <Route path="registered" element={<Registered />} />
             
            
          </Route>
             

          {/* Catch-all must ALWAYS be last */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;