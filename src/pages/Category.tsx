import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWorksheetsByGradeAndSubject, getWorksheetImageOverride } from "@/lib/worksheetStorage";
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
  const [worksheets, setWorksheets] = useState<any[]>([]);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset worksheets when route changes to avoid showing stale data
    setWorksheets([]);
    setImageOverrides({});
    
    const loadWorksheets = async () => {
      const gradeKey = grade || "";
      const subjectKey = subject || "";
      const fetchedWorksheets = await getWorksheetsByGradeAndSubject(gradeKey, subjectKey);
      
      // Load image overrides for all worksheets
      const overrides: Record<string, string> = {};
      for (const worksheet of fetchedWorksheets) {
        const override = await getWorksheetImageOverride(worksheet.id.toString());
        if (override) {
          overrides[worksheet.id.toString()] = override;
        }
      }
      setImageOverrides(overrides);
      setWorksheets(fetchedWorksheets);
    };
    loadWorksheets();
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

        {/* Worksheets Grid */}
        <section className="py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {worksheets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No worksheets available for this category yet. Check back soon!
                </p>
              </div>
            ) : (
              worksheets.map((worksheet) => {
                // Check if there's an override image for this worksheet
                const displayImage = imageOverrides[worksheet.id.toString()] || worksheet.imageUrl;
                
                return (
                  <Card key={worksheet.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={displayImage}
                          alt={worksheet.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-2 line-clamp-2">{worksheet.title}</CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {worksheet.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button asChild className="flex-1">
                        <Link to={`/worksheet/${worksheet.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={worksheet.pdfUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
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
