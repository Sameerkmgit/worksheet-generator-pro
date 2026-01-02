import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getWorksheetById, getWorksheetImageOverride, getWorksheetCategoryById, getSubcategoryById } from "@/lib/worksheetStorage";
import { toTitleCase } from "@/lib/utils";

const WorksheetDetail = () => {
  const { worksheetId } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubcategory] = useState<any>(null);

  useEffect(() => {
    const loadWorksheet = async () => {
      if (!worksheetId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getWorksheetById(worksheetId);
        
        if (!data) {
          setLoading(false);
          return;
        }

        setWorksheet(data);

        // Load category for breadcrumbs
        if (data.categoryId) {
          const categoryData = await getWorksheetCategoryById(data.categoryId);
          setCategory(categoryData);
        }
        
        // Note: subcategory lookup would require additional DB query
        // For now, we skip subcategory breadcrumb if not available from category context

        // Check for image override
        const override = await getWorksheetImageOverride(worksheetId);
        setImageUrl(override || data.imageUrl || "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800");
      } catch (error) {
        console.error("Error loading worksheet:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorksheet();
  }, [worksheetId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading worksheet...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!worksheet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Worksheet Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The worksheet you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate(-1)} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${toTitleCase(worksheet.title)} - Free Printable PDF`;
  const pageDescription = toTitleCase(worksheet.description) || `Download free Grade ${worksheet.grade} ${toTitleCase(worksheet.subject)} worksheet: ${toTitleCase(worksheet.title)}. Perfect for classroom and home learning.`;
  const pageUrl = `https://wizkidshubworksheets.com/worksheet/${worksheetId}`;

  const gradeSlug = worksheet.grade ? `grade-${worksheet.grade}` : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": worksheet.title,
    "description": pageDescription,
    "educationalLevel": worksheet.grade,
    "learningResourceType": "Worksheet",
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "WizKidsHub Worksheets",
      "url": "https://wizkidshubworksheets.com"
    }
  };

  // Build dynamic breadcrumb items
  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Home", href: "/" },
    { label: `Grade ${worksheet.grade}`, href: `/categories/${gradeSlug}` },
  ];
  
  if (category) {
    breadcrumbItems.push({ 
      label: toTitleCase(category.title) || "Category", 
      href: `/category/${category.id}` 
    });
  }
  
  if (subcategory) {
    breadcrumbItems.push({ 
      label: toTitleCase(subcategory.title) || "Topic", 
      href: `/subcategory/${subcategory.id}` 
    });
  }
  
  breadcrumbItems.push({ label: toTitleCase(worksheet.title) });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} | WizKidsHub Worksheets</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Top Banner Ad */}
        <div className="w-full bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gray-200 h-24 flex items-center justify-center rounded">
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction Section */}
              {worksheet.intro && (
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {worksheet.intro}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Practice Questions Section */}
              {worksheet.content && (
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {worksheet.content}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Worksheet Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Grade {worksheet.grade}
                    </span>
                    <span className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full">
                      {toTitleCase(worksheet.subject)}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{toTitleCase(worksheet.title)}</h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {toTitleCase(worksheet.description)}
                  </p>

                  <Button size="lg" className="w-full md:w-auto" asChild>
                    <a href={worksheet.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* PDF Preview */}
              {worksheet.pdfUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Worksheet Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // Extract Google Drive file ID and create embed URL
                      const driveMatch = worksheet.pdfUrl.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
                      const fileId = driveMatch ? driveMatch[1] : null;
                      const embedUrl = fileId 
                        ? `https://drive.google.com/file/d/${fileId}/preview`
                        : worksheet.pdfUrl;
                      const viewUrl = fileId
                        ? `https://drive.google.com/file/d/${fileId}/view`
                        : worksheet.pdfUrl;
                      
                      return (
                        <>
                          <div className="w-full rounded-lg overflow-hidden border bg-muted">
                            <iframe
                              src={embedUrl}
                              className="w-full h-[600px] md:h-[800px]"
                              title={`${worksheet.title} Preview`}
                              allow="autoplay"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-3 text-center">
                            Can't see the preview?{" "}
                            <a 
                              href={viewUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary hover:underline"
                            >
                              Open in Google Drive
                            </a>
                          </p>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {/* Questions/Content Section */}
              {worksheet.questions && Array.isArray(worksheet.questions) && worksheet.questions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Worksheet Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {worksheet.questions.map((question: any, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {typeof question === 'string' ? question : question.question || question.text}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Skills Section */}
              {worksheet.skills && Array.isArray(worksheet.skills) && worksheet.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Developed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {worksheet.skills.map((skill: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-muted-foreground">{toTitleCase(skill)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Usage Section */}
              {worksheet.usage && (
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use This Worksheet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {worksheet.usage}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* FAQ Section */}
              {worksheet.faq && Array.isArray(worksheet.faq) && worksheet.faq.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {worksheet.faq.map((item: any, index: number) => (
                      <div key={index}>
                        <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Sidebar Ad */}
              <div className="sticky top-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
                      <span className="text-gray-500">Advertisement</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Ad */}
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

export default WorksheetDetail;