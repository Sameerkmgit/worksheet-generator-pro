import { useParams, Link } from "react-router-dom";
import { Download, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data - in production this would come from your data source
const worksheetData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Addition Basics Worksheet 1",
    category: "Math",
    grade: "Class 3",
    description: "Free printable 2-digit addition worksheet for Class 3 students. Perfect for school revision, homework, or extra practice at home.",
    preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800",
    pdfUrl: "/pdfs/Math_Addition_1.pdf",
    imageUrl: "/images/Math_Addition_1.jpg",
    questions: [
      "1) 23 + 14 = ______",
      "2) 56 + 22 = ______",
      "3) 12 + 19 = ______",
      "4) 40 + 35 = ______",
      "5) 67 + 11 = ______",
    ],
    relatedWorksheets: [
      { title: "Addition Worksheet 2", url: "/worksheet/2" },
      { title: "Subtraction Worksheet 1", url: "/worksheet/3" },
      { title: "Word Problems Worksheet", url: "/worksheet/4" },
    ],
  },
  "2": {
    id: 2,
    title: "Multiplication Tables",
    category: "Math",
    grade: "Class 3-4",
    description: "Practice multiplication tables from 1 to 12. Designed to help students memorize and understand multiplication concepts through repetitive practice and engaging exercises.",
    preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800",
    pdfUrl: "#",
    imageUrl: "#",
    questions: [],
    relatedWorksheets: [],
  },
};

const WorksheetDetail = () => {
  const { worksheetId } = useParams<{ worksheetId: string }>();
  const worksheet = worksheetData[worksheetId || ""] || worksheetData["1"];

  const pageUrl = `https://smartkidsworksheets.com/worksheet/${worksheetId}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": worksheet.title,
    "description": worksheet.description,
    "learningResourceType": "Worksheet",
    "educationalLevel": `Primary school, ${worksheet.grade}`,
    "inLanguage": "en",
    "about": [worksheet.category, worksheet.grade, "Worksheets"],
    "author": {
      "@type": "Organization",
      "name": "SmartKids Worksheets"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartKids Worksheets"
    },
    "keywords": [
      `${worksheet.grade} ${worksheet.category} worksheet`,
      "math worksheet for kids",
      "free printable worksheets",
      "SmartKids worksheets"
    ],
    "url": pageUrl
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{worksheet.title} | Free Printable | SmartKids Worksheets</title>
        <meta name="description" content={worksheet.description} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${worksheet.title} | Free Printable`} />
        <meta property="og:description" content={worksheet.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={worksheet.preview} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${worksheet.title} | Free Printable`} />
        <meta name="twitter:description" content={worksheet.description} />
        <meta name="twitter:image" content={worksheet.preview} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-6 px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${worksheet.category.toLowerCase()}`}>{worksheet.category} Worksheets</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{worksheet.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title & Meta */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-heading">
            {worksheet.grade} {worksheet.category} – {worksheet.title}
          </h1>
          <p className="text-muted-foreground mb-6">
            {worksheet.description}
          </p>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Worksheet Card */}
            <section className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-2">
                    Worksheet: 2-Digit Addition Practice
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ask your child to solve each 2-digit sum without a calculator. You can print this page or download the PDF version for offline use.
                  </p>

                  {worksheet.questions && worksheet.questions.length > 0 && (
                    <ol className="space-y-3 mb-6">
                      {worksheet.questions.map((question: string, index: number) => (
                        <li key={index} className="pb-3 border-b border-dashed border-border last:border-0">
                          {question}
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Download Section */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-3 mb-3">
                      <Button asChild size="lg" className="rounded-full">
                        <a href={worksheet.pdfUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="rounded-full">
                        <a href={worksheet.imageUrl} target="_blank" rel="noopener noreferrer">
                          <FileImage className="mr-2 h-4 w-4" />
                          View as Image
                        </a>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tip: Print this worksheet on A4 paper for the best classroom or home-learning experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold font-heading text-primary mb-3">
                    More {worksheet.grade} {worksheet.category} Worksheets
                  </h3>
                  {worksheet.relatedWorksheets && worksheet.relatedWorksheets.length > 0 ? (
                    <ul className="space-y-2">
                      {worksheet.relatedWorksheets.map((related: any, index: number) => (
                        <li key={index}>
                          <Link 
                            to={related.url} 
                            className="text-sm text-primary hover:underline"
                          >
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No related worksheets available.</p>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Extra SEO Text */}
          <section className="text-sm text-muted-foreground leading-relaxed">
            <p>
              This {worksheet.grade} {worksheet.category.toLowerCase()} worksheet is designed to help children build confidence with 2-digit addition problems.
              Regular practice with worksheets like this supports stronger number sense, mental math, and exam readiness. Parents and teachers
              can use it for homework, classwork, or timed tests. Download the free PDF, print it, and let your child solve the sums independently.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorksheetDetail;
