import { useState, useEffect } from "react";
import { Search, BookOpen, Palette, Calculator, Globe, FileText, Star, GraduationCap, BookA, Microscope, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWorksheetCountsByGrade } from "@/lib/getWorksheetCounts";

const baseCategories = [
  { id: "grade-1", title: "Grade 1", dbGrade: "1", icon: GraduationCap, color: "from-blue-400 to-blue-500" },
  { id: "grade-2", title: "Grade 2", dbGrade: "2", icon: GraduationCap, color: "from-blue-500 to-blue-600" },
  { id: "grade-3", title: "Grade 3", dbGrade: "3", icon: GraduationCap, color: "from-indigo-400 to-indigo-500" },
  { id: "grade-4", title: "Grade 4", dbGrade: "4", icon: GraduationCap, color: "from-indigo-500 to-indigo-600" },
  { id: "grade-5", title: "Grade 5", dbGrade: "5", icon: GraduationCap, color: "from-purple-400 to-purple-500" },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(baseCategories.map(cat => ({ ...cat, worksheets: 0 })));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorksheetCounts = async () => {
      setIsLoading(true);
      const counts = await getWorksheetCountsByGrade();
      
      const updatedCategories = baseCategories.map(cat => ({
        ...cat,
        worksheets: counts[cat.dbGrade] || 0
      }));
      
      setCategories(updatedCategories);
      setIsLoading(false);
    };
    
    loadWorksheetCounts();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "WizKidsHub Worksheets",
    "description": "Free printable educational worksheets for Grades 1-5. Math, English, Science worksheets aligned with CBSE curriculum.",
    "url": "https://wizkidshubworksheets.com",
    "logo": "https://wizkidshubworksheets.com/logo.png",
    "sameAs": [
      "https://facebook.com/wizkidshubworksheets",
      "https://twitter.com/wizkidshubworksheets"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
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
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Printable Worksheets for Grades 1–5 | WizKidsHub Worksheets</title>
        <meta name="description" content="Download free printable Math, English, and Science worksheets for Grades 1 to 5. Trusted PDF worksheets for parents and teachers." />
        <link rel="canonical" href="https://wizkidshubworksheets.com/" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <Header />
      
      {/* Header Banner Ad - 728x90 (responsive) */}
      <section className="py-4 px-6 bg-background">
        <div className="container mx-auto max-w-[1140px] flex justify-center">
          <div className="bg-muted rounded-lg border border-dashed border-border flex items-center justify-center min-h-[90px] w-full max-w-[728px]">
            {/* Google AdSense - Header Banner 728x90 - Replace with your ad code */}
            <p className="text-muted-foreground text-sm">Advertisement</p>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-24 px-6 relative overflow-hidden" aria-label="Hero section with introduction to WizKidsHub Worksheets">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-[1140px] relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-heading">
              Free Printable Worksheets for Grades 1–5
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-10 animate-fade-in max-w-3xl mx-auto">
              Free printable educational worksheets for young learners. Math, English, Science, and more – all designed to make learning fun and effective.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-10">
              <Link to="/worksheets">
                <Button size="lg" className="h-14 px-10 text-base font-semibold">
                  Browse Worksheets
                </Button>
              </Link>
              <Link to="/packs">
                <Button size="lg" variant="accent" className="h-14 px-10 text-base font-semibold">
                  Download Free Pack
                </Button>
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="flex gap-3 bg-white p-3 rounded-lg shadow-card">
                <Input 
                  type="search" 
                  placeholder="Search by subject, grade, or topic..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="border border-border bg-white text-foreground placeholder:text-muted-foreground h-12 text-base focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                />
                <Button size="lg" className="h-12 px-8 text-base" onClick={handleSearch}>
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6" aria-labelledby="categories-heading">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-4xl font-bold text-foreground mb-4 font-heading">Explore by Category</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our comprehensive collection organized by class and subject
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <Skeleton className="w-16 h-16 rounded-lg mb-4" />
                    <Skeleton className="h-8 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-5 w-40" />
                  </CardContent>
                </Card>
              ))
            ) : (
              categories.map((category) => (
                <Link to={`/categories/${category.id}`} key={category.id}>
                  <Card className="cursor-pointer group h-full">
                    <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`} role="img" aria-label={`${category.title} category icon`}>
                    <category.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors font-heading">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base">
                        {category.worksheets} worksheets available
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-6 bg-secondary/10" aria-labelledby="features-heading">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-4xl font-bold text-foreground mb-4 font-heading">Why WizKidsHub Worksheets?</h2>
            <p className="text-lg text-muted-foreground">Trusted by thousands of parents and teachers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" role="img" aria-label="Free worksheets icon">
                <FileText className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">100% Free</h3>
              <p className="text-muted-foreground">
                All worksheets are completely free to download and print. No hidden costs or subscriptions.
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" role="img" aria-label="High quality icon">
                <Star className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">High Quality</h3>
              <p className="text-muted-foreground">
                Professionally designed and educationally sound content created by experienced educators.
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" role="img" aria-label="Curriculum aligned icon">
                <BookOpen className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Curriculum Aligned</h3>
              <p className="text-muted-foreground">
                All worksheets are aligned with standard curriculum for Classes 1–5, ensuring relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page Ad - Between Sections (responsive) */}
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

export default Home;