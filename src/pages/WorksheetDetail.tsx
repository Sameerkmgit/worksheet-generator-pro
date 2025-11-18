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
    heading: "Worksheet: 2-Digit Addition Practice (Class 3)",
    intro: "Ask your child to solve each 2-digit sum without a calculator. You can print this page or download the PDF version for offline use. Ideal for Class 3 students who need extra practice with 2-digit addition.",
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
    title: "Addition Worksheet 2 – Free 2-Digit & 3-Digit Addition PDF",
    category: "Math",
    grade: "Class 3",
    description: "Free Class 3 math worksheet for kids to practice 2-digit and 3-digit addition problems. Printable and classroom-friendly.",
    preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800",
    pdfUrl: "/pdfs/Math_Addition_2.pdf",
    imageUrl: "/images/Math_Addition_2.jpg",
    heading: "Class 3 Math – Addition Worksheet 2",
    intro: "Practice adding 2-digit and 3-digit numbers. This worksheet is perfect for quick revision, classroom practice, or homework.",
    questions: [
      "1) 13 + 44 = ______",
      "2) 28 + 39 = ______",
      "3) 50 + 27 = ______",
      "4) 19 + 16 = ______",
      "5) 77 + 12 = ______",
    ],
    relatedWorksheets: [
      { title: "Addition Worksheet 1", url: "/worksheet/1" },
      { title: "Subtraction Worksheet 1", url: "/worksheet/3" },
      { title: "Word Problems Worksheet", url: "/worksheet/4" },
    ],
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

          {/* Heading & intro */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            {worksheet.heading || worksheet.title}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {worksheet.intro || worksheet.description}
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2.4fr_1fr] gap-8 items-start">
            {/* LEFT: main worksheet content */}
            <article className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-4">
                    Practice Questions
                  </h2>

                  <ol className="list-decimal pl-6 space-y-3 mb-6">
                    <li className="text-base">23 + 14 = ______</li>
                    <li className="text-base">56 + 22 = ______</li>
                    <li className="text-base">12 + 19 = ______</li>
                    <li className="text-base">40 + 35 = ______</li>
                    <li className="text-base">67 + 11 = ______</li>
                  </ol>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <Button asChild size="lg" className="rounded-full">
                      <a href={worksheet.pdfUrl} target="_blank" rel="noopener">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full">
                      <a href={worksheet.imageUrl} target="_blank" rel="noopener">
                        <FileImage className="mr-2 h-4 w-4" />
                        View as Image
                      </a>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Tip: Print this worksheet on A4 paper for the best classroom or home-learning experience.
                    Students can solve directly on the sheet or copy the sums into their notebooks.
                  </p>
                </CardContent>
              </Card>

              {/* Skills & usage */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-3">
                    Skills covered in this worksheet
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 mb-6 text-muted-foreground">
                    <li>Adding two 2-digit numbers without regrouping in most sums</li>
                    <li>Building confidence with vertical and horizontal addition</li>
                    <li>Improving number sense and mental math strategies</li>
                    <li>Preparation for Class 3 math tests and school exams</li>
                  </ul>

                  <h2 className="text-xl font-semibold font-heading mb-3">
                    How parents and teachers can use this worksheet
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Use as a quick daily practice sheet before or after a lesson.</li>
                    <li>Send home as a homework assignment or revision sheet.</li>
                    <li>Time your child to gently build speed once they are comfortable with each type of sum.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-5">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        What age group is this addition worksheet for?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This worksheet is designed for Class 3 students (around 7–9 years old),
                        but it can also be used for any child who is learning 2-digit addition.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        Can I print and share this worksheet?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Yes. You may print this worksheet for classroom use or home practice.
                        It can be shared with parents, teachers, and tutors as part of non-commercial
                        educational use.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        How often should my child practice addition?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Short, regular practice works best. Even 10–15 minutes of focused addition
                        practice a few times a week can significantly improve accuracy and confidence.
                      </p>
                    </div>
                  </div>

                  {/* SEO text block */}
                  <p className="text-sm text-muted-foreground leading-relaxed mt-6 pt-6 border-t">
                    This Class 3 math worksheet helps children master 2-digit addition by providing
                    carefully chosen sums that build number fluency and accuracy. Parents can use this
                    printable worksheet as part of a home-learning routine, while teachers can include it
                    in their lesson plans, math centers, or test revision packs. Download the free PDF,
                    print it, and let your child solve the sums independently or with guided support.
                  </p>
                </CardContent>
              </Card>
            </article>

            {/* RIGHT: sidebar */}
            <aside className="space-y-5">
              <Card>
                <CardContent className="p-5">
                  <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground mb-5">
                    Advertisement Space
                  </div>

                  <h2 className="text-lg font-semibold font-heading mb-3">
                    More Class 3 Math Worksheets
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {worksheet.relatedWorksheets.map((related: any, index: number) => (
                      <li key={index}>
                        <Link to={related.url} className="text-primary hover:underline">
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorksheetDetail;
