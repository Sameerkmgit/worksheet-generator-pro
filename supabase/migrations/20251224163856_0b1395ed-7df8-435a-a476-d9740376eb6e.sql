-- Add image_url column to worksheet_categories table
ALTER TABLE public.worksheet_categories
ADD COLUMN IF NOT EXISTS image_url text;