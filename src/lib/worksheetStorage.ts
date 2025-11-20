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
    // Grade 1 Math
    {
      id: "ws-g1-math-1",
      title: "Numbers 1-20 - Counting and Writing",
      description: "Practice counting and writing numbers from 1 to 20",
      grade: "Grade 1",
      subject: "math",
      pdfUrl: "/worksheets/grade1-math-numbers1-20.pdf",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ws-g1-math-2",
      title: "Simple Addition - Numbers 1 to 10",
      description: "Basic addition practice with single-digit numbers",
      grade: "Grade 1",
      subject: "math",
      pdfUrl: "/worksheets/grade1-math-addition.pdf",
      imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Grade 1 English
    {
      id: "20",
      title: "Alphabet Tracing",
      description: "Practice tracing uppercase and lowercase letters A-Z",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-alphabet-tracing.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "14",
      title: "Letter Recognition",
      description: "Identify and recognize uppercase and lowercase letters",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-letter-recognition.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "41",
      title: "Alphabet Writing Practice (Letters A to M)",
      description: "Practice writing uppercase and lowercase letters A through M",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-alphabet-writing.pdf",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "55",
      title: "Vowels & Consonants",
      description: "Learn to identify and differentiate between vowels and consonants",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-vowels-consonants.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "56",
      title: "CVC Words (Cat, Dog, Sun)",
      description: "Practice reading and writing simple consonant-vowel-consonant words",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-cvc-words.pdf",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "57",
      title: "Rhyming Words",
      description: "Identify and create rhyming word pairs",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-rhyming-words.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "58",
      title: "Simple Sentences",
      description: "Practice forming and writing simple sentences",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-simple-sentences.pdf",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "59",
      title: "Sight Words (Dolch List)",
      description: "Learn and practice common sight words from the Dolch list",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-sight-words.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ws-g1-eng-2",
      title: "Sight Words Practice",
      description: "Learn and practice common sight words for Grade 1",
      grade: "Grade 1",
      subject: "english",
      pdfUrl: "/worksheets/grade1-english-sight-words.pdf",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Grade 2 Math
    {
      id: "ws-g2-math-1",
      title: "Multiplication Tables - 2 and 5",
      description: "Practice multiplication tables of 2 and 5",
      grade: "Grade 2",
      subject: "math",
      pdfUrl: "/worksheets/grade2-math-multiplication.pdf",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Grade 2 English
    {
      id: "ws-g2-eng-1",
      title: "Nouns and Verbs",
      description: "Identify and practice nouns and verbs",
      grade: "Grade 2",
      subject: "english",
      pdfUrl: "/worksheets/grade2-english-nouns-verbs.pdf",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
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
