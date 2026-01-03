import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toSubjectSlug } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Handles legacy /category/:categoryId routes and redirects to the new
 * canonical /categories/grade-:n/:subjectSlug URL format.
 */
const CategoryRedirect = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lookupAndRedirect = async () => {
      if (!categoryId) {
        navigate("/", { replace: true });
        return;
      }

      try {
        // Look up the category by ID
        const { data, error } = await supabase
          .from("worksheet_categories")
          .select("grade, subject")
          .eq("id", categoryId)
          .maybeSingle();

        if (error || !data) {
          // Category not found, go to home
          console.error("Category not found:", categoryId);
          navigate("/", { replace: true });
          return;
        }

        // Build the new readable URL
        const gradeSlug = `grade-${data.grade}`;
        const subjectSlug = toSubjectSlug(data.subject);
        const newUrl = `/categories/${gradeSlug}/${subjectSlug}`;

        // Redirect with 301 (replace in history)
        navigate(newUrl, { replace: true });
      } catch (err) {
        console.error("Error looking up category:", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    lookupAndRedirect();
  }, [categoryId, navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryRedirect;