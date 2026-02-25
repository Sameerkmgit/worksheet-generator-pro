ALTER TABLE public.worksheets ADD COLUMN difficulty text DEFAULT NULL;

-- Add an index for filtering
CREATE INDEX idx_worksheets_difficulty ON public.worksheets(difficulty);