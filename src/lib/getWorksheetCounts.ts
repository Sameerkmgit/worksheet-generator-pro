import { supabase } from "@/integrations/supabase/client";

export interface GradeCounts {
  [grade: string]: number;
}

export const getWorksheetCountsByGrade = async (): Promise<GradeCounts> => {
  // Join worksheets with worksheet_categories to get accurate counts per grade
  const { data, error } = await supabase
    .from('worksheets')
    .select(`
      id,
      category_id,
      worksheet_categories!inner(grade)
    `)
    .eq('is_archived', false);

  if (error) {
    console.error("Error fetching worksheet counts:", error);
    return {};
  }

  // Count worksheets by grade from worksheet_categories
  const counts: GradeCounts = {};
  data?.forEach((worksheet) => {
    const grade = (worksheet.worksheet_categories as { grade: string })?.grade;
    if (grade) {
      counts[grade] = (counts[grade] || 0) + 1;
    }
  });

  return counts;
};
