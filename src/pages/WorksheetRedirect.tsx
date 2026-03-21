import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Handles legacy /worksheet/:numericId routes and redirects to
 * the new /worksheet/:slug URL format (301-style client redirect).
 */
const WorksheetRedirect = () => {
  const { worksheetId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      if (!worksheetId) {
        navigate("/", { replace: true });
        return;
      }

      // Check if this looks like a numeric ID (legacy URL)
      const isNumeric = /^\d+$/.test(worksheetId);
      if (!isNumeric) {
        // Already a slug — this shouldn't happen via this route, but handle gracefully
        navigate(`/worksheet/${worksheetId}`, { replace: true });
        return;
      }

      try {
        const { data } = await supabase
          .from("worksheets")
          .select("slug")
          .eq("id", worksheetId)
          .maybeSingle();

        if (data?.slug) {
          navigate(`/worksheet/${data.slug}`, { replace: true });
        } else {
          // No slug found — worksheet may not exist
          navigate("/", { replace: true });
        }
      } catch {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    redirect();
  }, [worksheetId, navigate]);

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

export default WorksheetRedirect;
