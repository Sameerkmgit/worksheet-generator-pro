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
    title: "Addition Worksheet 1 – Free 2-Digit Addition PDF",
    category: "Math",
    grade: "Class 3",
    description: "Free Class 3 2-digit addition worksheet with 5 practice sums. Perfect for homework, revision, and mental math. Download the printable PDF or use online.",
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
        <title>{worksheet.grade} {worksheet.title} | SmartKids Worksheets</title>
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

          {/* Worksheet Hero */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">
              Worksheet: 2-Digit Addition Practice (Class 3)
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ask your child to solve each 2-digit sum without a calculator. 
              You can print this page or download the free PDF version for offline practice. 
              This worksheet is ideal for Class 3 students who need extra practice with 2-digit addition.
            </p>
          </section>

          {/* Worksheet Questions */}
          <section className="mb-6">
            <Card>
              <CardContent className="p-6">
                <ol className="space-y-4 text-base">
                  <li className="pb-3 border-b border-dashed border-border last:border-0">23 + 14 = ______</li>
                  <li className="pb-3 border-b border-dashed border-border last:border-0">56 + 22 = ______</li>
                  <li className="pb-3 border-b border-dashed border-border last:border-0">12 + 19 = ______</li>
                  <li className="pb-3 border-b border-dashed border-border last:border-0">40 + 35 = ______</li>
                  <li className="pb-3 border-b border-dashed border-border last:border-0">67 + 11 = ______</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Worksheet Actions */}
          <section className="flex flex-wrap gap-3 mb-8">
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
          </section>

          {/* Worksheet Details */}
          <section className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold font-heading mb-4 text-primary">
                  Skills covered in this worksheet
                </h2>
                <ul className="space-y-2 mb-6 text-muted-foreground list-disc list-inside">
                  <li>Adding two 2-digit numbers without regrouping in most sums</li>
                  <li>Building confidence with vertical and horizontal addition</li>
                  <li>Improving speed and accuracy with mental math</li>
                  <li>Preparing for Class 3 math tests and school exams</li>
                </ul>

                <h2 className="text-xl font-semibold font-heading mb-4 text-primary">
                  How parents and teachers can use this worksheet
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Use this worksheet as a quick daily practice sheet, homework assignment, or revision tool 
                  before a test. Encourage your child to say each sum aloud and check their answer. 
                  You can also time them to gently build speed once they are comfortable.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold font-heading mb-6 text-primary">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      What age group is this addition worksheet for?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      This worksheet is designed for Class 3 students (around 7–9 years old), 
                      but it can also be used for any child who is learning 2-digit addition.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      Can I print and share this worksheet?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Yes, you can print this worksheet for classroom or home use. 
                      Parents and teachers are free to use it for non-commercial educational purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      How often should my child practice addition?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Short, regular practice works best. Even 10–15 minutes of focused addition practice 
                      a few times a week can significantly boost confidence and accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorksheetDetail;
