import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWorksheetCategoriesByGradeAndSubject, WorksheetCategoryData } from "@/lib/worksheetStorage";
import { useState, useEffect } from "react";

const subjectTitles: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  "computer-science": "Computer Science",
  computer: "Computer Science",
  assignments: "Assignments",
};

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const Category = () => {
  const { grade, subject } = useParams();
  const [categories, setCategories] = useState<WorksheetCategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // Normalize grade from URL slug to DB format
  const normalizeGrade = (gradeSlug: string): string => {
    const gradeMap: Record<string, string> = {
      'grade-1': 'Grade 1',
      'grade-2': 'Grade 2',
      'grade-3': 'Grade 3',
      'grade-4': 'Grade 4',
      'grade-5': 'Grade 5',
    };
    return gradeMap[gradeSlug] || gradeSlug;
  };

  // Normalize subject from URL slug to DB format
  const normalizeSubject = (subjectSlug: string): string => {
    const subjectMap: Record<string, string> = {
      'math': 'Math',
      'english': 'English',
      'science': 'Science',
      'computer-science': 'Computer Science',
      'assignments': 'Assignments',
    };
    return subjectMap[subjectSlug] || subjectSlug;
  };

  useEffect(() => {
    // Reset state and start loading when route params change
    setCategories([]);
    setLoading(true);
    
    const loadCategories = async () => {
      try {
        const gradeKey = normalizeGrade(grade || "");
        const subjectKey = normalizeSubject(subject || "");
        console.log(`Loading categories for grade="${gradeKey}", subject="${subjectKey}"`);
        const fetchedCategories = await getWorksheetCategoriesByGradeAndSubject(gradeKey, subjectKey);
        console.log(`Loaded ${fetchedCategories.length} categories`);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [grade, subject]);
  
  const gradeTitle = gradeTitles[grade || ""] || "Grade";
  const subjectTitle = subjectTitles[subject || ""] || "Worksheets";
  const pageTitle = `${gradeTitle} ${subjectTitle}`;
  
  const pageDescription = `Free printable ${pageTitle.toLowerCase()} worksheets. Download and print for classroom or home learning.`;

  const pageUrl = `https://smartkidsworksheets.com/category/${grade}/${subject}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "SmartKids Worksheets",
      "url": "https://smartkidsworksheets.com"
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
        "item": "https://smartkidsworksheets.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": gradeTitle,
        "item": `https://smartkidsworksheets.com/category/${grade}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": subjectTitle,
        "item": pageUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} Worksheets - Free Printable PDFs | SmartKids Worksheets</title>
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
              {/* Google AdSense code will go here - GA-XXXXX */}
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <Link 
              to={`/category/${grade}`}
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {gradeTitle}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {pageTitle} Worksheets
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
                  No categories available for this subject yet. Check back soon!
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FolderOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    {category.description && (
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full">
                      <Link to={`/category/${category.id}`}>
                        View Worksheets
                      </Link>
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
              {/* Google AdSense code will go here - GA-XXXXX */}
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
