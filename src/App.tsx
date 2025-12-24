import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryWorksheets from "./pages/CategoryWorksheets";
import SubcategoryWorksheets from "./pages/SubcategoryWorksheets";
import WorksheetDetail from "./pages/WorksheetDetail";
import SubCategory from "./pages/SubCategory";

import AdminUpload from "./pages/AdminUpload";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";

import AssignmentsLanding from "./pages/AssignmentsLanding";
import Packs from "./pages/Packs";
import Search from "./pages/Search";
import WorksheetsBrowser from "./pages/WorksheetsBrowser";
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
            <Route path="/worksheets" element={<WorksheetsBrowser />} />

            {/* GRADE → CATEGORY LIST (fetches from worksheet_categories) */}
            <Route path="/categories/:gradeSlug" element={<Category />} />

            {/* WORKSHEETS INSIDE CATEGORY (shows subcategories/topics first) */}
            <Route path="/category/:categoryId" element={<CategoryWorksheets />} />

            {/* WORKSHEETS INSIDE SUBCATEGORY (specific topic) */}
            <Route path="/subcategory/:subcategoryId" element={<SubcategoryWorksheets />} />

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
