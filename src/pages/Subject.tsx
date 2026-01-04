import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FolderOpen, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import {
  getWorksheetsByCategoryId,
  getWorksheetCategoryById,
  getSubcategoriesByCategoryId,
  WorksheetData,
  WorksheetCategoryData,
} from "@/lib/worksheetStorage";
import { toTitleCase, cleanDisplayTitle, toSubjectSlug, fromSubjectSlug } from "@/lib/utils";

// Helper: turn Google Drive links into embeddable preview links
const getPdfEmbedUrl = (pdfUrl: string): string => {
  if (!pdfUrl) return "";
  const driveMatch = pdfUrl.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return pdfUrl;
};

interface TopicWithCount {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  worksheetCount: number;
  image_url?: string | null;
}

const Subject = () => {
  const { gradeSlug, subjectSlug } = useParams();
  const navigate = useNavigate();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [subcategories, setSubcategories] = useState<TopicWithCount[]>([]);
  const [category, setCategory] = useState<WorksheetCategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse grade number from slug (grade-2 -> 2)
  const gradeNumber = gradeSlug?.replace('grade-', '') || '';
  // Convert subject slug to search format
  const subjectSearch = fromSubjectSlug(subjectSlug);

  useEffect(() => {
    setWorksheets([]);
    setSubcategories([]);
    setCategory(null);
    setLoading(true);

    const loadData = async () => {
      try {
        if (!gradeNumber || !subjectSlug) return;

        // Find the category by grade and subject
        const { data: catData, error: catError } = await supabase
          .from("worksheet_categories")
          .select("*")
          .eq("grade", gradeNumber)
          .ilike("subject", subjectSearch)
          .maybeSingle();

        if (catError) {
          console.error("Error fetching category:", catError);
          return;
        }

        if (!catData) {
          // Category not found, redirect to grade page
          navigate(`/categories/${gradeSlug}`, { replace: true });
          return;
        }

        setCategory({
          id: catData.id,
          title: catData.title,
          subject: catData.subject,
          grade: catData.grade,
          description: catData.description || undefined,
          imageUrl: catData.image_url || undefined,
          createdAt: catData.created_at,
          updatedAt: catData.updated_at || undefined,
        });

        // Fetch subcategories with image_url
        const { data: subcatsRaw } = await supabase
          .from("worksheet_subcategories")
          .select("id, title, slug, category_id, image_url, sort_order")
          .eq("category_id", catData.id)
          .eq("is_archived", false)
          .order("sort_order", { ascending: true });
        
        // Get worksheet counts for each subcategory
        const subcatsWithCounts = await Promise.all(
          (subcatsRaw || []).map(async (subcat) => {
            const { count } = await supabase
              .from("worksheets")
              .select("*", { count: "exact", head: true })
              .eq("subcategory_id", subcat.id)
              .eq("is_archived", false);
            
            return {
              id: subcat.id,
              title: subcat.title,
              slug: subcat.slug,
              categoryId: subcat.category_id,
              image_url: subcat.image_url,
              worksheetCount: count || 0,
            };
          })
        );
        
        setSubcategories(subcatsWithCounts);

        // Also fetch worksheets without subcategory for fallback display
        const worksheetsData = await getWorksheetsByCategoryId(catData.id);
        setWorksheets(worksheetsData || []);
      } catch (error) {
        console.error("Error loading category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gradeNumber, subjectSlug, subjectSearch, gradeSlug, navigate]);

  const hasSubcategories = subcategories.length > 0;
  const gradeTitle = `Grade ${gradeNumber}`;

  const pageTitle = category?.title || `${toTitleCase(subjectSearch)} Worksheets`;
  const pageDescription = `Browse ${category?.title || toTitleCase(subjectSearch)} worksheets for ${gradeTitle}.`;
  const pageUrl = `https://www.wizkidshub.com/categories/${gradeSlug}/${subjectSlug}`;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${gradeTitle} Worksheets`, href: `/categories/${gradeSlug}` },
    { label: toTitleCase(category?.title) || toTitleCase(subjectSearch) }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle} | {gradeTitle} | WizKidsHub</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            {/* Visible Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {toTitleCase(category?.title)}
            </h1>
            {category?.description && (
              <p className="text-lg text-muted-foreground max-w-3xl">{toTitleCase(category.description)}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground text-lg">Loading...</p>
                </div>
              </div>
            ) : hasSubcategories ? (
              // Show subcategories (topics) with worksheet counts
              <>
                <h2 className="text-2xl font-semibold mb-6 text-foreground font-heading">
                  Topics in {toTitleCase(category?.title)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subcategories.map((subcat) => (
                    <Card
                      key={subcat.id}
                      className="hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        {subcat.image_url ? (
                          <img
                            src={subcat.image_url}
                            alt={`${toTitleCase(subcat.title)} worksheets for ${gradeTitle}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen className="h-16 w-16 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-heading font-semibold text-xl mb-2">
                          {toTitleCase(subcat.title)}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                          <FileText className="w-4 h-4" />
                          <span>{subcat.worksheetCount} worksheet{subcat.worksheetCount !== 1 ? "s" : ""}</span>
                        </div>
                        <Button asChild variant="default" className="w-full">
                          <Link to={`/subcategory/${subcat.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Worksheets
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : worksheets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No worksheets available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              // Fallback: show worksheets directly if no subcategories
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worksheets.map((worksheet) => (
                  <Card
                    key={worksheet.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted flex items-stretch">
                      <iframe
                        src={getPdfEmbedUrl(worksheet.pdfUrl)}
                        title={worksheet.title}
                        className="w-full h-full border-0"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                        {toTitleCase(cleanDisplayTitle(worksheet.title))}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {toTitleCase(cleanDisplayTitle(worksheet.description))}
                      </p>
                      <Button asChild variant="default" className="w-full">
                        <Link to={`/worksheet/${worksheet.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Subject;