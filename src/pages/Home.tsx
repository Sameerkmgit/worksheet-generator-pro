import { Search, BookOpen, Palette, Calculator, Globe, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { id: "math", title: "Math", icon: Calculator, color: "from-primary to-primary-dark", worksheets: 145 },
  { id: "english", title: "English", icon: BookOpen, color: "from-purple-500 to-purple-600", worksheets: 128 },
  { id: "science", title: "Science", icon: Globe, color: "from-green-500 to-green-600", worksheets: 98 },
  { id: "word-search", title: "Word Search", icon: FileText, color: "from-orange-500 to-orange-600", worksheets: 76 },
  { id: "coloring", title: "Coloring Pages", icon: Palette, color: "from-pink-500 to-pink-600", worksheets: 164 },
  { id: "class-1", title: "Class 1", icon: Star, color: "from-teal-500 to-teal-600", worksheets: 89 },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-[1140px] relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-heading">
              SmartKidsWorksheets
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-8 animate-fade-in">
              Free Educational Worksheets for Every Young Learner
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="flex gap-3 bg-white p-3 rounded-lg shadow-card">
                <Input 
                  type="search" 
                  placeholder="Search worksheets by topic, grade, or subject..." 
                  className="border border-border bg-white text-foreground placeholder:text-muted-foreground h-12 text-base focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                />
                <Button size="lg" className="h-12 px-8 text-base">
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">
              Explore our collection of high-quality educational worksheets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link to={`/category/${category.id}`} key={category.id}>
                <Card className="cursor-pointer group h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-white" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-6 bg-secondary/10">
        <div className="container mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">Why Choose SmartKidsWorksheets?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <FileText className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">100% Free</h3>
              <p className="text-muted-foreground">
                All worksheets are completely free to download and print
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <Star className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">High Quality</h3>
              <p className="text-muted-foreground">
                Professionally designed and educationally sound content
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <BookOpen className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Regular Updates</h3>
              <p className="text-muted-foreground">
                New worksheets added weekly across all subjects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placement Area */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-[1140px]">
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
