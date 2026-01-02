import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getWorksheetsBySubcategoryId,
  getSubcategoryById,
  getWorksheetCategoryById,
  getWorksheetCardImage,
  WorksheetData,
  SubcategoryData,
  WorksheetCategoryData,
} from "@/lib/worksheetStorage";
import { toTitleCase } from "@/lib/utils";

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

const SubcategoryWorksheets = () => {
  const { subcategoryId } = useParams();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [subcategory, setSubcategory] = useState<SubcategoryData | null>(null);
  const [category, setCategory] = useState<WorksheetCategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWorksheets([]);
    setSubcategory(null);
    setCategory(null);
    setLoading(true);

    const loadData = async () => {
      try {
        if (!subcategoryId) return;

        const subcatData = await getSubcategoryById(subcategoryId);
        setSubcategory(subcatData);

        if (subcatData?.categoryId) {
          const categoryData = await getWorksheetCategoryById(subcatData.categoryId);
          setCategory(categoryData);
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
  const pageTitle = toTitleCase(subcategory?.title) || "Worksheets";
  const pageDescription = `Browse ${pageTitle} worksheets for ${toTitleCase(category?.subject) || "this subject"}.`;
  const pageUrl = `https://wizkidshubworksheets.com/subcategory/${subcategoryId}`;

  // Breadcrumb items for Subcategory Worksheets page
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `Grade ${category?.grade}`, href: `/categories/${gradeSlug}` },
    { label: toTitleCase(category?.title) || "Category", href: `/category/${category?.id}` },
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
                        {toTitleCase(worksheet.title)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {toTitleCase(worksheet.description)}
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

export default SubcategoryWorksheets;
