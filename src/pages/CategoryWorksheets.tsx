import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FolderOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getWorksheetsByCategoryId,
  getWorksheetCategoryById,
  getSubcategoriesByCategoryId,
  getWorksheetCardImage,
  WorksheetData,
  WorksheetCategoryData,
  SubcategoryData,
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

const CategoryWorksheets = () => {
  const { categoryId } = useParams();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryData[]>([]);
  const [category, setCategory] = useState<WorksheetCategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Normalize subject from DB format to URL slug
  const subjectToSlug = (subject: string): string => {
    const slugMap: Record<string, string> = {
      Math: "math",
      English: "english",
      Science: "science",
      "Computer Science": "computer-science",
      Assignments: "assignments",
    };
    return slugMap[subject] || subject.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    setWorksheets([]);
    setSubcategories([]);
    setCategory(null);
    setLoading(true);

    const loadData = async () => {
      try {
        const effectiveCategoryId = categoryId || "";
        if (!effectiveCategoryId) return;

        const categoryData = await getWorksheetCategoryById(effectiveCategoryId);
        setCategory(categoryData);

        // Fetch subcategories first
        const subcatsData = await getSubcategoriesByCategoryId(effectiveCategoryId);
        setSubcategories(subcatsData);

        // Also fetch worksheets without subcategory for fallback display
        const worksheetsData = await getWorksheetsByCategoryId(effectiveCategoryId);
        setWorksheets(worksheetsData || []);
      } catch (error) {
        console.error("Error loading category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const gradeSlug = category?.grade ? `grade-${category.grade}` : "";
  const subjectSlug = category ? subjectToSlug(category.subject) : "";
  const hasSubcategories = subcategories.length > 0;

  const pageTitle = category?.title || "Worksheets";
  const pageDescription = `Browse ${category?.title} worksheets for Grade ${category?.grade}.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle} Worksheets | WizKidsHub</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link to={`/categories/${gradeSlug}`} className="hover:text-primary capitalize">
                Grade {category?.grade}
              </Link>
              <span>/</span>
              <span className="text-foreground">{toTitleCase(category?.title)}</span>
            </div>
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
              // Show subcategories (topics) first
              <>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  Topics in {toTitleCase(category?.title)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subcategories.map((subcat) => (
                    <Card
                      key={subcat.id}
                      className="hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <FolderOpen className="h-16 w-16 text-primary/40" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-heading font-semibold text-xl mb-2">
                          {toTitleCase(subcat.title)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          View all {toTitleCase(subcat.title)} worksheets
                        </p>
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

export default CategoryWorksheets;
