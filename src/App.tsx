import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import SubCategory from "./pages/SubCategory";
import Category from "./pages/Category";
import CategoryWorksheets from "./pages/CategoryWorksheets";
import AssignmentsLanding from "./pages/AssignmentsLanding";
import WorksheetDetail from "./pages/WorksheetDetail";
import AdminUpload from "./pages/AdminUpload";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
import Packs from "./pages/Packs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/category/:grade" element={<SubCategory />} />
          <Route path="/category/:grade/assignments" element={<AssignmentsLanding />} />
          {/* New clean routes */}
          <Route path="/categories/:grade/:subject" element={<Category />} />
          <Route path="/category/:categoryId" element={<CategoryWorksheets />} />
          <Route path="/worksheet/:worksheetId" element={<WorksheetDetail />} />
          {/* Legacy routes for backwards compatibility */}
          <Route path="/category/:grade/:subject" element={<Category />} />
          <Route path="/category/:grade/:subject/:categoryId" element={<CategoryWorksheets />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/dashboard-secure-2025" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
