-- Add content column to worksheets table to store worksheet questions
ALTER TABLE public.worksheets 
ADD COLUMN content text;