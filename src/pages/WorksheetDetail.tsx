import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

// Mock data - in production this would come from your data source
const worksheetData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Addition Basics",
    category: "Math",
    grade: "Class 1-2",
    description: "Master the fundamentals of addition with this comprehensive worksheet. Perfect for young learners starting their math journey. Includes visual aids and step-by-step problems to build confidence.",
    preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800",
    pdfUrl: "#",
  },
  "2": {
    id: 2,
    title: "Multiplication Tables",
    category: "Math",
    grade: "Class 3-4",
    description: "Practice multiplication tables from 1 to 12. Designed to help students memorize and understand multiplication concepts through repetitive practice and engaging exercises.",
    preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800",
    pdfUrl: "#",
  },
};

const WorksheetDetail = () => {
  const { worksheetId } = useParams<{ worksheetId: string }>();
  const worksheet = worksheetData[worksheetId || ""] || worksheetData["1"];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl py-8 px-6">
        <Link to={`/category/${worksheet.category.toLowerCase()}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" />
            Back to {worksheet.category}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Preview */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={worksheet.preview} 
                  alt={worksheet.title}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
              {worksheet.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium border border-primary/20">
                {worksheet.category}
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium border border-accent/20">
                {worksheet.grade}
              </span>
            </div>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              {worksheet.description}
            </p>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full text-base h-14">
                <Download className="mr-2" />
                Download PDF
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline" className="h-12">
                  <Printer className="mr-2" />
                  Print
                </Button>
                <Button size="lg" variant="outline" className="h-12">
                  <Share2 className="mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">What's Included:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2 text-xl">✓</span>
                    High-quality printable PDF format
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 text-xl">✓</span>
                    Clear instructions and examples
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 text-xl">✓</span>
                    Age-appropriate content
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 text-xl">✓</span>
                    Answer key included
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-secondary mb-8">
          <p className="text-muted-foreground">Advertisement Space</p>
        </div>

        {/* Related Worksheets */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">Related Worksheets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 font-heading">Related Worksheet {i}</h3>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorksheetDetail;
