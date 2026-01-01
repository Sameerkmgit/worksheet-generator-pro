import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface WorksheetCategory {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description?: string | null;
  image_url?: string | null;
}

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const Category = () => {
  const { gradeSlug } = useParams();
  const [categories, setCategories] = useState<WorksheetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse grade number from slug (grade-1 -> 1)
  const gradeNumber = gradeSlug?.replace('grade-', '') || '';

  useEffect(() => {
    setCategories([]);
    setLoading(true);

    const loadCategories = async () => {
      try {
        console.log(`Loading categories for grade=${gradeNumber}`);

        const { data, error } = await supabase
          .from("worksheet_categories")
          .select("id,title,subject,grade,description,image_url,sort_order")
          .eq("grade", gradeNumber)
          .order("sort_order", { ascending: true })
          .order("title", { ascending: true });

        if (error) {
          console.error("Error fetching categories:", error);
          return;
        }

        console.log(`Loaded ${data?.length || 0} categories`);
        setCategories(data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gradeNumber) {
      loadCategories();
    } else {
      setLoading(false);
    }
  }, [gradeNumber]);
  
  const gradeTitle = gradeTitles[gradeSlug || ""] || `Grade ${gradeNumber}`;
  const pageTitle = `${gradeTitle} Worksheets`;
  
  const pageDescription = `Free printable ${gradeTitle.toLowerCase()} worksheets. Download and print for classroom or home learning.`;

  const pageUrl = `https://wizkidshubworksheets.com/categories/${gradeSlug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "WizKidsHub Worksheets",
      "url": "https://wizkidshubworksheets.com"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wizkidshubworksheets.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": gradeTitle,
        "item": pageUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} - Free Printable PDFs | WizKidsHub Worksheets</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <Header />
      
      <main className="flex-1">
        {/* Advertisement Section - Top Banner */}
        <div className="w-full bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gray-200 h-24 flex items-center justify-center rounded">
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <Link 
              to="/"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {pageDescription}
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground text-lg">Loading categories...</p>
                </div>
              </div>
            ) : categories.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No categories available for this grade yet. Check back soon!
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {category.image_url ? (
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={category.image_url}
                        alt={`${gradeTitle} ${category.subject} worksheets category image`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <FolderOpen className="h-14 w-14 text-primary/40" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FolderOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{category.subject}</CardDescription>
                    {category.description && (
                      <CardDescription className="text-sm mt-1">
                        {category.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full">
                      <Link to={`/category/${category.id}`}>View Worksheets</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Advertisement Section - Bottom Banner */}
        <div className="w-full bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gray-200 h-24 flex items-center justify-center rounded">
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;