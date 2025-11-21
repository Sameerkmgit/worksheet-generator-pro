// Utility functions for managing worksheet and category data using Supabase
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for worksheet data
const worksheetSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  grade: z.enum(["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"], {
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
  description: string;
  grade: string;
  subject: string;
  pdfUrl: string;
  imageUrl: string;
  heading?: string;
  intro?: string;
  questions?: any[];
  skills?: string[];
  usage?: string;
  faq?: any[];
  seo?: any;
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

// Helper to convert DB row to WorksheetData
const mapWorksheetFromDB = (w: any): WorksheetData => ({
  id: w.id,
  title: w.title,
  description: w.description || '',
  grade: w.grade,
  subject: w.subject,
  pdfUrl: w.pdf_url,
  imageUrl: w.image_url || '',
  heading: w.heading,
  intro: w.intro,
  questions: w.questions as any,
  skills: w.skills,
  usage: w.usage,
  faq: w.faq as any,
  seo: w.seo as any,
  createdAt: w.created_at,
  updatedAt: w.updated_at,
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
  const { data: existingWorksheets } = await supabase
    .from('worksheets')
    .select('id')
    .limit(1);
  
  if (existingWorksheets && existingWorksheets.length > 0) {
    console.log("Worksheets already seeded. Skipping.");
    return;
  }

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
  ];

  const dbWorksheets = worksheets.map(w => ({
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

  const { error } = await supabase.from('worksheets').insert(dbWorksheets);
  if (error) {
    console.error("Error seeding worksheets:", error);
  } else {
    console.log("Initial worksheets seeded successfully!");
  }
};

// Fetch all worksheets
export const getAllWorksheets = async (): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
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

// Get worksheets by grade
export const getWorksheetsByGrade = async (grade: string): Promise<WorksheetData[]> => {
  // Convert URL format (grade-1) to database format (Grade 1)
  const gradeTitle = grade.split('-').map((word, index) => 
    index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
  ).join(' ');
  
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .ilike('grade', gradeTitle)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets by grade:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Get worksheets by subject
export const getWorksheetsBySubject = async (subject: string): Promise<WorksheetData[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .ilike('subject', subject)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching worksheets by subject:", error);
    return [];
  }

  return (data || []).map(mapWorksheetFromDB);
};

// Get worksheets by grade and subject
export const getWorksheetsByGradeAndSubject = async (
  grade: string,
  subject: string
): Promise<WorksheetData[]> => {
  // Convert URL format (grade-1) to database format (Grade 1)
  const gradeTitle = grade.split('-').map((word, index) => 
    index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
  ).join(' ');
  
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .ilike('grade', gradeTitle)
    .ilike('subject', subject)
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

// Delete a worksheet
export const deleteWorksheet = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('worksheets')
    .delete()
    .eq('id', id);

  return !error;
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

  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];

  const categories: CategoryData[] = [];
  for (const grade of grades) {
    for (const subject of subjects) {
      categories.push({
        id: `${grade.toLowerCase().replace(" ", "-")}-${subject.id}`,
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
    id: c.id,
    name: c.name,
    grade: c.grade,
    subject: c.subject,
    description: c.description,
    icon: c.icon,
    image_url: c.imageUrl,
    worksheet_count: c.worksheetCount || 0,
  }));

  await supabase.from('categories').insert(dbCategories);
};

// Fetch all categories
export const getAllCategories = async (): Promise<CategoryData[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('grade', { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  if (!data || data.length === 0) {
    await seedDefaultCategories();
    const { data: newData } = await supabase.from('categories').select('*');
    return (newData || []).map(mapCategoryFromDB);
  }

  return data.map(mapCategoryFromDB);
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<CategoryData | undefined> => {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  return data ? mapCategoryFromDB(data) : undefined;
};

// Get categories by grade
export const getCategoriesByGrade = async (grade: string): Promise<CategoryData[]> => {
  // Convert URL format (grade-1) to database format (Grade 1)
  const gradeTitle = grade.split('-').map((word, index) => 
    index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
  ).join(' ');
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('grade', gradeTitle);

  if (error) return [];
  return (data || []).map(mapCategoryFromDB);
};

// Get category by grade and subject
export const getCategoryByGradeAndSubject = async (
  grade: string,
  subject: string
): Promise<CategoryData | undefined> => {
  // Convert URL format (grade-1) to database format (Grade 1)
  const gradeTitle = grade.split('-').map((word, index) => 
    index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
  ).join(' ');
  
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('grade', gradeTitle)
    .eq('subject', subject)
    .single();

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
    .from('categories')
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
