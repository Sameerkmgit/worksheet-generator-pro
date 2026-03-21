import { useState, useEffect } from "react";
import { Search, BookOpen, Palette, Calculator, Globe, FileText, Star, GraduationCap, BookA, Microscope, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import AdSense from "@/components/AdSense"; // Google AdSense component
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getWorksheetCountsByGrade } from "@/lib/getWorksheetCounts";
import InteractivePracticeBanner from "@/components/InteractivePracticeBanner";

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
    "url": "https://www.wizkidshub.com",
    "logo": "https://www.wizkidshub.com/logo.png",
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

  // Breadcrumb items for Home page
  const breadcrumbItems = [
    { label: "Home" }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Printable Worksheets for Grades 1–5 | WizKidsHub Worksheets</title>
        <meta name="description" content="Download free printable Math, English, and Science worksheets for Grades 1 to 5. Trusted PDF worksheets for parents and teachers." />
        <meta name="keywords" content="free printable worksheets, grade 1 worksheets, grade 2 worksheets, grade 3 worksheets, grade 4 worksheets, grade 5 worksheets, CBSE worksheets, math worksheets, english worksheets, science worksheets" />
        <link rel="canonical" href="https://www.wizkidshub.com/" />
        <meta property="og:title" content="Free Printable Worksheets for Grades 1–5 | WizKidsHub Worksheets" />
        <meta property="og:description" content="Download free printable Math, English, and Science worksheets for Grades 1 to 5. Trusted PDF worksheets for parents and teachers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wizkidshub.com/" />
        <meta property="og:image" content="https://www.wizkidshub.com/og-image.jpg" />
        <meta property="og:site_name" content="WizKidsHub Worksheets" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Printable Worksheets for Grades 1–5 | WizKidsHub Worksheets" />
        <meta name="twitter:description" content="Download free printable Math, English, and Science worksheets for Grades 1 to 5." />
        <meta name="twitter:image" content="https://www.wizkidshub.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Breadcrumbs JSON-LD injected via component */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />
      
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-24 px-6 relative overflow-hidden" aria-label="Hero section with introduction to WizKidsHub Worksheets">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-48 h-48 bg-accent rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" aria-hidden="true"></div>
        </div>
        
        <div className="container mx-auto max-w-[1140px] relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-heading">
              Free Printable Worksheets for Grades 1–5
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-50 mb-4 animate-fade-in max-w-3xl mx-auto font-medium">
              Printable Math, English, and Science Worksheets for Kids
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-10 animate-fade-in max-w-2xl mx-auto">
              Download free, printable worksheets by grade and subject. No sign-up required. Perfect for home and classroom use.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-10">
              <Button asChild size="lg" className="h-14 px-10 text-base font-semibold">
                <Link to="/worksheets" aria-label="Browse all free printable worksheets">
                  Browse Worksheets
                </Link>
              </Button>
              <Button asChild size="lg" variant="accent" className="h-14 px-10 text-base font-semibold">
                <Link to="/packs" aria-label="Download free worksheet packs">
                  Download Free Packs
                </Link>
              </Button>
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
                  aria-label="Search worksheets by subject, grade, or topic"
                />
                <Button size="lg" className="h-12 px-8 text-base" onClick={handleSearch} aria-label="Search worksheets">
                  <Search className="mr-2" aria-hidden="true" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 px-6 bg-card" aria-labelledby="mission-heading">
        <div className="container mx-auto max-w-[1140px] text-center">
          <h2 id="mission-heading" className="text-3xl font-bold text-foreground mb-4 font-heading">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            WizKidsHub exists to make quality education accessible to every child. We provide free, curriculum-aligned printable worksheets so that parents, teachers, and tutors never have to worry about finding — or paying for — grade-appropriate practice material. Every worksheet is educator-reviewed and ready to print.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto max-w-[1140px]">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-foreground mb-8 font-heading text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse", desc: "Choose a grade level and subject. Explore our library of 780+ free worksheets organized by topic and difficulty." },
              { step: "2", title: "Download", desc: "Click on any worksheet to see details, then download the PDF instantly. No sign-up or account needed." },
              { step: "3", title: "Print & Learn", desc: "Print the worksheet at home or in the classroom. Students complete it by hand for better retention and focus." },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground font-heading">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Practice Promotion */}
      <InteractivePracticeBanner variant="homepage" />

      {/* Ad below hero - only renders when AdSense fills the slot */}
      <AdSense adSlot="1234567890" adFormat="auto" className="w-full" />

      {/* Categories Section */}
      <section className="py-16 px-6" aria-labelledby="categories-heading">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-4xl font-bold text-foreground mb-4 font-heading">Explore by Category</h2>
            <p className="text-lg text-muted-foreground">
              Browse our collection of printable worksheets for kids, organized by grade level from Grade 1 to Grade 5
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
                <Link 
                  to={`/categories/${category.id}`} 
                  key={category.id}
                  aria-label={`View ${category.title} worksheets - ${category.worksheets} available`}
                >
                  <Card className="cursor-pointer group h-full">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`} aria-hidden="true">
                        <category.icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors font-heading">
                        {category.title} Worksheets
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base">
                        {category.worksheets} free printable worksheets
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* Internal Links for SEO */}
          <nav className="mt-8 text-center" aria-label="Quick links to grade worksheets">
            <p className="text-sm text-muted-foreground">
              <Link to="/categories/grade-1" className="hover:text-primary hover:underline">Grade 1 Worksheets</Link>
              <span className="mx-2">|</span>
              <Link to="/categories/grade-2" className="hover:text-primary hover:underline">Grade 2 Worksheets</Link>
              <span className="mx-2">|</span>
              <Link to="/categories/grade-3" className="hover:text-primary hover:underline">Grade 3 Worksheets</Link>
              <span className="mx-2">|</span>
              <Link to="/categories/grade-4" className="hover:text-primary hover:underline">Grade 4 Worksheets</Link>
              <span className="mx-2">|</span>
              <Link to="/categories/grade-5" className="hover:text-primary hover:underline">Grade 5 Worksheets</Link>
            </p>
          </nav>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-6 bg-secondary/10" aria-labelledby="features-heading">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-4xl font-bold text-foreground mb-4 font-heading">Why WizKidsHub Worksheets?</h2>
            <p className="text-lg text-muted-foreground">Trusted by thousands of parents and teachers for free printable worksheets for home and classroom use</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" aria-hidden="true">
                <FileText className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">100% Free Worksheets</h3>
              <p className="text-muted-foreground">
                All Math, English, and Science worksheets are completely free to download and print. No hidden costs or subscriptions.
              </p>
            </article>

            <article className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" aria-hidden="true">
                <Star className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">High Quality PDFs</h3>
              <p className="text-muted-foreground">
                Professionally designed printable worksheets for kids, created by experienced educators for effective learning.
              </p>
            </article>

            <article className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20" aria-hidden="true">
                <BookOpen className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Curriculum Aligned</h3>
              <p className="text-muted-foreground">
                All worksheets are aligned with standard curriculum for Grade 1 to Grade 5, ensuring educational relevance.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Mid-Page Ad */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-[1140px]">
          <AdSense adSlot="2345678901" adFormat="horizontal" className="w-full min-h-[90px]" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;