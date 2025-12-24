// Utility functions for managing worksheet and category data using Supabase
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for worksheet data
const worksheetSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  grade: z.enum(["1", "2", "3", "4", "5"], {
    errorMap: () => ({ message: "Invalid grade level" })
  }),
  subject: z.enum(["math", "english", "science", "computer-science", "assignments"], {
    errorMap: () => ({ message: "Invalid subject" })
  }),
  pdfUrl: z.string().url("Invalid PDF URL"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export interface WorksheetData {
  id: string;
  title: string;
  description?: string;
  grade: string;
  subject: string;
  pdfUrl: string;
  imageUrl?: string;
  content?: string;
  heading?: string;
  intro?: string;
  questions?: any[];
  skills?: string[];
  usage?: string;
  faq?: any[];
  seo?: any;
  categoryId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WorksheetCategoryData {
  id: string;
  grade: string;
  subject: string;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SubcategoryData {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  sortOrder: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  grade: string;
  subject: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  worksheetCount?: number;
}

// simple subject-based fallbacks
const WORKSHEET_SUBJECT_FALLBACKS: Record<string, string> = {
  math: "/images/fallback-math.jpg",
  english: "/images/fallback-english.jpg",
  science: "/images/fallback-science.jpg",
  "computer-science": "/images/fallback-computer.jpg",
  assignments: "/images/fallback-assignments.jpg",
  default: "/images/fallback-generic.jpg",
};

export const getWorksheetCardImage = (worksheet: WorksheetData): string => {
  // 1) if user set an image in the edit page, ALWAYS use that
  if (worksheet.imageUrl && worksheet.imageUrl.trim() !== "") {
    return worksheet.imageUrl;
  }
  // 2) otherwise, fall back by subject
  return (
    WORKSHEET_SUBJECT_FALLBACKS[worksheet.subject] ||
    WORKSHEET_SUBJECT_FALLBACKS.default
  );
};

// Helper to convert DB row to WorksheetData
const mapWorksheetFromDB = (w: any): WorksheetData => ({
  id: w.id,
  title: w.title,
  description: w.description || '',
  grade: w.grade,
  subject: w.subject,
  pdfUrl: w.pdf_url,
  // IMPORTANT: just use the DB value here, no fallback
  imageUrl: w.image_url || '',
  content: w.content || '',
  heading: w.heading,
  intro: w.intro,
  questions: w.questions as any,
  skills: w.skills,
  usage: w.usage,
  faq: w.faq as any,
  seo: w.seo as any,
  categoryId: w.category_id,
  createdAt: w.created_at,
  updatedAt: w.updated_at,
});

// Helper to convert DB row to WorksheetCategoryData
const mapWorksheetCategoryFromDB = (c: any): WorksheetCategoryData => ({
  id: c.id,
  grade: c.grade,
  subject: c.subject,
  title: c.title,
  description: c.description,
  imageUrl: c.image_url,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});

// Helper to convert CategoryData to DB format
const mapCategoryFromDB = (c: any): CategoryData => ({
  id: c.id,
  name: c.name,
  grade: c.grade,
  subject: c.subject,
  description: c.description,
  icon: c.icon,
  imageUrl: c.image_url,
  worksheetCount: c.worksheet_count,
});

// Helper to convert DB row to SubcategoryData
const mapSubcategoryFromDB = (s: any): SubcategoryData => ({
  id: s.id,
  categoryId: s.category_id,
  title: s.title,
  slug: s.slug,
  sortOrder: s.sort_order,
  isArchived: s.is_archived,
  createdAt: s.created_at,
  updatedAt: s.updated_at,
});

// Admin authentication - now uses Supabase Auth
export const isAdminAuthenticated = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle();
  
  return !!data;
};

// For backward compatibility with AdminLogin
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Login error:", error);
    return false;
  }
  return await isAdminAuthenticated();
};

export const adminLogout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

// Seed initial worksheets if none exist
export const seedInitialWorksheets = async (): Promise<void> => {
  console.log("🌱 Starting worksheet seeding...");
  
  const worksheets: WorksheetData[] = [
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
    { id: "301", title: "Division Practice", description: "Learn division basics", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "302", title: "Multiplication (3-Digit)", description: "Advanced multiplication", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "303", title: "Fractions Basics", description: "Introduction to fractions", grade: "Grade 3", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - ENGLISH
    { id: "304", title: "Reading Comprehension", description: "Advanced reading practice", grade: "Grade 3", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "305", title: "Grammar & Tenses", description: "Learn verb tenses", grade: "Grade 3", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - SCIENCE
    { id: "306", title: "Solar System", description: "Learn about planets", grade: "Grade 3", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "307", title: "States of Matter", description: "Solid, liquid, gas", grade: "Grade 3", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - COMPUTER SCIENCE
    { id: "308", title: "Basic Coding Concepts", description: "Introduction to programming", grade: "Grade 3", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 3 - ASSIGNMENTS
    { id: "309", title: "Grade 3 Monthly Test", description: "Comprehensive assessment", grade: "Grade 3", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - MATH
    { id: "401", title: "Introduction to Fractions", description: "Learn fraction basics", grade: "Grade 4", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "402", title: "Decimals & Place Value", description: "Understand decimals", grade: "Grade 4", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - ENGLISH
    { id: "403", title: "Essay Writing Basics", description: "Learn essay structure", grade: "Grade 4", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - SCIENCE
    { id: "404", title: "Our Solar System", description: "Planets and astronomy", grade: "Grade 4", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "405", title: "Human Body Systems", description: "Learn body systems", grade: "Grade 4", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - COMPUTER SCIENCE
    { id: "406", title: "Internet Safety", description: "Online safety basics", grade: "Grade 4", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 4 - ASSIGNMENTS
    { id: "407", title: "Grade 4 Revision Pack", description: "Complete revision", grade: "Grade 4", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - MATH
    { id: "501", title: "Decimals and Place Value", description: "Advanced decimal operations", grade: "Grade 5", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "502", title: "Percentages & Ratios", description: "Learn percentages", grade: "Grade 5", subject: "math", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - ENGLISH
    { id: "503", title: "Essay Writing and Paragraph Structure", description: "Advanced writing skills", grade: "Grade 5", subject: "english", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - SCIENCE
    { id: "504", title: "Ecosystems & Food Chains", description: "Environmental science", grade: "Grade 5", subject: "science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - COMPUTER SCIENCE
    { id: "505", title: "Advanced Coding Concepts", description: "Programming fundamentals", grade: "Grade 5", subject: "computer-science", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

    // GRADE 5 - ASSIGNMENTS
    { id: "506", title: "Grade 5 Final Assessment", description: "Year-end assessment", grade: "Grade 5", subject: "assignments", pdfUrl: "/worksheets/placeholder.pdf", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  // Fetch existing worksheets to check what's already in the database
  const { data: existingWorksheets } = await supabase
    .from('worksheets')
    .select('title, grade, subject');
  
  const existingSet = new Set(
    (existingWorksheets || []).map(w => `${w.title}|${w.grade}|${w.subject}`)
  );
  
  console.log(`📊 Found ${existingWorksheets?.length || 0} existing worksheets in database`);
  
  // Filter to only worksheets that don't exist yet
  const newWorksheets = worksheets.filter(w => {
    const key = `${w.title}|${w.grade}|${w.subject}`;
    return !existingSet.has(key);
  });
  
  console.log(`✨ Found ${newWorksheets.length} new worksheets to add`);
  
  if (newWorksheets.length === 0) {
    console.log("✅ All worksheets already exist. No seeding needed.");
    return;
  }
  
  // Transform to database format
  const dbWorksheets = newWorksheets.map(w => ({
    id: w.id,
    title: w.title,
    description: w.description,
    grade: w.grade,
    subject: w.subject,
    pdf_url: w.pdfUrl,
    image_url: w.imageUrl,
    heading: w.heading,
    intro: w.intro,
    questions: w.questions,
    skills: w.skills,
    usage: w.usage,
    faq: w.faq,
    seo: w.seo,
  }));

  // Insert only new worksheets
  const { error } = await supabase.from('worksheets').insert(dbWorksheets);
  if (error) {
    console.error("❌ Error seeding worksheets:", error);
  } else {
    console.log(`✅ Successfully added ${newWorksheets.length} new worksheets!`);
  }
};

// Fetch all worksheets (excluding archived)
export const getAllWorksheets = async (): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Fetch worksheet by ID
export const getWorksheetById = async (id: string): Promise<WorksheetData | null> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching worksheet with id ${id}:`, error);
    return null;
  }

  return mapWorksheetFromDB(data);
};

// Get worksheets by grade (excluding archived)
export const getWorksheetsByGrade = async (grade: string): Promise<WorksheetData[]> => {
  // Convert URL format (grade-1) to database format (1)
  const gradeNum = grade.replace('grade-', '');
  
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('grade', gradeNum)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets by grade:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Get worksheets by subject (excluding archived)
export const getWorksheetsBySubject = async (subject: string): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .ilike('subject', subject)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets by subject:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Get worksheets by grade and subject (excluding archived)
export const getWorksheetsByGradeAndSubject = async (
  grade: string,
  subject: string
): Promise<WorksheetData[]> => {
  // Convert URL format (grade-1) to database format (1)
  const gradeNum = grade.replace('grade-', '');
  
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('grade', gradeNum)
    .eq('subject', subject)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Create a new worksheet
export const createWorksheet = async (
  worksheet: Omit<WorksheetData, "id" | "createdAt" | "updatedAt">
): Promise<WorksheetData | null> => {
  // Validate input data
  try {
    worksheetSchema.parse({
      title: worksheet.title,
      description: worksheet.description,
      grade: worksheet.grade,
      subject: worksheet.subject,
      pdfUrl: worksheet.pdfUrl,
      imageUrl: worksheet.imageUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error(error.errors[0].message);
    }
    throw error;
  }

  const newId = Date.now().toString();
  const { data, error } = await supabase
    .from('worksheets')
    .insert({
      id: newId,
      title: worksheet.title.trim(),
      description: worksheet.description,
      grade: worksheet.grade,
      subject: worksheet.subject,
      pdf_url: worksheet.pdfUrl,
      image_url: worksheet.imageUrl,
      content: worksheet.content,
      category_id: worksheet.categoryId,
      heading: worksheet.heading,
      intro: worksheet.intro,
      questions: worksheet.questions,
      skills: worksheet.skills,
      usage: worksheet.usage,
      faq: worksheet.faq,
      seo: worksheet.seo,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("Error creating worksheet:", error);
    return null;
  }

  return mapWorksheetFromDB(data);
};

// Update a worksheet
export const updateWorksheet = async (
  id: string,
  updates: Partial<WorksheetData>
): Promise<WorksheetData | null> => {
  // Validate input data if key fields are being updated
  if (updates.title || updates.grade || updates.subject || updates.pdfUrl || updates.imageUrl) {
    try {
      const validationData: any = {};
      if (updates.title) validationData.title = updates.title;
      if (updates.grade) validationData.grade = updates.grade;
      if (updates.subject) validationData.subject = updates.subject;
      if (updates.pdfUrl) validationData.pdfUrl = updates.pdfUrl;
      if (updates.imageUrl !== undefined) validationData.imageUrl = updates.imageUrl;
      
      // Only validate provided fields
      worksheetSchema.partial().parse(validationData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        throw new Error(error.errors[0].message);
      }
      throw error;
    }
  }

  const updateData: any = {};
  if (updates.title) updateData.title = updates.title.trim();
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.grade) updateData.grade = updates.grade;
  if (updates.subject) updateData.subject = updates.subject;
  if (updates.pdfUrl) updateData.pdf_url = updates.pdfUrl;
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
  if (updates.content !== undefined) updateData.content = updates.content;
  if (updates.categoryId !== undefined) updateData.category_id = updates.categoryId;
  if (updates.heading !== undefined) updateData.heading = updates.heading;
  if (updates.intro !== undefined) updateData.intro = updates.intro;
  if (updates.questions !== undefined) updateData.questions = updates.questions;
  if (updates.skills !== undefined) updateData.skills = updates.skills;
  if (updates.usage !== undefined) updateData.usage = updates.usage;
  if (updates.faq !== undefined) updateData.faq = updates.faq;
  if (updates.seo !== undefined) updateData.seo = updates.seo;

  const { data, error } = await supabase
    .from('worksheets')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error("Error updating worksheet:", error);
    return null;
  }

  return mapWorksheetFromDB(data);
};

// Soft delete a worksheet (set is_archived = true)
export const deleteWorksheet = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('worksheets')
    .update({ is_archived: true })
    .eq('id', id);

  return !error;
};

// ==================== Worksheet Category Functions ====================

// Get all worksheet categories
export const getAllWorksheetCategories = async (): Promise<WorksheetCategoryData[]> => {
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching worksheet categories:", error);
    return [];
  }

  return data.map(mapWorksheetCategoryFromDB);
};

// Get worksheet categories by grade
export const getWorksheetCategoriesByGrade = async (grade: string): Promise<WorksheetCategoryData[]> => {
  // Convert URL format (grade-1) to database format (1)
  const gradeNum = grade.replace('grade-', '');
  
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('*')
    .eq('grade', gradeNum)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching worksheet categories by grade:", error);
    return [];
  }

  return data.map(mapWorksheetCategoryFromDB);
};

// Get worksheet categories by grade and subject
export const getWorksheetCategoriesByGradeAndSubject = async (
  gradeSlug: string,
  subjectSlug: string
): Promise<WorksheetCategoryData[]> => {
  // Convert URL slug "grade-1" -> "1"
  const gradeNum = gradeSlug.replace('grade-', '');

  const { data, error } = await supabase
    .from("worksheet_categories")
    .select("*")
    .eq("grade", gradeNum)
    .eq("subject", subjectSlug)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(
      "Error fetching worksheet categories by grade and subject:",
      error
    );
    return [];
  }

  return data.map(mapWorksheetCategoryFromDB);
};

// Get worksheet category by ID
export const getWorksheetCategoryById = async (id: string): Promise<WorksheetCategoryData | null> => {
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    console.error("Error fetching worksheet category by ID:", error);
    return null;
  }

  return mapWorksheetCategoryFromDB(data);
};

// Create a new worksheet category
export const createWorksheetCategory = async (
  category: Omit<WorksheetCategoryData, "id" | "createdAt" | "updatedAt">
): Promise<{ data: WorksheetCategoryData | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('worksheet_categories')
    .insert({
      grade: category.grade,
      subject: category.subject,
      title: category.title.trim(),
      description: category.description,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating worksheet category:", error);
    if (error.code === '23505') {
      return { data: null, error: `A category with title "${category.title}" already exists for ${category.grade} ${category.subject}` };
    }
    return { data: null, error: error.message };
  }

  return { data: mapWorksheetCategoryFromDB(data), error: null };
};

// Update a worksheet category
export const updateWorksheetCategory = async (
  id: string,
  updates: Partial<WorksheetCategoryData>
): Promise<WorksheetCategoryData | null> => {
  const updateData: any = {};
  if (updates.grade) updateData.grade = updates.grade;
  if (updates.subject) updateData.subject = updates.subject;
  if (updates.title) updateData.title = updates.title.trim();
  if (updates.description !== undefined) updateData.description = updates.description;

  const { data, error } = await supabase
    .from('worksheet_categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error("Error updating worksheet category:", error);
    return null;
  }

  return mapWorksheetCategoryFromDB(data);
};

// Delete a worksheet category
export const deleteWorksheetCategory = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('worksheet_categories')
    .delete()
    .eq('id', id);

  return !error;
};

// Get worksheets by category ID
export const getWorksheetsByCategoryId = async (categoryId: string): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching worksheets by category ID:", error);
    return [];
  }

  return data.map(mapWorksheetFromDB);
};

// Default categories
const getDefaultCategories = (): CategoryData[] => {
  const subjects = [
    { id: "math", name: "Math", icon: "📐", description: "Practice math problems" },
    { id: "english", name: "English", icon: "📚", description: "Learn grammar and writing" },
    { id: "science", name: "Science", icon: "🔬", description: "Explore science concepts" },
    { id: "computer-science", name: "Computer Science", icon: "💻", description: "Learn digital literacy" },
    { id: "assignments", name: "Assignments", icon: "📋", description: "Practice tests and assignments" },
  ];

  const grades = ["1", "2", "3", "4", "5"];

  const categories: CategoryData[] = [];
  for (const grade of grades) {
    for (const subject of subjects) {
      categories.push({
        id: `grade-${grade}-${subject.id}`,
        name: subject.name,
        grade,
        subject: subject.id,
        description: subject.description,
        icon: subject.icon,
        imageUrl: "",
        worksheetCount: 0,
      });
    }
  }

  return categories;
};

// Seed default categories
const seedDefaultCategories = async () => {
  const defaultCategories = getDefaultCategories();
  const dbCategories = defaultCategories.map(c => ({
    grade: c.grade,
    subject: c.subject,
    title: c.name,
    description: c.description,
  }));

  await supabase.from('worksheet_categories').insert(dbCategories);
};

// Fetch all categories
export const getAllCategories = async (): Promise<CategoryData[]> => {
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('*')
    .order('grade', { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  if (!data || data.length === 0) {
    await seedDefaultCategories();
    const { data: newData } = await supabase.from('worksheet_categories').select('*');
    return (newData || []).map(mapCategoryFromDB);
  }

  return data.map(mapCategoryFromDB);
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<CategoryData | undefined> => {
  const { data } = await supabase
    .from('worksheet_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return data ? mapCategoryFromDB(data) : undefined;
};

// Get categories by grade
export const getCategoriesByGrade = async (grade: string): Promise<CategoryData[]> => {
  // Convert URL format (grade-1) to database format (1)
  const gradeNum = grade.replace('grade-', '');
  
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('*')
    .eq('grade', gradeNum);

  if (error) return [];
  return (data || []).map(mapCategoryFromDB);
};

// Get category by grade and subject
export const getCategoryByGradeAndSubject = async (
  grade: string,
  subject: string
): Promise<CategoryData | undefined> => {
  // Convert URL format (grade-1) to database format (1)
  const gradeNum = grade.replace('grade-', '');
  
  const { data } = await supabase
    .from('worksheet_categories')
    .select('*')
    .eq('grade', gradeNum)
    .eq('subject', subject)
    .maybeSingle();

  return data ? mapCategoryFromDB(data) : undefined;
};

// Update category
export const updateCategory = async (id: string, updates: Partial<CategoryData>): Promise<void> => {
  const updateData: any = {};
  if (updates.name) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
  if (updates.icon) updateData.icon = updates.icon;
  if (updates.worksheetCount !== undefined) updateData.worksheet_count = updates.worksheetCount;

  await supabase
    .from('worksheet_categories')
    .update(updateData)
    .eq('id', id);
};

// Worksheet image overrides
export const getWorksheetImageOverride = async (worksheetId: string): Promise<string | null> => {
  const { data } = await supabase
    .from('worksheet_image_overrides')
    .select('image_url')
    .eq('worksheet_id', worksheetId)
    .maybeSingle();

  return data?.image_url || null;
};

export const setWorksheetImageOverride = async (worksheetId: string, imageUrl: string): Promise<void> => {
  const { error } = await supabase
    .from('worksheet_image_overrides')
    .upsert({
      worksheet_id: worksheetId,
      image_url: imageUrl,
    });
  
  if (error) {
    console.error('Failed to save image override:', error);
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

export const getAllWorksheetImageOverrides = async (): Promise<Record<string, string>> => {
  const { data } = await supabase
    .from('worksheet_image_overrides')
    .select('*');

  const overrides: Record<string, string> = {};
  (data || []).forEach(item => {
    overrides[item.worksheet_id] = item.image_url;
  });
  return overrides;
};

// =========== SUBCATEGORY FUNCTIONS ===========

// Get subcategories by category ID
export const getSubcategoriesByCategoryId = async (categoryId: string): Promise<SubcategoryData[]> => {
  const { data, error } = await supabase
    .from('worksheet_subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_archived', false)
    .order('sort_order', { ascending: true });

  if (error || !data) {
    console.error("Error fetching subcategories by category ID:", error);
    return [];
  }

  return data.map(mapSubcategoryFromDB);
};

// Get subcategory by ID
export const getSubcategoryById = async (id: string): Promise<SubcategoryData | null> => {
  const { data, error } = await supabase
    .from('worksheet_subcategories')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    console.error("Error fetching subcategory by ID:", error);
    return null;
  }

  return mapSubcategoryFromDB(data);
};

// Get worksheets by subcategory ID
export const getWorksheetsBySubcategoryId = async (subcategoryId: string): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .eq('subcategory_id', subcategoryId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching worksheets by subcategory ID:", error);
    return [];
  }

  return data.map(mapWorksheetFromDB);
};
