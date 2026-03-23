
-- Create seo_page_overrides table
CREATE TABLE public.seo_page_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL CHECK (page_type IN ('subject', 'topic')),
  grade text NOT NULL,
  subject text NOT NULL,
  topic_slug text,
  page_path text NOT NULL,
  intro text,
  key_skills_json jsonb,
  example_questions_json jsonb,
  how_to_use text,
  what_kids_learn_json jsonb,
  practice_tips text,
  meta_title text,
  meta_description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Unique index on page_path
CREATE UNIQUE INDEX idx_seo_page_overrides_page_path ON public.seo_page_overrides (page_path);

-- Composite indexes
CREATE INDEX idx_seo_overrides_type_grade_subject ON public.seo_page_overrides (page_type, grade, subject);
CREATE INDEX idx_seo_overrides_type_grade_subject_topic ON public.seo_page_overrides (page_type, grade, subject, topic_slug);

-- updated_at trigger
CREATE TRIGGER trg_seo_page_overrides_updated_at
  BEFORE UPDATE ON public.seo_page_overrides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.seo_page_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active overrides"
  ON public.seo_page_overrides FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage overrides"
  ON public.seo_page_overrides FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
