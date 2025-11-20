import { useState } from "react";
import { Download, Package, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const packs = [
  {
    id: "grade-1-pack",
    title: "Grade 1 Complete Pack",
    grade: "Grade 1",
    description: "10 essential worksheets for Grade 1 students covering Math, English, and Science",
    worksheets: [
      "Introduction to Multiplication",
      "Simple Addition Practice",
      "Counting & Number Recognition",
      "Alphabet Tracing",
      "Letter Recognition",
      "Vowels & Consonants",
      "Parts of a Plant",
      "Animal Habitats",
      "My Five Senses",
      "Living vs Non-Living Things"
    ],
    color: "from-blue-400 to-blue-500",
    downloadUrl: "#grade-1-pack"
  },
  {
    id: "grade-2-pack",
    title: "Grade 2 Complete Pack",
    grade: "Grade 2",
    description: "10 essential worksheets for Grade 2 students covering Math, English, and Science",
    worksheets: [
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
    color: "from-blue-500 to-blue-600",
    downloadUrl: "#grade-2-pack"
  },
  {
    id: "grade-3-pack",
    title: "Grade 3 Complete Pack",
    grade: "Grade 3",
    description: "10 essential worksheets for Grade 3 students covering Math, English, and Science",
    worksheets: [
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
    color: "from-indigo-400 to-indigo-500",
    downloadUrl: "#grade-3-pack"
  },
  {
    id: "grade-4-pack",
    title: "Grade 4 Complete Pack",
    grade: "Grade 4",
    description: "10 essential worksheets for Grade 4 students covering Math, English, and Science",
    worksheets: [
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
    color: "from-indigo-500 to-indigo-600",
    downloadUrl: "#grade-4-pack"
  },
  {
    id: "grade-5-pack",
    title: "Grade 5 Complete Pack",
    grade: "Grade 5",
    description: "10 essential worksheets for Grade 5 students covering Math, English, and Science",
    worksheets: [
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
    color: "from-purple-400 to-purple-500",
    downloadUrl: "#grade-5-pack"
  }
];

const Packs = () => {
  const [email, setEmail] = useState("");
  const [selectedPack, setSelectedPack] = useState<typeof packs[0] | null>(null);
  const { toast } = useToast();

  const handleDownload = (pack: typeof packs[0], withEmail: boolean = false) => {
    if (withEmail && email) {
      toast({
        title: "Download Started!",
        description: `${pack.title} is being downloaded. Check your email for a copy!`,
      });
      setEmail("");
      setSelectedPack(null);
    } else if (!withEmail) {
      toast({
        title: "Download Started!",
        description: `${pack.title} is being downloaded.`,
      });
      setSelectedPack(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Worksheet Packs | SmartKids Worksheets</title>
        <meta name="description" content="Download free worksheet packs for Grades 1-5. Each pack includes 10 carefully selected worksheets covering Math, English, and Science." />
        <link rel="canonical" href="https://smartkidsworksheets.com/packs" />
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
            {packs.map((pack) => (
              <Card key={pack.id} className="overflow-hidden">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4`}>
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-heading">{pack.title}</CardTitle>
                  <p className="text-muted-foreground">{pack.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {pack.worksheets.slice(0, 5).map((worksheet, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{worksheet}</span>
                      </li>
                    ))}
                    <li className="text-sm text-muted-foreground italic">
                      + {pack.worksheets.length - 5} more worksheets
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button
                    onClick={() => handleDownload(pack)}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
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
                          All {pack.worksheets.length} Worksheets:
                        </h4>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                          {pack.worksheets.map((worksheet, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{worksheet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Get this pack sent to your email (optional):
                        </p>
                        <div className="flex gap-2">
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Button onClick={() => pack && handleDownload(pack, true)}>
                            Send
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4 font-heading">Want More Free Worksheets?</h2>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter and get new worksheets delivered to your inbox every week!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="accent"
                size="lg"
                onClick={() => {
                  if (email) {
                    toast({
                      title: "Subscribed!",
                      description: "You'll receive weekly worksheets in your inbox.",
                    });
                    setEmail("");
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Packs;
