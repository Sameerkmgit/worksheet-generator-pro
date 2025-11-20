import { useParams, Link } from "react-router-dom";
import { Download, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data - in production this would come from your data source
const worksheetData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Addition Worksheet 1 – Free 2-Digit Addition PDF",
    category: "Math",
    grade: "Grade 3",
    description: "Free Grade 3 2-digit addition worksheet with 5 practice sums. Perfect for homework, revision, and mental math. Download the printable PDF or use online.",
    preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800",
    pdfUrl: "/pdfs/Math_Addition_1.pdf",
    imageUrl: "/images/Math_Addition_1.jpg",
    heading: "Worksheet: 2-Digit Addition Practice (Grade 3)",
    intro: "Ask your child to solve each 2-digit sum without a calculator. You can print this page or download the PDF version for offline use. Ideal for Grade 3 students who need extra practice with 2-digit addition.",
    questions: [
      "1) 23 + 14 = ______",
      "2) 56 + 22 = ______",
      "3) 12 + 19 = ______",
      "4) 40 + 35 = ______",
      "5) 67 + 11 = ______",
    ],
    relatedWorksheets: [
      { title: "Addition Worksheet 2", url: "/worksheet/2" },
      { title: "Subtraction Worksheet 1", url: "/worksheet/3" },
      { title: "Word Problems Worksheet", url: "/worksheet/4" },
    ],
  },
  "2": {
    id: 2,
    title: "Addition Worksheet 2 – Free 2-Digit & 3-Digit Addition PDF",
    category: "Math",
    grade: "Grade 3",
    description: "Free Grade 3 math worksheet for kids to practice 2-digit and 3-digit addition problems. Printable and classroom-friendly.",
    preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800",
    pdfUrl: "/pdfs/Math_Addition_2.pdf",
    imageUrl: "/images/Math_Addition_2.jpg",
    heading: "Grade 3 Math – Addition Worksheet 2",
    intro: "Practice adding 2-digit and 3-digit numbers. This worksheet is perfect for quick revision, classroom practice, or homework.",
    questions: [
      "1) 13 + 44 = ______",
      "2) 28 + 39 = ______",
      "3) 50 + 27 = ______",
      "4) 19 + 16 = ______",
      "5) 77 + 12 = ______",
    ],
    relatedWorksheets: [
      { title: "Addition Worksheet 1", url: "/worksheet/1" },
      { title: "Subtraction Worksheet 1", url: "/worksheet/3" },
      { title: "Word Problems Worksheet", url: "/worksheet/4" },
    ],
  },
  "3": {
    id: 3,
    title: "Introduction to Multiplication - Grade 1",
    category: "Math",
    grade: "Grade 1",
    description: "Learn multiplication through repeated addition, skip counting, and simple word problems. Perfect for introducing Grade 1 students to the concept of multiplication.",
    preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800",
    pdfUrl: "/pdfs/Math_Multiplication_Intro.pdf",
    imageUrl: "/images/Math_Multiplication_Intro.jpg",
    heading: "Introduction to Multiplication - Grade 1",
    intro: "Learn multiplication through repeated addition, skip counting, and simple word problems. This worksheet introduces young learners to the concept of multiplication in a fun and easy way.",
    questions: [
      "1) There are 3 baskets. Each basket has 2 apples. How many apples are there in total?",
      "2) 2 + 2 + 2 = ? (This is the same as 3 groups of 2)",
      "3) Count by 2s: 2, 4, 6, 8, ___",
      "4) A bicycle has 2 wheels. How many wheels do 3 bicycles have?",
      "5) Each child has 5 fingers on one hand. How many fingers do 2 hands have?",
      "6) 2 × 1 = ?",
      "7) 2 × 2 = ?",
      "8) 2 × 3 = ?",
      "9) 3 × 2 means '3 groups of 2.' Draw 3 groups of 2 dots.",
      "10) 1 × 2 = 2, 2 × 2 = 4, 3 × 2 = ___",
    ],
    relatedWorksheets: [
      { title: "Addition Worksheet 1", url: "/worksheet/1" },
      { title: "Addition Worksheet 2", url: "/worksheet/2" },
      { title: "Subtraction Worksheet 1", url: "/worksheet/4" },
    ],
  },
  "20": {
    id: 20,
    title: "Alphabet Tracing Worksheet - Grade 1 (A-Z Practice)",
    category: "English",
    grade: "Grade 1",
    description: "Free printable alphabet tracing worksheet for Grade 1 students to practice writing uppercase and lowercase letters A-Z. Perfect for handwriting practice and letter recognition.",
    preview: "/images/worksheets/alphabet_tracing_preview.jpg",
    pdfUrl: "/pdfs/Alphabet_Tracing_Class1.pdf",
    imageUrl: "/images/Alphabet_Tracing_Class1.jpg",
    heading: "Alphabet Tracing Worksheet - Grade 1",
    intro: "Practice writing uppercase and lowercase letters with guided tracing activities. This worksheet helps Grade 1 students develop fine motor skills and letter recognition.",
    questions: [
      "1) Trace the uppercase letter A three times: A A A",
      "2) Trace the lowercase letter a three times: a a a",
      "3) Trace the uppercase letter B three times: B B B",
      "4) Trace the lowercase letter b three times: b b b",
      "5) Trace the uppercase letter C three times: C C C",
      "6) Trace the lowercase letter c three times: c c c",
      "7) Practice writing your name using traced letters: _______________",
      "8) Circle the letters you know: A B C D E F G H I J",
      "9) Connect the dots to form the letter D",
      "10) Color the picture that starts with letter 'A' (show apple, ball, cat)",
    ],
    skills: [
      "Developing fine motor skills for writing",
      "Learning correct letter formation for uppercase and lowercase letters",
      "Building letter recognition and phonics awareness",
      "Improving hand-eye coordination",
      "Preparing for independent writing",
    ],
    usage: [
      "Use with dotted letter guides for tracing practice",
      "Encourage children to say the letter name and sound while tracing",
      "Practice 2-3 letters per day rather than all at once",
      "Use pencils with grips for better control",
      "Celebrate progress with stickers or praise",
    ],
    faq: [
      {
        question: "What age group is this tracing worksheet for?",
        answer: "This worksheet is designed for Grade 1 students (around 5-7 years old) who are beginning to learn letter formation and handwriting.",
      },
      {
        question: "How often should my child practice letter tracing?",
        answer: "Short daily practice of 10-15 minutes works best. Focus on 2-3 letters per session rather than trying to complete the entire alphabet at once.",
      },
      {
        question: "Can I print and reuse this worksheet?",
        answer: "Yes, you may print this worksheet multiple times for home or classroom use. Laminating it allows children to trace with dry-erase markers for repeated practice.",
      },
    ],
    seo: {
      title: "Free Alphabet Tracing Worksheet for Grade 1 | A-Z Letter Practice PDF",
      description: "Download free printable alphabet tracing worksheets for Grade 1 students. Practice uppercase and lowercase letters A-Z with guided tracing activities.",
      keywords: "alphabet tracing worksheet grade 1, letter tracing pdf, handwriting practice grade 1, free alphabet worksheets",
    },
    relatedWorksheets: [
      { title: "Introduction to Multiplication", url: "/worksheet/3" },
      { title: "Addition Worksheet 1", url: "/worksheet/1" },
      { title: "Addition Worksheet 2", url: "/worksheet/2" },
    ],
  },
  "40": {
    id: 40,
    title: "Grade 1 Addition Practice - Numbers 1 to 10",
    category: "Math",
    grade: "Grade 1",
    description: "Free Grade 1 math worksheet for addition practice with numbers 1 to 10. Includes picture addition, simple sums, and fill-in-the-blank problems. Perfect for 20-minute practice sessions.",
    preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    pdfUrl: "https://drive.google.com/uc?id=PLACEHOLDER_ADDITION_PRACTICE_PDF",
    imageUrl: "https://drive.google.com/uc?id=PLACEHOLDER_ADDITION_PRACTICE_IMAGE",
    heading: "Grade 1 Addition Practice - Numbers 1 to 10",
    intro: "This worksheet helps Grade 1 students practice addition with numbers from 1 to 10. It includes picture-based problems, simple addition sums, and fill-in-the-blank exercises. Recommended time: 20 minutes. Topics covered: Addition, Basic Math, Number Sense. Difficulty: Easy.",
    questions: [
      "SECTION A: Picture Addition",
      "1) 🍎🍎 + 🍎🍎🍎 = ___ (2 apples + 3 apples)",
      "2) ⭐⭐⭐ + ⭐⭐ = ___ (3 stars + 2 stars)",
      "3) 🌸🌸🌸🌸 + 🌸 = ___ (4 flowers + 1 flower)",
      "4) 🐱 + 🐱🐱🐱🐱 = ___ (1 cat + 4 cats)",
      "5) 🎈🎈🎈 + 🎈🎈🎈 = ___ (3 balloons + 3 balloons)",
      "",
      "SECTION B: Simple Addition",
      "1) 2 + 3 = ___",
      "2) 1 + 4 = ___",
      "3) 5 + 2 = ___",
      "4) 3 + 3 = ___",
      "5) 4 + 4 = ___",
      "6) 2 + 6 = ___",
      "7) 5 + 5 = ___",
      "8) 3 + 7 = ___",
      "9) 6 + 4 = ___",
      "10) 7 + 3 = ___",
      "",
      "SECTION C: Fill in the Missing Number",
      "1) 3 + ___ = 7",
      "2) ___ + 4 = 9",
      "3) 2 + ___ = 8",
      "4) ___ + 5 = 10",
      "5) 4 + ___ = 9",
      "",
      "ANSWER KEY:",
      "Section A: 1) 5, 2) 5, 3) 5, 4) 5, 5) 6",
      "Section B: 1) 5, 2) 5, 3) 7, 4) 6, 5) 8, 6) 8, 7) 10, 8) 10, 9) 10, 10) 10",
      "Section C: 1) 4, 2) 5, 3) 6, 4) 5, 5) 5",
    ],
    skills: [
      "Single-digit addition (1-10)",
      "Visual addition with pictures",
      "Number sense and counting",
      "Mental math skills",
      "Problem-solving with missing numbers",
    ],
    usage: [
      "Print and use as homework or classroom practice",
      "20-minute timed practice session",
      "Use Section A for visual learners",
      "Progress from pictures to numbers to missing numbers",
      "Review answer key together with the child",
    ],
    faq: [
      {
        question: "What age is this worksheet suitable for?",
        answer: "This worksheet is designed for Grade 1 students (ages 6-7) who are learning basic addition with numbers 1 to 10.",
      },
      {
        question: "How long should this worksheet take?",
        answer: "The recommended time is 20 minutes. However, let your child work at their own pace, especially with Section A which requires counting pictures.",
      },
      {
        question: "Should my child use the answer key?",
        answer: "Encourage your child to complete all sections first. Then review the answers together, using mistakes as learning opportunities rather than focusing on errors.",
      },
    ],
    seo: {
      title: "Grade 1 Addition Practice - Numbers 1 to 10 | Free Printable PDF",
      description: "Free Grade 1 addition worksheet with picture problems, simple sums, and fill-in-the-blank exercises. Perfect for 20-minute math practice sessions with numbers 1-10.",
      keywords: "grade 1 addition, numbers 1 to 10, basic math, picture addition, printable pdf, easy difficulty, addition practice, math worksheet grade 1",
    },
    relatedWorksheets: [
      { title: "Introduction to Multiplication", url: "/worksheet/3" },
      { title: "Simple Addition", url: "/worksheet/16" },
      { title: "Alphabet Tracing", url: "/worksheet/20" },
    ],
  },
  "41": {
    id: 41,
    title: "Grade 1 English - Alphabet Writing Practice (Letters A to M)",
    category: "English",
    grade: "Grade 1",
    description: "Free Grade 1 English worksheet for alphabet writing practice covering letters A to M. Includes uppercase tracing, lowercase tracing, and missing letter exercises. Perfect for 25-minute handwriting practice.",
    preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    pdfUrl: "https://drive.google.com/uc?id=PLACEHOLDER_ALPHABET_WRITING_PDF",
    imageUrl: "https://drive.google.com/uc?id=PLACEHOLDER_ALPHABET_WRITING_IMAGE",
    heading: "Grade 1 English - Alphabet Writing Practice (Letters A to M)",
    intro: "This worksheet helps Grade 1 students practice writing uppercase and lowercase letters A through M. It includes tracing exercises and fill-in-the-blank activities. Recommended time: 25 minutes. Topics covered: Alphabet, Letter Formation, Handwriting. Difficulty: Easy.",
    questions: [
      "SECTION A: Trace the Letters (uppercase)",
      "1) A A A",
      "2) B B B",
      "3) C C C",
      "4) D D D",
      "5) E E E",
      "",
      "SECTION B: Trace the Letters (lowercase)",
      "1) a a a",
      "2) b b b",
      "3) c c c",
      "4) d d d",
      "5) e e e",
      "6) f f f",
      "7) g g g",
      "8) h h h",
      "9) i i i",
      "10) j j j",
      "",
      "SECTION C: Write the Missing Letters",
      "1) A B __ D",
      "2) E __ G H",
      "3) __ J K L",
      "4) a b c __",
      "5) __ f g h",
      "",
      "ANSWER KEY:",
      "Section A: Students trace uppercase A, B, C, D, E",
      "Section B: Students trace lowercase a, b, c, d, e, f, g, h, i, j",
      "Section C: 1) C, 2) F, 3) I, 4) d, 5) e",
    ],
    skills: [
      "Uppercase letter formation (A-E)",
      "Lowercase letter formation (a-j)",
      "Letter sequencing and alphabet order",
      "Fine motor skills and pencil control",
      "Letter recognition and writing practice",
    ],
    usage: [
      "Print and use as daily handwriting practice",
      "25-minute guided practice session",
      "Focus on proper letter formation and spacing",
      "Use pencil grips for beginners",
      "Practice one section at a time for better focus",
    ],
    faq: [
      {
        question: "What age is this worksheet suitable for?",
        answer: "This worksheet is designed for Grade 1 students (ages 6-7) who are learning to write uppercase and lowercase letters.",
      },
      {
        question: "How should my child practice tracing?",
        answer: "Encourage your child to trace slowly, following the correct stroke order. Start with uppercase letters, then move to lowercase, and finally complete the missing letter exercises.",
      },
      {
        question: "Can I laminate this worksheet for reuse?",
        answer: "Yes! Laminating the worksheet allows children to practice multiple times using dry-erase markers, which is excellent for repeated handwriting practice.",
      },
    ],
    seo: {
      title: "Grade 1 English - Alphabet Writing Practice (Letters A to M) | Free PDF",
      description: "Free Grade 1 alphabet writing worksheet covering letters A-M. Includes uppercase and lowercase tracing exercises and missing letter activities for handwriting practice.",
      keywords: "grade 1 english, alphabet writing, letter formation, handwriting practice, uppercase lowercase, printable pdf, easy difficulty, alphabet A-M",
    },
    relatedWorksheets: [
      { title: "Alphabet Tracing", url: "/worksheet/20" },
      { title: "Letter Recognition", url: "/worksheet/14" },
      { title: "Introduction to Multiplication", url: "/worksheet/3" },
    ],
  },
  "42": {
    id: 42,
    title: "Grade 2 Math - Multiplication Tables (2 and 5)",
    category: "Math",
    grade: "Grade 2",
    description: "Free Grade 2 math worksheet for practicing multiplication tables of 2 and 5. Includes table practice, extended sequences, and mixed exercises. Perfect for 30-minute practice sessions.",
    preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800",
    pdfUrl: "https://drive.google.com/uc?id=PLACEHOLDER_MULTIPLICATION_TABLES_PDF",
    imageUrl: "https://drive.google.com/uc?id=PLACEHOLDER_MULTIPLICATION_TABLES_IMAGE",
    heading: "Grade 2 Math - Multiplication Tables (2 and 5)",
    intro: "This worksheet helps Grade 2 students master multiplication tables of 2 and 5. It includes basic table practice, extended sequences up to 5×10, and mixed practice problems. Recommended time: 30 minutes. Topics covered: Multiplication, Times Tables, Basic Math. Difficulty: Medium.",
    questions: [
      "SECTION A: Multiplication Table of 2",
      "1) 2 × 1 = __",
      "2) 2 × 2 = __",
      "3) 2 × 3 = __",
      "4) 2 × 4 = __",
      "5) 2 × 5 = __",
      "",
      "SECTION B: Multiplication Table of 5",
      "1) 5 × 1 = __",
      "2) 5 × 2 = __",
      "3) 5 × 3 = __",
      "4) 5 × 4 = __",
      "5) 5 × 5 = __",
      "6) 5 × 6 = __",
      "7) 5 × 7 = __",
      "8) 5 × 8 = __",
      "9) 5 × 9 = __",
      "10) 5 × 10 = __",
      "",
      "SECTION C: Mixed Practice",
      "1) 2 × 3 = __",
      "2) 5 × 4 = __",
      "3) 2 × 6 = __",
      "4) 5 × 8 = __",
      "5) 2 × 10 = __",
      "",
      "ANSWER KEY:",
      "Section A: 1) 2, 2) 4, 3) 6, 4) 8, 5) 10",
      "Section B: 1) 5, 2) 10, 3) 15, 4) 20, 5) 25, 6) 30, 7) 35, 8) 40, 9) 45, 10) 50",
      "Section C: 1) 6, 2) 20, 3) 12, 4) 40, 5) 20",
    ],
    skills: [
      "Memorizing multiplication tables of 2 and 5",
      "Understanding multiplication patterns and skip counting",
      "Building fluency with basic multiplication facts",
      "Applying multiplication in mixed problems",
      "Mental math and computational skills",
    ],
    usage: [
      "Print and use for daily multiplication practice",
      "30-minute guided practice session",
      "Practice Section A first, then B, then mixed problems",
      "Use flashcards alongside this worksheet for memorization",
      "Review answer key together and discuss patterns",
    ],
    faq: [
      {
        question: "What age is this worksheet suitable for?",
        answer: "This worksheet is designed for Grade 2 students (ages 7-8) who are learning multiplication tables of 2 and 5.",
      },
      {
        question: "Should my child memorize these tables?",
        answer: "Yes, memorizing the 2 and 5 times tables is essential for building multiplication fluency. Encourage daily practice for 10-15 minutes until they can recall answers quickly.",
      },
      {
        question: "What if my child struggles with Section C?",
        answer: "If mixed practice is challenging, have your child complete Sections A and B first to build confidence. Use skip counting (2, 4, 6... or 5, 10, 15...) as a helpful strategy before moving to Section C.",
      },
    ],
    seo: {
      title: "Grade 2 Math - Multiplication Tables (2 and 5) | Free Practice PDF",
      description: "Free Grade 2 multiplication worksheet covering times tables of 2 and 5. Includes table practice, extended sequences, and mixed exercises for 30-minute practice sessions.",
      keywords: "grade 2 math, multiplication tables, times tables 2 and 5, multiplication practice, printable pdf, medium difficulty, basic math worksheet",
    },
    relatedWorksheets: [
      { title: "Introduction to Multiplication", url: "/worksheet/3" },
      { title: "Subtraction Practice", url: "/worksheet/17" },
      { title: "Addition Practice", url: "/worksheet/40" },
    ],
  },
  "43": {
    id: 43,
    title: "Grade 2 English - Nouns and Verbs",
    category: "English",
    grade: "Grade 2",
    description: "Free Grade 2 English worksheet on nouns and verbs. Students identify nouns in sentences, find verbs, and choose between nouns and verbs. Perfect for 25-minute grammar practice.",
    preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    pdfUrl: "https://drive.google.com/uc?id=PLACEHOLDER_NOUNS_VERBS_PDF",
    imageUrl: "https://drive.google.com/uc?id=PLACEHOLDER_NOUNS_VERBS_IMAGE",
    heading: "Grade 2 English - Nouns and Verbs",
    intro: "This worksheet helps Grade 2 students understand and identify nouns (naming words) and verbs (action words) in sentences. It includes sentence analysis and word classification exercises. Recommended time: 25 minutes. Topics covered: Grammar, Parts of Speech, Nouns, Verbs. Difficulty: Medium.",
    questions: [
      "SECTION A: Identify the Noun",
      "1) The cat is sleeping. (Noun: __)",
      "2) I love my school. (Noun: __)",
      "3) The sun is bright. (Noun: __)",
      "4) She has a book. (Noun: __)",
      "5) We play in the park. (Noun: __)",
      "",
      "SECTION B: Identify the Verb",
      "1) The dog runs fast. (Verb: __)",
      "2) Birds fly in the sky. (Verb: __)",
      "3) I eat an apple. (Verb: __)",
      "4) They jump high. (Verb: __)",
      "5) She writes neatly. (Verb: __)",
      "6) He reads a story. (Verb: __)",
      "7) We sing songs. (Verb: __)",
      "8) The baby cries loudly. (Verb: __)",
      "9) Mom cooks dinner. (Verb: __)",
      "10) Dad drives the car. (Verb: __)",
      "",
      "SECTION C: Circle the Correct Word",
      "1) The (flower/blooms) is pretty.",
      "2) They (children/play) outside.",
      "3) She (dances/girl) beautifully.",
      "4) The (teacher/teaches) well.",
      "5) We (students/learn) every day.",
      "",
      "ANSWER KEY:",
      "Section A: 1) cat, 2) school, 3) sun, 4) book, 5) park",
      "Section B: 1) runs, 2) fly, 3) eat, 4) jump, 5) writes, 6) reads, 7) sing, 8) cries, 9) cooks, 10) drives",
      "Section C: 1) flower, 2) play, 3) dances, 4) teaches, 5) learn",
    ],
    skills: [
      "Identifying nouns as naming words for people, places, and things",
      "Recognizing verbs as action words in sentences",
      "Distinguishing between nouns and verbs in context",
      "Understanding basic parts of speech",
      "Building grammar foundation for sentence construction",
    ],
    usage: [
      "Print and use for grammar practice at home or in class",
      "25-minute guided practice session",
      "Review nouns and verbs definitions before starting",
      "Complete one section at a time for better understanding",
      "Discuss the answer key and provide examples of other nouns and verbs",
    ],
    faq: [
      {
        question: "What is a noun?",
        answer: "A noun is a naming word for a person (teacher, child), place (school, park), or thing (book, cat). Help your child identify these by asking 'What is the name of this person/place/thing?'",
      },
      {
        question: "What is a verb?",
        answer: "A verb is an action word that tells what someone or something does (run, jump, write, sing). Help your child identify verbs by asking 'What action is happening?'",
      },
      {
        question: "How can I help my child with Section C?",
        answer: "Explain that sentences need both a noun (who/what) and a verb (what they do). Read each sentence aloud and ask 'Which word is the name?' and 'Which word is the action?' to help them choose correctly.",
      },
    ],
    seo: {
      title: "Grade 2 English - Nouns and Verbs Worksheet | Free Grammar PDF",
      description: "Free Grade 2 grammar worksheet on nouns and verbs. Students identify naming words and action words in sentences. Perfect for 25-minute parts of speech practice.",
      keywords: "grade 2 english, nouns and verbs, grammar worksheet, parts of speech, naming words, action words, printable pdf, medium difficulty",
    },
    relatedWorksheets: [
      { title: "Word Building", url: "/worksheet/18" },
      { title: "Sentence Formation", url: "/worksheet/19" },
      { title: "Alphabet Writing Practice", url: "/worksheet/41" },
    ],
  },
};

const WorksheetDetail = () => {
  const { worksheetId } = useParams<{ worksheetId: string }>();
  const worksheet = worksheetData[worksheetId || ""] || worksheetData["1"];

  const pageUrl = `https://smartkidsworksheets.com/worksheet/${worksheetId}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": worksheet.title,
    "description": worksheet.description,
    "learningResourceType": "Worksheet",
    "educationalLevel": `Primary school, ${worksheet.grade}`,
    "inLanguage": "en",
    "about": [worksheet.category, worksheet.grade, "Worksheets"],
    "author": {
      "@type": "Organization",
      "name": "SmartKids Worksheets"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartKids Worksheets"
    },
    "keywords": [
      `${worksheet.grade} ${worksheet.category} worksheet`,
      "math worksheet for kids",
      "free printable worksheets",
      "SmartKids worksheets"
    ],
    "url": pageUrl
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{worksheet.grade} {worksheet.title} | SmartKids Worksheets</title>
        <meta name="description" content={worksheet.description} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${worksheet.title} | Free Printable`} />
        <meta property="og:description" content={worksheet.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={worksheet.preview} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${worksheet.title} | Free Printable`} />
        <meta name="twitter:description" content={worksheet.description} />
        <meta name="twitter:image" content={worksheet.preview} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-6 px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${worksheet.category.toLowerCase()}`}>{worksheet.category} Worksheets</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{worksheet.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading & intro */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            {worksheet.heading || worksheet.title}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {worksheet.intro || worksheet.description}
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2.4fr_1fr] gap-8 items-start">
            {/* LEFT: main worksheet content */}
            <article className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-4">
                    Practice Questions
                  </h2>

                  <div className="space-y-4 mb-6">
                    {worksheet.questions.map((question, index) => {
                      // Skip empty strings
                      if (!question.trim()) return null;
                      
                      // Render section headings as h3
                      if (question.startsWith('SECTION') || question.startsWith('ANSWER KEY:')) {
                        return (
                          <h3 key={index} className="text-lg font-semibold font-heading mt-6 first:mt-0">
                            {question}
                          </h3>
                        );
                      }
                      
                      // Render questions as list items
                      return (
                        <div key={index} className="text-base pl-6">
                          {question}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <Button asChild size="lg" className="rounded-full">
                      <a href={worksheet.pdfUrl} target="_blank" rel="noopener">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full">
                      <a href={worksheet.imageUrl} target="_blank" rel="noopener">
                        <FileImage className="mr-2 h-4 w-4" />
                        View as Image
                      </a>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Tip: Print this worksheet on A4 paper for the best classroom or home-learning experience.
                    Students can solve directly on the sheet or copy the sums into their notebooks.
                  </p>
                </CardContent>
              </Card>

              {/* Skills & usage */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-3">
                    Skills covered in this worksheet
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 mb-6 text-muted-foreground">
                    <li>Adding two 2-digit numbers without regrouping in most sums</li>
                    <li>Building confidence with vertical and horizontal addition</li>
                    <li>Improving number sense and mental math strategies</li>
                    <li>Preparation for Grade 3 math tests and school exams</li>
                  </ul>

                  <h2 className="text-xl font-semibold font-heading mb-3">
                    How parents and teachers can use this worksheet
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Use as a quick daily practice sheet before or after a lesson.</li>
                    <li>Send home as a homework assignment or revision sheet.</li>
                    <li>Time your child to gently build speed once they are comfortable with each type of sum.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold font-heading mb-5">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        What age group is this addition worksheet for?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This worksheet is designed for Grade 3 students (around 7–9 years old),
                        but it can also be used for any child who is learning 2-digit addition.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        Can I print and share this worksheet?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Yes. You may print this worksheet for classroom use or home practice.
                        It can be shared with parents, teachers, and tutors as part of non-commercial
                        educational use.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-1">
                        How often should my child practice addition?
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Short, regular practice works best. Even 10–15 minutes of focused addition
                        practice a few times a week can significantly improve accuracy and confidence.
                      </p>
                    </div>
                  </div>

                  {/* SEO text block */}
                  <p className="text-sm text-muted-foreground leading-relaxed mt-6 pt-6 border-t">
                    This Grade 3 math worksheet helps children master 2-digit addition by providing
                    carefully chosen sums that build number fluency and accuracy. Parents can use this
                    printable worksheet as part of a home-learning routine, while teachers can include it
                    in their lesson plans, math centers, or test revision packs. Download the free PDF,
                    print it, and let your child solve the sums independently or with guided support.
                  </p>
                </CardContent>
              </Card>
            </article>

            {/* RIGHT: sidebar */}
            <aside className="space-y-5">
              <Card>
                <CardContent className="p-5">
                  <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground mb-5 min-h-[250px] flex items-center justify-center">
                    {/* Google AdSense - Sidebar 300x250 - Replace with your ad code */}
                    <p>Advertisement</p>
                  </div>

                  <h2 className="text-lg font-semibold font-heading mb-3">
                    More Grade 3 Math Worksheets
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {worksheet.relatedWorksheets.map((related: any, index: number) => (
                      <li key={index}>
                        <Link to={related.url} className="text-primary hover:underline">
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorksheetDetail;
