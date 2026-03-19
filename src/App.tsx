import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import CateringPage from "./pages/CateringPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReset from "@/components/ScrollReset"; // 1. Import the new component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollReset /> {/* 2. Place it here to automatically reset scroll on every navigation */}
        <ScrollToTop /> {/* This is your floating UI button */}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;