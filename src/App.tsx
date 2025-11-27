import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryWorksheets from "./pages/CategoryWorksheets";
import WorksheetDetail from "./pages/WorksheetDetail";
import SubCategory from "./pages/SubCategory";

import AdminUpload from "./pages/AdminUpload";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";

import AssignmentsLanding from "./pages/AssignmentsLanding";
import Packs from "./pages/Packs";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />

          <Routes>

            {/* PUBLIC HOME */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/packs" element={<Packs />} />

            {/* CATEGORY LIST (Math, English, etc.) */}
            <Route path="/categories/:grade/:subject" element={<Category />} />

            {/* WORKSHEETS INSIDE CATEGORY (Addition, Shapes, etc.) */}
            <Route path="/category/:categoryId" element={<CategoryWorksheets />} />

            {/* WORKSHEET DETAIL */}
            <Route path="/worksheet/:worksheetId" element={<WorksheetDetail />} />

            {/* ASSIGNMENTS */}
            <Route path="/assignments/:grade" element={<AssignmentsLanding />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin/upload" element={<AdminUpload />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            {/* Obscured secure entry URL – goes to admin login */}
            <Route path="/dashboard-secure-2025" element={<AdminLogin />} />

            {/* FALLBACK – keep this last */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
