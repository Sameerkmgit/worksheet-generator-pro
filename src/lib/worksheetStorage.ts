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

const STORAGE_KEY = "smartkids_worksheets";
const ADMIN_KEY = "smartkids_admin_auth";

// Admin authentication
export const adminLogin = (password: string): boolean => {
  // Hardcoded password - change this for security
  const ADMIN_PASSWORD = "smartkids2024";
  
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
