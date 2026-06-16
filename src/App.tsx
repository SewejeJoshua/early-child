import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "@/components/Gallery";

//admin
import EarlyAdminLogin from "@/components/admin/EarlyAdminLogin";
import EarlyAdminDash from "@/components/admin/EarlyAdminDash";
import DashboardHome from "@/components/admin/DashboardHome";
import Broadcast from "@/components/admin/Broadcast";
import Inbox from "@/components/admin/Inbox";
import BMessage from "@/components/admin/BroadcastedMessage";


//chlidrens's day 
import ChildrensDayRegistrationForm from "@/components/ChildrensDayRegistrationForm";
import Childadminlogin from "@/components/childrenday/Childadminlogin";
import Childadmindash from "./components/childrenday/Childadmindash";
import Childdashhome from "@/components/childrenday/Childdashhome";
import Registered from "@/components/childrenday/Registered";

//thrift
import Landing from "@/components/thrift/Landing";
import SignupPage from "@/components/thrift/signup";
import LoginPage from "@/components/thrift/login";
import Dashboard from "@/components/thrift/dashboard";
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

           <Route path="/thrift" element={<Landing />} />

          <Route path="/thrift/signup" element={<SignupPage />} />

          <Route path="/thrift/login" element={<LoginPage />} />

          <Route path="/thrift/dashboard" element={<Dashboard />} />

          {/* ADMIN DASHBOARD WITH NESTED ROUTES */}
          <Route path="/admin/EarlyAdminDash" element={<EarlyAdminDash />}>

            <Route index element={<DashboardHome />} />

            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="broadcasted" element={<BMessage />} />
          </Route>


        {/* Thrift */}
        {/* <Route path="/thrift/Landing" element={<Landing />}>

        </Route> */}



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