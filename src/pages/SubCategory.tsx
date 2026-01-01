// src/pages/SubCategory.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FolderOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { getCategoriesByGrade, CategoryData } from "@/lib/worksheetStorage";

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const SubCategory = () => {
  const { grade } = useParams<{ grade: string }>();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const gradeSlug = grade || "grade-1";
  const gradeTitle = gradeTitles[gradeSlug] || "Grade";

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await getCategoriesByGrade(gradeSlug);
      setCategories(data);
      setLoading(false);
    };
    loadCategories();
  }, [gradeSlug]);

  const pageTitle = `${gradeTitle} Worksheets by Subject`;
  const pageDescription = `Browse ${gradeTitle.toLowerCase()} worksheets organized by subject – Math, English, Science, Computer Science and Assignments.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle} | WizKidsHub Worksheets</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              Home / {gradeTitle}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {gradeTitle} Worksheets
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Choose a subject to explore free printable {gradeTitle.toLowerCase()} worksheets.
            </p>
          </div>
        </section>

        {/* Subjects grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Select a Subject
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground text-lg">Loading subjects...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {category.imageUrl ? (
                      <div className="aspect-[16/9] overflow-hidden bg-muted">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <FolderOpen className="h-16 w-16 text-primary/30" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <Link
                        to={`/categories/${gradeSlug}/${category.subject}`}
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        View {category.name} worksheets
                      </Link>
                    </div>
                  </div>
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

export default SubCategory;