import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import unique worksheet images
import mathCountingImg from "@/assets/math-counting-numbers.jpg";
import mathAdditionImg from "@/assets/math-addition.jpg";
import mathSubtractionImg from "@/assets/math-subtraction.jpg";
import mathMultiplicationImg from "@/assets/math-multiplication.jpg";
import mathDivisionImg from "@/assets/math-division.jpg";
import mathShapesImg from "@/assets/math-shapes-geometry.jpg";
import mathTimeImg from "@/assets/math-time-clocks.jpg";
import mathMoneyImg from "@/assets/math-money.jpg";
import mathFractionsImg from "@/assets/math-fractions.jpg";
import mathDecimalsImg from "@/assets/math-decimals.jpg";
import mathMeasurementImg from "@/assets/math-measurement.jpg";
import mathPlaceValueImg from "@/assets/math-place-value.jpg";
import englishAlphabetImg from "@/assets/english-alphabet-letters.jpg";
import englishReadingImg from "@/assets/english-reading-books.jpg";
import englishWritingImg from "@/assets/english-writing-practice.jpg";
import englishGrammarImg from "@/assets/english-grammar.jpg";
import englishVocabularyImg from "@/assets/english-vocabulary.jpg";
import englishSentencesImg from "@/assets/english-sentences.jpg";
import englishPunctuationImg from "@/assets/english-punctuation.jpg";
import englishVowelsImg from "@/assets/english-vowels.jpg";
import englishRhymingImg from "@/assets/english-rhyming.jpg";
import englishComprehensionImg from "@/assets/english-comprehension.jpg";
import englishEssayImg from "@/assets/english-essay-writing.jpg";
import sciencePlantsImg from "@/assets/science-plants.jpg";
import scienceAnimalsImg from "@/assets/science-animals.jpg";
import scienceWaterCycleImg from "@/assets/science-water-cycle.jpg";
import scienceNutritionImg from "@/assets/science-nutrition.jpg";
import scienceSolarSystemImg from "@/assets/science-solar-system.jpg";
import scienceExperimentsImg from "@/assets/science-experiments.jpg";
import scienceHabitatsImg from "@/assets/science-habitats.jpg";
import scienceMagnetsImg from "@/assets/science-magnets.jpg";
import computerBasicsImg from "@/assets/computer-basics.jpg";
import assignmentsHomeworkImg from "@/assets/assignments-homework.jpg";
import assignmentsTestsImg from "@/assets/assignments-tests.jpg";
import assignmentsRevisionImg from "@/assets/assignments-revision.jpg";
import assignmentsPracticeImg from "@/assets/assignments-practice.jpg";

// Worksheet data organized by grade and subject
const worksheetsByGradeAndSubject: Record<string, Record<string, any[]>> = {
  "grade-1": {
    math: [
      { id: 3, title: "Introduction to Multiplication", preview: mathMultiplicationImg, category: "Math", grade: "Grade 1" },
      { id: 40, title: "Grade 1 Addition Practice - Complete Worksheet", preview: mathAdditionImg, category: "Math", grade: "Grade 1" },
      { id: 50, title: "Counting & Number Recognition (1-20)", preview: mathCountingImg, category: "Math", grade: "Grade 1" },
      { id: 51, title: "Simple Subtraction (1-10)", preview: mathSubtractionImg, category: "Math", grade: "Grade 1" },
      { id: 52, title: "Shapes & Patterns", preview: mathShapesImg, category: "Math", grade: "Grade 1" },
      { id: 53, title: "Comparing Numbers (Greater/Less Than)", preview: mathCountingImg, category: "Math", grade: "Grade 1" },
    ],
    english: [
      { id: 20, title: "Alphabet Tracing", preview: englishAlphabetImg, category: "English", grade: "Grade 1" },
      { id: 14, title: "Letter Recognition", preview: englishAlphabetImg, category: "English", grade: "Grade 1" },
      { id: 41, title: "Alphabet Writing Practice (Letters A to M)", preview: englishWritingImg, category: "English", grade: "Grade 1" },
      { id: 55, title: "Vowels & Consonants", preview: englishVowelsImg, category: "English", grade: "Grade 1" },
      { id: 56, title: "CVC Words (Cat, Dog, Sun)", preview: englishVocabularyImg, category: "English", grade: "Grade 1" },
      { id: 57, title: "Rhyming Words", preview: englishRhymingImg, category: "English", grade: "Grade 1" },
      { id: 58, title: "Simple Sentences", preview: englishSentencesImg, category: "English", grade: "Grade 1" },
      { id: 59, title: "Sight Words (Dolch List)", preview: englishVocabularyImg, category: "English", grade: "Grade 1" },
    ],
    science: [
      { id: 30, title: "Animal Habitats", preview: scienceHabitatsImg, category: "Science", grade: "Grade 1" },
      { id: 60, title: "Parts of a Plant", preview: sciencePlantsImg, category: "Science", grade: "Grade 1" },
    ],
    "computer-science": [
      { id: 200, title: "Introduction to Computers - Digital Literacy Basics", preview: computerBasicsImg, category: "Computer Science", grade: "Grade 1" },
    ],
    assignments: [
      { id: 31, title: "Grade 1 Practice Test", preview: assignmentsTestsImg, category: "Assignments", grade: "Grade 1" },
      { id: 75, title: "Weekly Test - Week 1", preview: assignmentsTestsImg, category: "Assignments", grade: "Grade 1" },
      { id: 76, title: "Monthly Test - Math & English", preview: assignmentsTestsImg, category: "Assignments", grade: "Grade 1" },
      { id: 77, title: "Revision Worksheet - Term 1", preview: assignmentsRevisionImg, category: "Assignments", grade: "Grade 1" },
      { id: 201, title: "Animal Identification & Learning", preview: scienceAnimalsImg, category: "Assignments", grade: "Grade 1" },
    ],
  },
  "grade-2": {
    math: [
      { id: 16, title: "Addition Practice", preview: mathAdditionImg, category: "Math", grade: "Grade 2" },
      { id: 17, title: "Subtraction Practice", preview: mathSubtractionImg, category: "Math", grade: "Grade 2" },
      { id: 42, title: "Multiplication Tables (2 and 5)", preview: mathMultiplicationImg, category: "Math", grade: "Grade 2" },
      { id: 78, title: "2-Digit Addition & Subtraction", preview: mathAdditionImg, category: "Math", grade: "Grade 2" },
      { id: 79, title: "Place Value (Tens & Ones)", preview: mathPlaceValueImg, category: "Math", grade: "Grade 2" },
      { id: 80, title: "Time (Hours & Minutes)", preview: mathTimeImg, category: "Math", grade: "Grade 2" },
      { id: 81, title: "Money (Coins & Notes)", preview: mathMoneyImg, category: "Math", grade: "Grade 2" },
      { id: 82, title: "Measurement (Length & Weight)", preview: mathMeasurementImg, category: "Math", grade: "Grade 2" },
    ],
    english: [
      { id: 18, title: "Word Building", preview: englishVocabularyImg, category: "English", grade: "Grade 2" },
      { id: 19, title: "Sentence Formation", preview: englishSentencesImg, category: "English", grade: "Grade 2" },
      { id: 43, title: "Nouns and Verbs", preview: englishGrammarImg, category: "English", grade: "Grade 2" },
      { id: 83, title: "Adjectives & Describing Words", preview: englishGrammarImg, category: "English", grade: "Grade 2" },
      { id: 84, title: "Singular & Plural", preview: englishGrammarImg, category: "English", grade: "Grade 2" },
      { id: 85, title: "Punctuation Practice", preview: englishPunctuationImg, category: "English", grade: "Grade 2" },
      { id: 86, title: "Story Sequencing", preview: englishComprehensionImg, category: "English", grade: "Grade 2" },
      { id: 87, title: "Simple Reading Comprehension", preview: englishReadingImg, category: "English", grade: "Grade 2" },
    ],
    science: [
      { id: 32, title: "Plants & Growth", preview: sciencePlantsImg, category: "Science", grade: "Grade 2" },
      { id: 88, title: "Animal Classification", preview: scienceAnimalsImg, category: "Science", grade: "Grade 2" },
      { id: 89, title: "Water Cycle Basics", preview: scienceWaterCycleImg, category: "Science", grade: "Grade 2" },
      { id: 90, title: "Healthy Food & Nutrition", preview: scienceNutritionImg, category: "Science", grade: "Grade 2" },
      { id: 91, title: "Magnets & Materials", preview: scienceMagnetsImg, category: "Science", grade: "Grade 2" },
    ],
    assignments: [
      { id: 33, title: "Grade 2 Weekly Test", preview: assignmentsTestsImg, category: "Assignments", grade: "Grade 2" },
      { id: 103, title: "Monthly Test - All Subjects", preview: assignmentsTestsImg, category: "Assignments", grade: "Grade 2" },
      { id: 104, title: "Revision Sheet - Numbers & Words", preview: assignmentsRevisionImg, category: "Assignments", grade: "Grade 2" },
      { id: 105, title: "Homework Pack - Week 1", preview: assignmentsHomeworkImg, category: "Assignments", grade: "Grade 2" },
    ],
  },
  "grade-3": {
    math: [
      { id: 1, title: "Addition Worksheet 1", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 2, title: "Addition Worksheet 2", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 20, title: "Multiplication Tables", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 3" },
      { id: 44, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 3" },
    ],
    english: [
      { id: 21, title: "Grammar Basics", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 3" },
      { id: 45, title: "Reading Comprehension", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 3" },
    ],
    science: [
      { id: 22, title: "Water Cycle", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "Science", grade: "Grade 3" },
    ],
    computer: [
      { id: 111, title: "Parts of a Computer", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 112, title: "Input & Output Devices", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 113, title: "Keyboard Practice", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 114, title: "Using a Mouse", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 115, title: "Internet Safety Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
    ],
    assignments: [
      { id: 34, title: "Grade 3 Practice Assignment", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 121, title: "Weekly Test - Math & Science", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 122, title: "Monthly Assessment - All Subjects", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 123, title: "Revision Worksheet - Term 2", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
    ],
  },
  "grade-4": {
    math: [
      { id: 23, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 4" },
      { id: 46, title: "Introduction to Fractions", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 4" },
    ],
    english: [
      { id: 24, title: "Essay Writing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 4" },
    ],
    science: [
      { id: 25, title: "Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
      { id: 47, title: "Our Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
    ],
    computer: [
      { id: 129, title: "MS Paint Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 130, title: "File Management", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 131, title: "Introduction to MS Word", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 132, title: "Email Basics", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 133, title: "Computer Viruses & Safety", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
    ],
    assignments: [
      { id: 35, title: "Grade 4 Test Paper", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 139, title: "Weekly Quiz - English & Math", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 140, title: "Monthly Test - Mathematics", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 141, title: "Revision Pack - Mid-Term", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
    ],
  },
  "grade-5": {
    math: [
      { id: 26, title: "Fractions & Decimals", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
      { id: 48, title: "Decimals and Place Value", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
    ],
    english: [
      { id: 27, title: "Advanced Grammar", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 5" },
      { id: 49, title: "Essay Writing and Paragraph Structure", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 5" },
    ],
    science: [
      { id: 28, title: "Physics Basics", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 5" },
    ],
    computer: [
      { id: 147, title: "MS PowerPoint Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 148, title: "Introduction to Spreadsheets", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 149, title: "Coding Basics - Scratch", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 150, title: "Internet & Search Engines", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 151, title: "Cyber Security for Kids", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
    ],
    assignments: [
      { id: 36, title: "Grade 5 Comprehensive Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 157, title: "Pre-Board Examination", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 158, title: "Final Revision - All Subjects", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 159, title: "Sample Paper - Term 1", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
    ],
  },
};

const subjectTitles: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  "computer-science": "Computer Science",
  assignments: "Assignments",
};

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const Category = () => {
  const { grade, subject } = useParams();
  const categoryWorksheets = worksheetsByGradeAndSubject[grade || ""]?.[subject || ""] || [];
  
  const gradeTitle = gradeTitles[grade || ""] || "Grade";
  const subjectTitle = subjectTitles[subject || ""] || "Worksheets";
  const pageTitle = `${gradeTitle} ${subjectTitle}`;
  
  const pageDescription = `Free printable ${pageTitle.toLowerCase()} worksheets. Download and print for classroom or home learning.`;

  const pageUrl = `https://smartkidsworksheets.com/category/${grade}/${subject}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "SmartKids Worksheets",
      "url": "https://smartkidsworksheets.com"
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
        "item": "https://smartkidsworksheets.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": gradeTitle,
        "item": `https://smartkidsworksheets.com/category/${grade}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": subjectTitle,
        "item": pageUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} Worksheets - Free Printable PDFs | SmartKids Worksheets</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:title" content={`${pageTitle} Worksheets - Free Printable PDFs`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <Header />
      <div className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-8 px-6">
          <Link to={`/category/${grade}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" />
              Back to {gradeTitle}
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">{pageTitle} Worksheets</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of {categoryWorksheets.length} high-quality worksheets
            </p>
          </div>

          {/* Category Page Header Ad (responsive) */}
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border mb-8">
            {/* Google AdSense - Category Header - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWorksheets.map((worksheet) => (
            <Card key={worksheet.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={worksheet.preview} 
                    alt={`${worksheet.title} worksheet preview - Free printable PDF for ${gradeTitle} ${subjectTitle}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors font-heading">{worksheet.title}</CardTitle>
                <p className="text-muted-foreground">High-quality educational worksheet</p>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2">
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
      <Footer />
    </div>
  );
};

export default Category;
