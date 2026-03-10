import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toTopicUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * 301-style redirect from legacy /subcategory/:uuid to readable
 * /categories/grade-:n/:subjectSlug/:topicSlug URLs.
 */
const SubcategoryRedirect = () => {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      if (!subcategoryId) {
        navigate("/", { replace: true });
        return;
      }

      try {
        // Look up subcategory → category to build the readable URL
        const { data: subcat } = await supabase
          .from("worksheet_subcategories")
          .select("slug, category_id")
          .eq("id", subcategoryId)
          .maybeSingle();

        if (!subcat) {
          navigate("/", { replace: true });
          return;
        }

        const { data: cat } = await supabase
          .from("worksheet_categories")
          .select("grade, subject")
          .eq("id", subcat.category_id)
          .maybeSingle();

        if (!cat) {
          navigate("/", { replace: true });
          return;
        }

        navigate(toTopicUrl(cat.grade, cat.subject, subcat.slug), { replace: true });
      } catch {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    redirect();
  }, [subcategoryId, navigate]);

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

export default SubcategoryRedirect;
