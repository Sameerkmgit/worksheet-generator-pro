import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getWorksheetsByCategoryId,
  getWorksheetCategoryById,
  getWorksheetsByGradeAndSubject,
  getWorksheetCardImage,
  WorksheetData,
  WorksheetCategoryData,
} from "@/lib/worksheetStorage";

// 🔹 Helper: turn Google Drive links into embeddable preview links
const getPdfEmbedUrl = (pdfUrl: string): string => {
  if (!pdfUrl) return "";

  // Matches: https://drive.google.com/file/d/FILE_ID/view?usp=...
  const driveMatch = pdfUrl.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);

  if (driveMatch) {
    const fileId = driveMatch[1];
    // Use /preview for iframe embedding
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // Fallback – use the URL as-is for non-Drive links
  return pdfUrl;
};

const CategoryWorksheets = () => {
  const { categoryId, grade: gradeParam, subject: subjectParam } = useParams();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
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
    setCategory(null);
    setLoading(true);

    const loadData = async () => {
      try {
        const effectiveCategoryId = categoryId || "";
        if (!effectiveCategoryId) return;

        console.log(`Loading category: ${effectiveCategoryId}`);
        const categoryData = await getWorksheetCategoryById(effectiveCategoryId);
        setCategory(categoryData);

        // First try: worksheets directly tied to this category
        let worksheetsData = await getWorksheetsByCategoryId(effectiveCategoryId);
        console.log(`Loaded ${worksheetsData?.length || 0} worksheets by category_id`);

        // Fallback: if no direct matches, load by grade + subject
        if ((!worksheetsData || worksheetsData.length === 0) && categoryData) {
          const gradeSlug = categoryData.grade.toLowerCase().replace(/\s+/g, "-"); // "Grade 1" -> "grade-1"

          console.log(
            `No direct worksheets found, falling back to grade+subject: grade=${gradeSlug}, subject=${categoryData.subject}`,
          );

          worksheetsData = await getWorksheetsByGradeAndSubject(gradeSlug, categoryData.subject);
          console.log(`Loaded ${worksheetsData?.length || 0} worksheets by grade+subject fallback`);
        }

        setWorksheets(worksheetsData || []);
      } catch (error) {
        console.error("Error loading worksheets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, gradeParam, subjectParam]);

  const gradeSlug = category?.grade.toLowerCase().replace(" ", "-") || "";
  const subjectSlug = category ? subjectToSlug(category.subject) : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
              <Link to={`/category/${gradeSlug}`} className="hover:text-primary capitalize">
                {category?.grade}
              </Link>
              <span>/</span>
              <Link to={`/categories/${gradeSlug}/${subjectSlug}`} className="hover:text-primary capitalize">
                {category?.subject}
              </Link>
              <span>/</span>
              <span className="text-foreground">{category?.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{category?.title}</h1>
            {category?.description && <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>}
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
                  No worksheets available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worksheets.map((worksheet) => (
                  <Card key={worksheet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden bg-muted flex items-stretch">
                      <iframe src={worksheet.pdfUrl} title={worksheet.title} className="w-full h-full border-0" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{worksheet.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{worksheet.description}</p>
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
