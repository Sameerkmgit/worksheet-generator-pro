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
