-- Add is_archived column to worksheets table for soft deletes
ALTER TABLE public.worksheets 
ADD COLUMN IF NOT EXISTS is_archived boolean DEFAULT false;

-- Create index for better performance on archived queries
CREATE INDEX IF NOT EXISTS idx_worksheets_is_archived ON public.worksheets(is_archived);

-- Add updated_at trigger if not exists
CREATE OR REPLACE FUNCTION public.update_worksheets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_worksheets_updated_at_trigger ON public.worksheets;
CREATE TRIGGER update_worksheets_updated_at_trigger
  BEFORE UPDATE ON public.worksheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_worksheets_updated_at();