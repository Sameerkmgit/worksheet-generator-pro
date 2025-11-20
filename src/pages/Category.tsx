import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Worksheet data organized by grade and subject
const worksheetsByGradeAndSubject: Record<string, Record<string, any[]>> = {
  "grade-1": {
    math: [
      { id: 3, title: "Introduction to Multiplication", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800", category: "Math", grade: "Grade 1" },
      { id: 16, title: "Simple Addition", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 1" },
      { id: 40, title: "Grade 1 Addition Practice - Numbers 1 to 10", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", category: "Math", grade: "Grade 1" },
    ],
    english: [
      { id: 20, title: "Alphabet Tracing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 14, title: "Letter Recognition", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 41, title: "Alphabet Writing Practice (Letters A to M)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 1" },
    ],
    science: [
      { id: 30, title: "Animal Habitats", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 1" },
    ],
    assignments: [
      { id: 31, title: "Grade 1 Practice Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 1" },
    ],
  },
  "grade-2": {
    math: [
      { id: 17, title: "Subtraction Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 2" },
      { id: 42, title: "Multiplication Tables (2 and 5)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 2" },
    ],
    english: [
      { id: 18, title: "Word Building", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 2" },
      { id: 19, title: "Sentence Formation", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
      { id: 43, title: "Nouns and Verbs", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
    ],
    science: [
      { id: 32, title: "Plants & Growth", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "Science", grade: "Grade 2" },
    ],
    assignments: [
      { id: 33, title: "Grade 2 Weekly Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 2" },
    ],
  },
  "grade-3": {
    math: [
      { id: 1, title: "Addition Worksheet 1", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 2, title: "Addition Worksheet 2", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 20, title: "Multiplication Tables", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 3" },
      { id: 44, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 3" },
    ],
    english: [
      { id: 21, title: "Grammar Basics", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 3" },
      { id: 45, title: "Reading Comprehension", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 3" },
    ],
    science: [
      { id: 22, title: "Plant Life", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "Science", grade: "Grade 3" },
    ],
    assignments: [
      { id: 34, title: "Grade 3 Practice Assignment", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
    ],
  },
  "grade-4": {
    math: [
      { id: 23, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 4" },
      { id: 46, title: "Introduction to Fractions", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 4" },
    ],
    english: [
      { id: 24, title: "Essay Writing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 4" },
    ],
    science: [
      { id: 25, title: "Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
      { id: 47, title: "Our Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
    ],
    assignments: [
      { id: 35, title: "Grade 4 Test Paper", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
    ],
  },
  "grade-5": {
    math: [
      { id: 26, title: "Fractions & Decimals", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
      { id: 48, title: "Decimals and Place Value", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
    ],
    english: [
      { id: 27, title: "Advanced Grammar", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 5" },
      { id: 49, title: "Essay Writing and Paragraph Structure", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 5" },
    ],
    science: [
      { id: 28, title: "Physics Basics", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 5" },
    ],
    assignments: [
      { id: 36, title: "Grade 5 Comprehensive Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
    ],
  },
};

const subjectTitles: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
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
  const categoryWorksheets = worksheetsByGradeAndSubject[grade || ""]?.[subject || ""] || [];
  
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
        
        <meta property="og:title" content={`${pageTitle} Worksheets - Free Printable PDFs`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <Header />
      <div className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-8 px-6">
          <Link to={`/category/${grade}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" />
              Back to {gradeTitle}
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">{pageTitle} Worksheets</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of {categoryWorksheets.length} high-quality worksheets
            </p>
          </div>

          {/* Category Page Header Ad (responsive) */}
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border mb-8">
            {/* Google AdSense - Category Header - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWorksheets.map((worksheet) => (
            <Card key={worksheet.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={worksheet.preview} 
                    alt={`${worksheet.title} worksheet preview - Free printable PDF for ${gradeTitle} ${subjectTitle}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors font-heading">{worksheet.title}</CardTitle>
                <p className="text-muted-foreground">High-quality educational worksheet</p>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Link to={`/worksheet/${worksheet.id}`} className="flex-1">
                  <Button className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button variant="accent">
                  <Download className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
