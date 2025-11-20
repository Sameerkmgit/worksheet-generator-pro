// Worksheet storage utility functions using localStorage
export interface WorksheetData {
  id: string;
  title: string;
  description: string;
  grade: string;
  subject: string;
  pdfUrl: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
  grade?: string; // Optional: if set, this is grade-specific
  updatedAt: string;
}

const STORAGE_KEY = "smartkids_worksheets";
const ADMIN_KEY = "smartkids_admin_auth";
const CATEGORIES_KEY = "smartkids_categories";

// Admin authentication
export const adminLogin = (password: string): boolean => {
  // Hardcoded password - change this for security
  const ADMIN_PASSWORD = "SmartK1ds@Learn2025!";
  
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "authenticated");
    return true;
  }
  return false;
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === "authenticated";
};

export const adminLogout = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};

// Seed initial worksheets if none exist
export const seedInitialWorksheets = (): void => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing && JSON.parse(existing).length > 0) {
    return; // Already has data
  }

  const initialWorksheets: WorksheetData[] = [
    // GRADE 1 - MATH
    { id: "3", title: "Introduction to Multiplication", description: "Learn multiplication basics", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "40", title: "Grade 1 Addition Practice - Complete Worksheet", description: "Comprehensive addition practice", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "50", title: "Counting & Number Recognition (1-20)", description: "Learn to count and recognize numbers", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "51", title: "Simple Subtraction (1-10)", description: "Basic subtraction practice", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "52", title: "Shapes & Patterns", description: "Identify shapes and patterns", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "53", title: "Comparing Numbers (Greater/Less Than)", description: "Compare numbers using symbols", grade: "Grade 1", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    
    // GRADE 1 - ENGLISH
    { id: "20", title: "Alphabet Tracing", description: "Practice tracing letters A-Z", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "14", title: "Letter Recognition", description: "Recognize uppercase and lowercase letters", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "41", title: "Alphabet Writing Practice (Letters A to M)", description: "Writing practice for letters A-M", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "55", title: "Vowels & Consonants", description: "Learn vowels and consonants", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "56", title: "CVC Words (Cat, Dog, Sun)", description: "Simple CVC word practice", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "57", title: "Rhyming Words", description: "Practice rhyming word pairs", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "58", title: "Simple Sentences", description: "Form simple sentences", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "59", title: "Sight Words (Dolch List)", description: "Learn common sight words", grade: "Grade 1", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    
    // GRADE 1 - SCIENCE
    { id: "30", title: "Animal Habitats", description: "Learn about where animals live", grade: "Grade 1", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "60", title: "Parts of a Plant", description: "Identify plant parts", grade: "Grade 1", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    
    // GRADE 1 - COMPUTER SCIENCE
    { id: "200", title: "Introduction to Computers - Digital Literacy Basics", description: "Learn computer basics", grade: "Grade 1", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    
    // GRADE 1 - ASSIGNMENTS
    { id: "31", title: "Grade 1 Practice Test", description: "Practice test for Grade 1", grade: "Grade 1", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "75", title: "Weekly Test - Week 1", description: "Week 1 practice test", grade: "Grade 1", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "76", title: "Monthly Test - Math & English", description: "Monthly assessment", grade: "Grade 1", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "77", title: "Revision Worksheet - Term 1", description: "Term 1 revision", grade: "Grade 1", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "201", title: "Animal Identification & Learning", description: "Learn to identify animals", grade: "Grade 1", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 2 - MATH
    { id: "17", title: "Subtraction Practice", description: "Practice subtraction skills", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "42", title: "Multiplication Tables (2 and 5)", description: "Learn times tables", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "78", title: "2-Digit Addition & Subtraction", description: "Two-digit math practice", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "79", title: "Place Value (Tens & Ones)", description: "Understand place value", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "80", title: "Time (Hours & Minutes)", description: "Learn to tell time", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "81", title: "Money (Coins & Notes)", description: "Learn about money", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "82", title: "Measurement (Length & Weight)", description: "Learn measurement", grade: "Grade 2", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 2 - ENGLISH
    { id: "18", title: "Word Building", description: "Build and create words", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "19", title: "Sentence Formation", description: "Form correct sentences", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "43", title: "Nouns and Verbs", description: "Learn parts of speech", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "83", title: "Adjectives & Describing Words", description: "Learn descriptive words", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "84", title: "Singular & Plural", description: "Learn singular and plural forms", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "85", title: "Punctuation Practice", description: "Practice punctuation marks", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "86", title: "Story Sequencing", description: "Arrange story events", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "87", title: "Simple Reading Comprehension", description: "Read and understand passages", grade: "Grade 2", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 2 - SCIENCE
    { id: "32", title: "Plants & Growth", description: "Learn how plants grow", grade: "Grade 2", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "88", title: "Animal Classification", description: "Classify different animals", grade: "Grade 2", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "89", title: "Water Cycle Basics", description: "Understand the water cycle", grade: "Grade 2", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "90", title: "Healthy Food & Nutrition", description: "Learn about healthy eating", grade: "Grade 2", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "91", title: "Magnets & Materials", description: "Learn about magnets", grade: "Grade 2", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 2 - ASSIGNMENTS
    { id: "33", title: "Grade 2 Weekly Test", description: "Weekly assessment", grade: "Grade 2", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "103", title: "Monthly Test - All Subjects", description: "Comprehensive monthly test", grade: "Grade 2", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "104", title: "Revision Sheet - Numbers & Words", description: "Revision worksheet", grade: "Grade 2", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "105", title: "Homework Pack - Week 1", description: "Weekly homework", grade: "Grade 2", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - MATH
    { id: "1", title: "Addition Worksheet 1", description: "Addition practice", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "2", title: "Addition Worksheet 2", description: "More addition practice", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "20m", title: "Multiplication Tables", description: "Practice times tables", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "44", title: "Division Practice", description: "Division exercises", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - ENGLISH
    { id: "21", title: "Grammar Basics", description: "Learn basic grammar", grade: "Grade 3", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "45", title: "Reading Comprehension", description: "Reading and understanding", grade: "Grade 3", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - SCIENCE
    { id: "22", title: "Water Cycle", description: "Learn about water cycle", grade: "Grade 3", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - COMPUTER SCIENCE
    { id: "111", title: "Parts of a Computer", description: "Learn computer parts", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "112", title: "Input & Output Devices", description: "Learn about devices", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "113", title: "Keyboard Practice", description: "Practice typing", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "114", title: "Using a Mouse", description: "Learn mouse skills", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "115", title: "Internet Safety Basics", description: "Stay safe online", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - ASSIGNMENTS
    { id: "34", title: "Grade 3 Practice Assignment", description: "Practice test", grade: "Grade 3", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "121", title: "Weekly Test - Math & Science", description: "Weekly assessment", grade: "Grade 3", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "122", title: "Monthly Assessment - All Subjects", description: "Monthly test", grade: "Grade 3", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "123", title: "Revision Worksheet - Term 2", description: "Term revision", grade: "Grade 3", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - MATH
    { id: "23", title: "Division Practice", description: "Division worksheets", grade: "Grade 4", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "46", title: "Introduction to Fractions", description: "Learn fractions", grade: "Grade 4", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - ENGLISH
    { id: "24", title: "Essay Writing", description: "Essay writing practice", grade: "Grade 4", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - SCIENCE
    { id: "25", title: "Solar System", description: "Learn about planets", grade: "Grade 4", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "47", title: "Our Solar System", description: "Explore the solar system", grade: "Grade 4", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - COMPUTER SCIENCE
    { id: "129", title: "MS Paint Basics", description: "Learn MS Paint", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "130", title: "File Management", description: "Organize files", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "131", title: "Introduction to MS Word", description: "Learn MS Word", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "132", title: "Email Basics", description: "Learn about email", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "133", title: "Computer Viruses & Safety", description: "Stay safe online", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - ASSIGNMENTS
    { id: "35", title: "Grade 4 Test Paper", description: "Test paper", grade: "Grade 4", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "139", title: "Weekly Quiz - English & Math", description: "Weekly quiz", grade: "Grade 4", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "140", title: "Monthly Test - Mathematics", description: "Monthly test", grade: "Grade 4", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "141", title: "Revision Pack - Mid-Term", description: "Mid-term revision", grade: "Grade 4", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - MATH
    { id: "26", title: "Fractions & Decimals", description: "Learn fractions and decimals", grade: "Grade 5", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "48", title: "Decimals and Place Value", description: "Master decimals", grade: "Grade 5", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - ENGLISH
    { id: "27", title: "Advanced Grammar", description: "Advanced grammar skills", grade: "Grade 5", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "49", title: "Essay Writing and Paragraph Structure", description: "Essay writing", grade: "Grade 5", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - SCIENCE
    { id: "28", title: "Physics Basics", description: "Introduction to physics", grade: "Grade 5", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - COMPUTER SCIENCE
    { id: "147", title: "MS PowerPoint Basics", description: "Learn PowerPoint", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "148", title: "Introduction to Spreadsheets", description: "Learn spreadsheets", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "149", title: "Coding Basics - Scratch", description: "Learn coding", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "150", title: "Internet & Search Engines", description: "Learn to search", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "151", title: "Cyber Security for Kids", description: "Online safety", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - ASSIGNMENTS
    { id: "36", title: "Grade 5 Comprehensive Test", description: "Comprehensive test", grade: "Grade 5", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "157", title: "Pre-Board Examination", description: "Pre-board exam", grade: "Grade 5", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "158", title: "Final Revision - All Subjects", description: "Final revision", grade: "Grade 5", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "159", title: "Sample Paper - Term 1", description: "Sample paper", grade: "Grade 5", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialWorksheets));
  console.log("✅ Seeded", initialWorksheets.length, "initial worksheets");
};

// Worksheet CRUD operations
export const getAllWorksheets = (): WorksheetData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getWorksheetById = (id: string): WorksheetData | null => {
  const worksheets = getAllWorksheets();
  return worksheets.find(w => w.id === id) || null;
};

export const createWorksheet = (worksheet: Omit<WorksheetData, "id" | "createdAt" | "updatedAt">): WorksheetData => {
  const worksheets = getAllWorksheets();
  const newWorksheet: WorksheetData = {
    ...worksheet,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  worksheets.push(newWorksheet);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(worksheets));
  return newWorksheet;
};

export const updateWorksheet = (id: string, updates: Partial<WorksheetData>): WorksheetData | null => {
  const worksheets = getAllWorksheets();
  const index = worksheets.findIndex(w => w.id === id);
  
  if (index === -1) return null;
  
  worksheets[index] = {
    ...worksheets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(worksheets));
  return worksheets[index];
};

export const deleteWorksheet = (id: string): boolean => {
  const worksheets = getAllWorksheets();
  const filtered = worksheets.filter(w => w.id !== id);
  
  if (filtered.length === worksheets.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Get worksheets organized by grade and subject
export const getWorksheetsByGrade = (grade: string): WorksheetData[] => {
  return getAllWorksheets().filter(w => w.grade === grade);
};

export const getWorksheetsBySubject = (subject: string): WorksheetData[] => {
  return getAllWorksheets().filter(w => w.subject === subject);
};

export const getWorksheetsByGradeAndSubject = (grade: string, subject: string): WorksheetData[] => {
  return getAllWorksheets().filter(w => w.grade === grade && w.subject === subject);
};

// Category Management
const getDefaultCategories = (): CategoryData[] => {
  const subjects = [
    {
      id: "math",
      name: "Math",
      description: "Numbers, calculations, and problem solving",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      icon: "Calculator",
    },
    {
      id: "english",
      name: "English",
      description: "Reading, writing, and language skills",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
      icon: "BookOpen",
    },
    {
      id: "science",
      name: "Science",
      description: "Experiments, nature, and discovery",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      icon: "FlaskConical",
    },
    {
      id: "computer-science",
      name: "Computer Science",
      description: "Coding, technology, and digital skills",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      icon: "Monitor",
    },
    {
      id: "assignments",
      name: "Assignments",
      description: "Practice tests and homework",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      icon: "ClipboardList",
    },
  ];

  const grades = ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5"];
  const categories: CategoryData[] = [];

  // Create grade-specific categories for each subject
  grades.forEach((grade) => {
    subjects.forEach((subject) => {
      categories.push({
        id: `${grade}-${subject.id}`,
        name: subject.name,
        description: subject.description,
        imageUrl: subject.imageUrl,
        icon: subject.icon,
        grade,
        updatedAt: new Date().toISOString(),
      });
    });
  });

  return categories;
};

export const getAllCategories = (): CategoryData[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (!stored) {
    const defaults = getDefaultCategories();
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(stored);
};

export const getCategoryById = (id: string): CategoryData | undefined => {
  const categories = getAllCategories();
  return categories.find((c) => c.id === id);
};

export const getCategoriesByGrade = (grade: string): CategoryData[] => {
  const categories = getAllCategories();
  return categories.filter((c) => c.grade === grade);
};

export const getCategoryByGradeAndSubject = (grade: string, subject: string): CategoryData | undefined => {
  const categories = getAllCategories();
  return categories.find((c) => c.id === `${grade}-${subject}`);
};

export const updateCategory = (id: string, data: Partial<CategoryData>): void => {
  const categories = getAllCategories();
  const updated = categories.map((category) =>
    category.id === id
      ? { ...category, ...data, updatedAt: new Date().toISOString() }
      : category
  );
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
};

// Worksheet Image Overrides
const WORKSHEET_IMAGES_KEY = "smartkids_worksheet_images";

export const getWorksheetImageOverride = (worksheetId: string): string | null => {
  const overrides = localStorage.getItem(WORKSHEET_IMAGES_KEY);
  if (!overrides) return null;
  const parsed = JSON.parse(overrides);
  return parsed[worksheetId] || null;
};

export const setWorksheetImageOverride = (worksheetId: string, imageUrl: string): void => {
  const overrides = localStorage.getItem(WORKSHEET_IMAGES_KEY);
  const parsed = overrides ? JSON.parse(overrides) : {};
  parsed[worksheetId] = imageUrl;
  localStorage.setItem(WORKSHEET_IMAGES_KEY, JSON.stringify(parsed));
};

export const getAllWorksheetImageOverrides = (): Record<string, string> => {
  const overrides = localStorage.getItem(WORKSHEET_IMAGES_KEY);
  return overrides ? JSON.parse(overrides) : {};
};
