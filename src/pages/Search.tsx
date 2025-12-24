import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Download, Filter } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWorksheetCardImage, WorksheetData } from "@/lib/worksheetStorage";

// Import all worksheet data from Category page structure
const allWorksheets = [
  // Grade 1
  { id: 3, title: "Introduction to Multiplication", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800", keywords: ["multiplication", "math", "multiply"] },
  { id: 40, title: "Grade 1 Addition Practice - Complete Worksheet", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", keywords: ["addition", "numbers", "practice", "math", "complete"] },
  { id: 50, title: "Counting & Number Recognition (1-20)", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", keywords: ["counting", "numbers", "recognition", "math"] },
  { id: 51, title: "Simple Subtraction (1-10)", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", keywords: ["subtraction", "minus", "math"] },
  { id: 52, title: "Shapes & Patterns", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", keywords: ["shapes", "patterns", "geometry", "math"] },
  { id: 53, title: "Comparing Numbers (Greater/Less Than)", category: "Math", grade: "1", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", keywords: ["comparing", "greater", "less", "numbers", "math"] },
  { id: 20, title: "Alphabet Tracing", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["alphabet", "tracing", "letters", "english", "writing"] },
  { id: 14, title: "Letter Recognition", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["letters", "recognition", "alphabet", "english"] },
  { id: 41, title: "Alphabet Writing Practice (Letters A to M)", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["alphabet", "writing", "letters", "english"] },
  { id: 55, title: "Vowels & Consonants", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["vowels", "consonants", "letters", "english"] },
  { id: 56, title: "CVC Words (Cat, Dog, Sun)", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["CVC", "words", "phonics", "reading", "english"] },
  { id: 57, title: "Rhyming Words", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["rhyming", "words", "phonics", "english"] },
  { id: 58, title: "Simple Sentences", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["sentences", "writing", "grammar", "english"] },
  { id: 59, title: "Sight Words (Dolch List)", category: "English", grade: "1", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["sight words", "dolch", "reading", "english"] },
  { id: 30, title: "Animal Habitats", category: "Science", grade: "1", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", keywords: ["animals", "habitats", "science", "nature"] },
  { id: 60, title: "Parts of a Plant", category: "Science", grade: "1", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", keywords: ["plants", "parts", "science", "nature"] },
  { id: 200, title: "Introduction to Computers - Digital Literacy Basics", category: "Computer Science", grade: "1", preview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400", keywords: ["computer", "digital", "literacy", "coding", "technology", "keyboard", "mouse", "safety"] },
  { id: 201, title: "Animal Identification & Learning", category: "Assignments", grade: "1", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", keywords: ["animals", "revision", "practice", "identification", "learning", "fun"] },
  
  // Grade 2
  { id: 42, title: "Multiplication Tables (2 and 5)", category: "Math", grade: "2", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=400", keywords: ["multiplication", "tables", "math", "times tables"] },
  { id: 70, title: "2-Digit Addition", category: "Math", grade: "2", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", keywords: ["addition", "math", "two digit"] },
  { id: 43, title: "Nouns and Verbs", category: "English", grade: "2", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["nouns", "verbs", "grammar", "english", "parts of speech"] },
  { id: 76, title: "Simple Sentences & Punctuation", category: "English", grade: "2", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", keywords: ["sentences", "punctuation", "english", "grammar"] },
  
  // Grade 3
  { id: 44, title: "Division Practice", category: "Math", grade: "3", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", keywords: ["division", "math", "divide"] },
  { id: 45, title: "Reading Comprehension", category: "English", grade: "3", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["reading", "comprehension", "english"] },
  
  // Grade 4
  { id: 46, title: "Introduction to Fractions", category: "Math", grade: "4", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=400", keywords: ["fractions", "math"] },
  { id: 47, title: "Our Solar System", category: "Science", grade: "4", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", keywords: ["solar system", "planets", "space", "science", "astronomy"] },
  
  // Grade 5
  { id: 48, title: "Decimals and Place Value", category: "Math", grade: "5", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=400", keywords: ["decimals", "place value", "math"] },
  { id: 49, title: "Essay Writing and Paragraph Structure", category: "English", grade: "5", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", keywords: ["essay", "writing", "paragraph", "english"] },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [gradeFilter, setGradeFilter] = useState(searchParams.get("grade") || "all");
  const [subjectFilter, setSubjectFilter] = useState(searchParams.get("subject") || "all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (gradeFilter !== "all") params.set("grade", gradeFilter);
    if (subjectFilter !== "all") params.set("subject", subjectFilter);
    setSearchParams(params);
  };

  const handleGradeChange = (value: string) => {
    setGradeFilter(value);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (value !== "all") params.set("grade", value);
    if (subjectFilter !== "all") params.set("subject", subjectFilter);
    setSearchParams(params);
  };

  const handleSubjectChange = (value: string) => {
    setSubjectFilter(value);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (gradeFilter !== "all") params.set("grade", gradeFilter);
    if (value !== "all") params.set("subject", value);
    setSearchParams(params);
  };

  const filteredWorksheets = allWorksheets.filter((worksheet) => {
    const query = searchParams.get("q")?.toLowerCase() || "";
    const grade = searchParams.get("grade") || "all";
    const subject = searchParams.get("subject") || "all";

    const matchesQuery = !query || 
      worksheet.title.toLowerCase().includes(query) ||
      worksheet.category.toLowerCase().includes(query) ||
      worksheet.keywords?.some(kw => kw.toLowerCase().includes(query));

    const matchesGrade = grade === "all" || worksheet.grade === grade;
    const matchesSubject = subject === "all" || worksheet.category.toLowerCase() === subject.toLowerCase();

    return matchesQuery && matchesGrade && matchesSubject;
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Search Worksheets | WizKidsHub Worksheets</title>
        <meta name="description" content="Search for educational worksheets by keyword, grade, and subject. Find the perfect printable worksheet for your child." />
        <link rel="canonical" href="https://wizkidshubworksheets.com/search" />
      </Helmet>

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">Search Worksheets</h1>
            <p className="text-lg text-muted-foreground">Find the perfect worksheet for your child</p>
          </div>

          {/* Search Bar */}
          <div className="bg-card p-6 rounded-lg shadow-card mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search by keyword (e.g., addition, alphabet, animals)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="h-12">
                <SearchIcon className="mr-2" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={gradeFilter} onValueChange={handleGradeChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={handleSubjectChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="assignments">Assignments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold font-heading">
              {filteredWorksheets.length} {filteredWorksheets.length === 1 ? "Worksheet" : "Worksheets"} Found
            </h2>
          </div>

          {filteredWorksheets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorksheets.map((worksheet) => (
                <Card key={worksheet.id} className="group cursor-pointer">
                  <CardHeader>
                    {(() => {
                      // Convert the old worksheet format to WorksheetData for the helper
                      const worksheetData: Partial<WorksheetData> = {
                        imageUrl: worksheet.preview || "",
                        subject: worksheet.category,
                        title: worksheet.title,
                        id: worksheet.id.toString(),
                      } as WorksheetData;
                      const imageSrc = getWorksheetCardImage(worksheetData as WorksheetData);
                      return (
                        <img
                          src={imageSrc}
                          alt={worksheet.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          onError={(e) => {
                            // if the custom URL fails, fall back once to the subject image
                            const target = e.currentTarget as HTMLImageElement;
                            const fallback = getWorksheetCardImage({ ...worksheetData, imageUrl: "" } as WorksheetData);
                            if (target.src !== fallback) {
                              target.src = fallback;
                            }
                          }}
                        />
                      );
                    })()}
                    <CardTitle className="text-xl group-hover:text-primary transition-colors font-heading">
                      {worksheet.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {worksheet.grade}
                      </span>
                      <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded">
                        {worksheet.category}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/worksheet/${worksheet.id}`} className="w-full">
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        View & Download
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No worksheets found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => {
                setSearchQuery("");
                setGradeFilter("all");
                setSubjectFilter("all");
                setSearchParams(new URLSearchParams());
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;