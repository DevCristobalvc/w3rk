import "./i18n";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import AIChat from "@/pages/AIChat";
import Register from "@/pages/Register";
import Loging from "@/pages/LogIn";
import UserProfile from "@/pages/Profile";
import CreateCV from "@/pages/CreateCV"
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Loging />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/create-cv" element={<CreateCV />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
