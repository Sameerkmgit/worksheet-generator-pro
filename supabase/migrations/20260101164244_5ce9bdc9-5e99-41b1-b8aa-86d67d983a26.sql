-- Add sort_order column to worksheet_categories
ALTER TABLE public.worksheet_categories 
ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;