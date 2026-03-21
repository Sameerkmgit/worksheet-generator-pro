import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FolderOpen, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import {
  getWorksheetsBySubcategoryId,
  getSubcategoryById,
  getWorksheetCategoryById,
  getWorksheetCardImage,
  WorksheetData,
  SubcategoryData,
  WorksheetCategoryData,
} from "@/lib/worksheetStorage";
import { toTitleCase, cleanDisplayTitle, toSubjectSlug, toWorksheetUrl } from "@/lib/utils";

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

interface RelatedTopic {
  id: string;
  title: string;
  worksheetCount: number;
  image_url?: string | null;
}

const SubcategoryWorksheets = () => {
  const { subcategoryId } = useParams();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [subcategory, setSubcategory] = useState<SubcategoryData | null>(null);
  const [category, setCategory] = useState<WorksheetCategoryData | null>(null);
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWorksheets([]);
    setSubcategory(null);
    setCategory(null);
    setRelatedTopics([]);
    setLoading(true);

    const loadData = async () => {
      try {
        if (!subcategoryId) return;

        const subcatData = await getSubcategoryById(subcategoryId);
        setSubcategory(subcatData);

        if (subcatData?.categoryId) {
          const categoryData = await getWorksheetCategoryById(subcatData.categoryId);
          setCategory(categoryData);

          // Fetch related topics (other subcategories in same category)
          const { data: relatedData, error: relatedError } = await supabase
            .from("worksheet_subcategories")
            .select("id, title, image_url")
            .eq("category_id", subcatData.categoryId)
            .eq("is_archived", false)
            .neq("id", subcategoryId)
            .order("sort_order", { ascending: true })
            .limit(10);

          if (!relatedError && relatedData) {
            // Get worksheet counts for each related topic
            const relatedWithCounts = await Promise.all(
              relatedData.map(async (topic) => {
                const { count } = await supabase
                  .from("worksheets")
                  .select("*", { count: "exact", head: true })
                  .eq("subcategory_id", topic.id)
                  .eq("is_archived", false);
                
                return {
                  id: topic.id,
                  title: topic.title,
                  worksheetCount: count || 0,
                  image_url: topic.image_url,
                };
              })
            );
            
            // Sort by worksheet count and take top 6
            const sortedRelated = relatedWithCounts
              .filter(t => t.worksheetCount > 0)
              .sort((a, b) => b.worksheetCount - a.worksheetCount)
              .slice(0, 6);
            
            setRelatedTopics(sortedRelated);
          }
        }

        const worksheetsData = await getWorksheetsBySubcategoryId(subcategoryId);
        setWorksheets(worksheetsData || []);
      } catch (error) {
        console.error("Error loading subcategory worksheets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subcategoryId]);

  const gradeSlug = category?.grade ? `grade-${category.grade}` : "";
  const subjectSlug = category?.subject ? toSubjectSlug(category.subject) : "";
  const pageTitle = toTitleCase(subcategory?.title) || "Worksheets";
  const pageDescription = `Browse ${pageTitle} worksheets for ${toTitleCase(category?.subject) || "this subject"}.`;
  const pageUrl = `https://www.wizkidshub.com/subcategory/${subcategoryId}`;

  // Breadcrumb items for Subcategory Worksheets page
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `Grade ${category?.grade}`, href: `/categories/${gradeSlug}` },
    { label: toTitleCase(category?.title) || "Category", href: `/categories/${gradeSlug}/${subjectSlug}` },
    { label: pageTitle }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle} Worksheets | WizKidsHub</title>
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
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {worksheets.length} worksheet{worksheets.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </section>

        {/* Worksheets Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground text-lg">Loading worksheets...</p>
                </div>
              </div>
            ) : worksheets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No worksheets available in this topic yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worksheets.map((worksheet) => (
                  <Card key={worksheet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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

        {/* Related Topics Section */}
        {relatedTopics.length > 0 && (
          <section className="py-12 px-4 bg-secondary/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
                Related Topics in {toTitleCase(category?.title)}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedTopics.map((topic) => (
                  <Link key={topic.id} to={`/subcategory/${topic.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 group overflow-hidden">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        {topic.image_url ? (
                          <img
                            src={topic.image_url}
                            alt={`${toTitleCase(topic.title)} worksheets`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen className="w-8 h-8 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {toTitleCase(topic.title)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {topic.worksheetCount} worksheet{topic.worksheetCount !== 1 ? "s" : ""}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryWorksheets;
