import { Search, BookOpen, Palette, Calculator, Globe, FileText, Star, GraduationCap, BookA, Microscope, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { id: "class-1", title: "Class 1", icon: GraduationCap, color: "from-blue-400 to-blue-500", worksheets: 89 },
  { id: "class-2", title: "Class 2", icon: GraduationCap, color: "from-blue-500 to-blue-600", worksheets: 95 },
  { id: "class-3", title: "Class 3", icon: GraduationCap, color: "from-indigo-400 to-indigo-500", worksheets: 102 },
  { id: "class-4", title: "Class 4", icon: GraduationCap, color: "from-indigo-500 to-indigo-600", worksheets: 108 },
  { id: "class-5", title: "Class 5", icon: GraduationCap, color: "from-purple-400 to-purple-500", worksheets: 115 },
  { id: "english", title: "English", icon: BookA, color: "from-green-400 to-green-500", worksheets: 128 },
  { id: "math", title: "Math", icon: Calculator, color: "from-primary to-primary-dark", worksheets: 145 },
  { id: "science", title: "Science", icon: Microscope, color: "from-teal-400 to-teal-500", worksheets: 98 },
  { id: "others", title: "Others", icon: Sparkles, color: "from-pink-400 to-pink-500", worksheets: 156 },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-[1140px] relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-heading">
              SmartKids Worksheets for Classes 1–5
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-10 animate-fade-in max-w-3xl mx-auto">
              Free printable educational worksheets for young learners. Math, English, Science, and more – all designed to make learning fun and effective.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-10">
              <Link to="/category/class-1">
                <Button size="lg" className="h-14 px-10 text-base font-semibold">
                  Browse Worksheets
                </Button>
              </Link>
              <Button size="lg" variant="accent" className="h-14 px-10 text-base font-semibold">
                Download Free Pack
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="flex gap-3 bg-white p-3 rounded-lg shadow-card">
                <Input 
                  type="search" 
                  placeholder="Search by subject, grade, or topic..." 
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
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">Explore by Category</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our comprehensive collection organized by class and subject
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">Why SmartKids Worksheets?</h2>
            <p className="text-lg text-muted-foreground">Trusted by thousands of parents and teachers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">100% Free</h3>
              <p className="text-muted-foreground">
                All worksheets are completely free to download and print. No hidden costs or subscriptions.
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">High Quality</h3>
              <p className="text-muted-foreground">
                Professionally designed and educationally sound content created by experienced educators.
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Curriculum Aligned</h3>
              <p className="text-muted-foreground">
                All worksheets are aligned with standard curriculum for Classes 1–5, ensuring relevance.
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
