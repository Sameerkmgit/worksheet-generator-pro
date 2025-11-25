-- Create worksheet_categories table
CREATE TABLE public.worksheet_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grade TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(grade, subject, title)
);

-- Enable RLS on worksheet_categories
ALTER TABLE public.worksheet_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for worksheet_categories
CREATE POLICY "Anyone can view worksheet categories"
ON public.worksheet_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert worksheet categories"
ON public.worksheet_categories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update worksheet categories"
ON public.worksheet_categories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete worksheet categories"
ON public.worksheet_categories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add category_id to worksheets table
ALTER TABLE public.worksheets
ADD COLUMN category_id UUID REFERENCES public.worksheet_categories(id) ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX idx_worksheets_category_id ON public.worksheets(category_id);
CREATE INDEX idx_worksheet_categories_grade_subject ON public.worksheet_categories(grade, subject);

-- Create trigger for worksheet_categories updated_at
CREATE TRIGGER update_worksheet_categories_updated_at
BEFORE UPDATE ON public.worksheet_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();