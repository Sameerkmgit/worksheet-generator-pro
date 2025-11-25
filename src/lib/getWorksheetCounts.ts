import { supabase } from "@/integrations/supabase/client";

export interface GradeCounts {
  [grade: string]: number;
}

export const getWorksheetCountsByGrade = async (): Promise<GradeCounts> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('grade')
    .eq('is_archived', false);

  if (error) {
    console.error("Error fetching worksheet counts:", error);
    return {};
  }

  // Count worksheets by grade
  const counts: GradeCounts = {};
  data?.forEach((worksheet) => {
    const grade = worksheet.grade;
    counts[grade] = (counts[grade] || 0) + 1;
  });

  return counts;
};
