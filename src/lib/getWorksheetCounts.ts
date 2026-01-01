import { supabase } from "@/integrations/supabase/client";

export interface GradeCounts {
  [grade: string]: number;
}

export const getWorksheetCountsByGrade = async (): Promise<GradeCounts> => {
  const { data, error } = await supabase
    .from('worksheet_categories')
    .select('grade, worksheets(id)');

  if (error) {
    console.error("Error fetching worksheet counts:", error);
    return {};
  }

  const counts: GradeCounts = data.reduce((acc, row) => {
    const worksheets = row.worksheets as { id: string }[] | null;
    acc[row.grade] = (acc[row.grade] || 0) + (worksheets?.length || 0);
    return acc;
  }, {} as GradeCounts);

  return counts;
};
