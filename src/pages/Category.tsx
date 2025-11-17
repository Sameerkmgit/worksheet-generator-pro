import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

// Mock data - in production this would come from your data source
const worksheets = {
  math: [
    { id: 1, title: "Addition Basics", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "math" },
    { id: 2, title: "Multiplication Tables", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "math" },
    { id: 3, title: "Geometry Shapes", preview: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400", category: "math" },
  ],
  english: [
    { id: 4, title: "Vocabulary Builder", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "english" },
    { id: 5, title: "Grammar Practice", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "english" },
    { id: 6, title: "Reading Comprehension", preview: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400", category: "english" },
  ],
  science: [
    { id: 7, title: "Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "science" },
    { id: 8, title: "Plant Life Cycle", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "science" },
    { id: 9, title: "Water Cycle", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "science" },
  ],
  "word-search": [
    { id: 10, title: "Animals Word Search", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "word-search" },
    { id: 11, title: "Colors Word Search", preview: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400", category: "word-search" },
  ],
  coloring: [
    { id: 12, title: "Butterfly Coloring", preview: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400", category: "coloring" },
    { id: 13, title: "Ocean Animals", preview: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", category: "coloring" },
  ],
  "class-1": [
    { id: 14, title: "Alphabet Tracing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "class-1" },
    { id: 15, title: "Number Recognition", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "class-1" },
  ],
};

const categoryTitles: Record<string, string> = {
  math: "Math Worksheets",
  english: "English Worksheets",
  science: "Science Worksheets",
  "word-search": "Word Search Puzzles",
  coloring: "Coloring Pages",
  "class-1": "Class 1 Worksheets",
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryWorksheets = worksheets[categoryId as keyof typeof worksheets] || [];
  const categoryTitle = categoryTitles[categoryId as string] || "Worksheets";

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl py-8 px-6">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">{categoryTitle}</h1>
          <p className="text-xl text-muted-foreground">
            Explore our collection of {categoryWorksheets.length} high-quality worksheets
          </p>
        </div>

        {/* AdSense Placement */}
        <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-secondary mb-8">
          <p className="text-muted-foreground">Advertisement Space</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWorksheets.map((worksheet) => (
            <Card key={worksheet.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={worksheet.preview} 
                    alt={worksheet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors font-heading">{worksheet.title}</CardTitle>
                <p className="text-muted-foreground">High-quality educational worksheet</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
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
  );
};

export default Category;
