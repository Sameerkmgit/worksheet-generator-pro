import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SeoOverride {
  intro: string | null;
  key_skills_json: string[] | null;
  example_questions_json: string[] | null;
  how_to_use: string | null;
  what_kids_learn_json: string[] | null;
  practice_tips: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export function useSeoOverride(pagePath: string | undefined): SeoOverride | null {
  const [override, setOverride] = useState<SeoOverride | null>(null);

  useEffect(() => {
    if (!pagePath) return;

    const fetchOverride = async () => {
      const { data } = await supabase
        .from("seo_page_overrides" as any)
        .select("intro, key_skills_json, example_questions_json, how_to_use, what_kids_learn_json, practice_tips, meta_title, meta_description")
        .eq("page_path", pagePath)
        .eq("is_active", true)
        .maybeSingle();

      if (data) {
        setOverride({
          intro: (data as any).intro,
          key_skills_json: (data as any).key_skills_json as string[] | null,
          example_questions_json: (data as any).example_questions_json as string[] | null,
          how_to_use: (data as any).how_to_use,
          what_kids_learn_json: (data as any).what_kids_learn_json as string[] | null,
          practice_tips: (data as any).practice_tips,
          meta_title: (data as any).meta_title,
          meta_description: (data as any).meta_description,
        });
      }
    };

    fetchOverride();
  }, [pagePath]);

  return override;
}
