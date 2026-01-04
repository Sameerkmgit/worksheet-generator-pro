import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ClipboardCheck, BookOpen, FileText, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assignmentTypes = [
  {
    id: "weekly-tests",
    title: "Weekly Tests",
    description: "Short assessments to track weekly progress and understanding",
    icon: Calendar,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  },
  {
    id: "monthly-tests",
    title: "Monthly Tests",
    description: "Comprehensive tests covering the month's topics and concepts",
    icon: ClipboardCheck,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
  },
  {
    id: "revision-worksheets",
    title: "Revision Worksheets",
    description: "Review and practice key concepts before exams",
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  },
  {
    id: "homework-sheets",
    title: "Homework Sheets",
    description: "Daily homework assignments for consistent practice",
    icon: FileText,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
  },
  {
    id: "quick-quizzes",
    title: "Quick Quizzes",
    description: "Fast 5-10 minute knowledge checks and pop quizzes",
    icon: Zap,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  }
];

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const AssignmentsLanding = () => {
  const { grade } = useParams();
  const gradeTitle = gradeTitles[grade || ""] || "Grade";
  const pageTitle = `${gradeTitle} Assignments`;
  const pageDescription = `Practice tests, quizzes, and homework sheets for ${gradeTitle}. Download free printable assignments to reinforce learning and track progress.`;
  const pageUrl = `https://www.wizkidshub.com/assignments/${grade}`;
  const gradeUrl = `https://www.wizkidshub.com/categories/${grade}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "WizKidsHub Worksheets",
      "url": "https://www.wizkidshub.com"
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
        "item": "https://www.wizkidshub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": gradeTitle,
        "item": gradeUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Assignments",
        "item": pageUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} - Practice Tests & Quizzes | WizKidsHub Worksheets</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:title" content={`${pageTitle} - Practice Tests & Quizzes`} />
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
          <Link to={`/categories/${grade}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" />
              Back to {gradeTitle}
            </Button>
          </Link>

          {/* Hero Section with Orange/Amber Theme */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 mb-6">
              <ClipboardCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
              {gradeTitle} Assignments
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Practice tests, quizzes, and homework sheets to reinforce learning and track progress throughout the year
            </p>
          </div>

          {/* Ad Placement */}
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border mb-12">
            {/* Google AdSense - Assignments Header - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>

          {/* Assignment Types Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Choose Assignment Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignmentTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card 
                    key={type.id} 
                    className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800"
                  >
                    <CardHeader className="pb-4">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${type.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl font-heading group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {type.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <Link to={`/worksheets?grade=${grade?.replace('grade-', '')}&subject=assignments`}>
                        <Button 
                          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                        >
                          Browse {type.title}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border mt-12">
            {/* Google AdSense - Assignments Footer - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg p-8 border border-orange-200 dark:border-orange-800">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">Why Use Our Assignments?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">✓</span>
                <span>Aligned with curriculum standards for {gradeTitle}</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">✓</span>
                <span>Perfect for tracking progress and identifying areas for improvement</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">✓</span>
                <span>Free to download and print for home or classroom use</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">✓</span>
                <span>Comprehensive coverage of Math, English, and Science topics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssignmentsLanding;