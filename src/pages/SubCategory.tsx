import { useParams, Link } from "react-router-dom";
import { Calculator, BookA, Microscope, ClipboardCheck, Languages, Monitor, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const subCategories = [
  { id: "math", title: "Math", icon: Calculator, color: "from-primary to-primary-dark", description: "Addition, subtraction, multiplication, and more" },
  { id: "english", title: "English", icon: BookA, color: "from-green-400 to-green-500", description: "Reading, writing, grammar, and vocabulary" },
  { id: "science", title: "Science", icon: Microscope, color: "from-teal-400 to-teal-500", description: "Explore nature, experiments, and discoveries" },
  { id: "computer", title: "Computer Science", icon: Monitor, color: "from-blue-400 to-blue-500", description: "Digital literacy and coding basics" },
  { id: "assignments", title: "Assignments", icon: ClipboardCheck, color: "from-orange-400 to-orange-500", description: "Practice assignments and tests" },
];

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const SubCategory = () => {
  const { grade } = useParams();
  const gradeTitle = gradeTitles[grade || ""] || "Grade";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${gradeTitle} Worksheets - All Subjects`,
    "description": `Browse all ${gradeTitle} worksheets by subject: Math, English, Science, Computer Science, and Assignments.`,
    "url": `https://smartkidsworksheets.com/category/${grade}`,
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
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{gradeTitle} Worksheets - Math, English, Science, Computer Science | SmartKids Worksheets</title>
        <meta name="description" content={`Free printable ${gradeTitle} worksheets. Browse by subject: Math, English, Science, Computer Science, and Assignments. Download and print for free.`} />
        <link rel="canonical" href={`https://smartkidsworksheets.com/category/${grade}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <Header />
      
      {/* Header Banner Ad */}
      <section className="py-4 px-6 bg-background">
        <div className="container mx-auto max-w-[1140px] flex justify-center">
          <div className="bg-muted rounded-lg border border-dashed border-border flex items-center justify-center min-h-[90px] w-full max-w-[728px]">
            {/* Google AdSense - Header Banner 728x90 - Replace with your ad code */}
            <p className="text-muted-foreground text-sm">Advertisement</p>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-[1140px] relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center font-heading">
            {gradeTitle} Worksheets
          </h1>
          <p className="text-xl text-blue-50 text-center max-w-2xl mx-auto">
            Choose a subject to explore free printable worksheets for {gradeTitle}
          </p>
        </div>
      </section>

      {/* Subcategories Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">Select a Subject</h2>
            <p className="text-lg text-muted-foreground">
              Browse {gradeTitle} worksheets organized by subject
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subCategories.map((category) => (
              <Link to={`/category/${grade}/${category.id}`} key={category.id}>
                <Card className="cursor-pointer group h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`} role="img" aria-label={`${category.title} icon`}>
                      <category.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors font-heading">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page Ad */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-[1140px]">
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border">
            {/* Google AdSense - Mid-Page Banner - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubCategory;
