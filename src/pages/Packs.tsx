import { useState } from "react";
import { Download, Package, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface PackData {
  id: string;
  title: string;
  grade: number;
  description: string;
  worksheet_titles: string[];
  color: string;
}

const packs: PackData[] = [
  {
    id: "grade-1-pack",
    title: "Grade 1 Complete Pack",
    grade: 1,
    description: "10 essential worksheets for Grade 1 students covering Math, English, and Science",
    worksheet_titles: [
      "Introduction to Multiplication",
      "Simple Addition Practice",
      "Counting & Number Recognition",
      "Alphabet Tracing",
      "Letter Recognition",
      "Vowels & Consonants",
      "Parts of a Plant",
      "Animal Habitats",
      "Counting & Number Recognition",
      "Simple Subtraction"
    ],
    color: "from-blue-400 to-blue-500"
  },
  {
    id: "grade-2-pack",
    title: "Grade 2 Complete Pack",
    grade: 2,
    description: "10 essential worksheets for Grade 2 students covering Math, English, and Science",
    worksheet_titles: [
      "Multiplication Tables (2 and 5)",
      "2-Digit Addition",
      "Simple Subtraction Practice",
      "Nouns and Verbs",
      "Simple Sentences & Punctuation",
      "Reading Comprehension",
      "Parts of the Body",
      "Food Groups & Nutrition",
      "Water Cycle",
      "States of Matter"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "grade-3-pack",
    title: "Grade 3 Complete Pack",
    grade: 3,
    description: "10 essential worksheets for Grade 3 students covering Math, English, and Science",
    worksheet_titles: [
      "Division Practice",
      "Multiplication Word Problems",
      "Fractions Basics",
      "Reading Comprehension",
      "Adjectives & Adverbs",
      "Creative Story Writing",
      "Photosynthesis",
      "Solar System Basics",
      "Simple Machines",
      "Animal Classification"
    ],
    color: "from-indigo-400 to-indigo-500"
  },
  {
    id: "grade-4-pack",
    title: "Grade 4 Complete Pack",
    grade: 4,
    description: "10 essential worksheets for Grade 4 students covering Math, English, and Science",
    worksheet_titles: [
      "Introduction to Fractions",
      "Geometry - Angles & Shapes",
      "Long Division Practice",
      "Our Solar System",
      "Grammar - Complex Sentences",
      "Essay Planning & Structure",
      "Human Body Systems",
      "Force & Motion",
      "Electricity Basics",
      "Ecosystem & Food Chains"
    ],
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "grade-5-pack",
    title: "Grade 5 Complete Pack",
    grade: 5,
    description: "10 essential worksheets for Grade 5 students covering Math, English, and Science",
    worksheet_titles: [
      "Decimals and Place Value",
      "Percentage Calculations",
      "Area & Perimeter",
      "Essay Writing and Paragraph Structure",
      "Literary Devices",
      "Persuasive Writing",
      "Environmental Science",
      "Chemical Reactions Basics",
      "Energy Types & Conservation",
      "Weather & Climate"
    ],
    color: "from-purple-400 to-purple-500"
  }
];

const Packs = () => {
  const [selectedPack, setSelectedPack] = useState<PackData | null>(null);
  const { toast } = useToast();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Worksheet Packs | WizKidsHub Worksheets</title>
        <meta name="description" content="Download free worksheet packs for Grades 1-5. Each pack includes 10 carefully selected worksheets covering Math, English, and Science." />
        <link rel="canonical" href="https://wizkidshub.com/packs" />
      </Helmet>

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
              <Package className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 font-heading">Free Worksheet Packs</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download comprehensive worksheet packs for each grade. Each pack includes 10 carefully selected worksheets covering Math, English, and Science.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Curated Content</h3>
              <p className="text-muted-foreground text-sm">
                10 best worksheets per grade, carefully selected by educators
              </p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">All Subjects</h3>
              <p className="text-muted-foreground text-sm">
                Balanced mix of Math, English, and Science worksheets
              </p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">100% Free</h3>
              <p className="text-muted-foreground text-sm">
                No hidden costs, just quality educational content
              </p>
            </div>
          </div>

          {/* Packs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packs.map((pack) => {
              const titles = Array.isArray(pack.worksheet_titles) ? pack.worksheet_titles : [];
              
              return (
                <Card key={pack.id} className="overflow-hidden">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4`}>
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-heading">{pack.title}</CardTitle>
                    <p className="text-muted-foreground">{pack.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {titles.slice(0, 5).map((worksheet, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{worksheet}</span>
                        </li>
                      ))}
                      {titles.length > 5 && (
                        <li className="text-sm text-muted-foreground italic">
                          + {titles.length - 5} more worksheets
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button asChild className="flex-1">
                      <a href={`/downloads/grade-${pack.grade}-pack`}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Now
                      </a>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedPack(pack)}>
                          View All
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-heading">{pack.title}</DialogTitle>
                          <DialogDescription>{pack.description}</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                            All {titles.length} Worksheets:
                          </h4>
                          <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {titles.map((worksheet, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{worksheet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Packs;
