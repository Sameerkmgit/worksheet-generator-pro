
-- Add slug column to worksheets
ALTER TABLE public.worksheets ADD COLUMN slug text;

-- Create unique index on slug (partial - only non-null, non-archived)
CREATE UNIQUE INDEX idx_worksheets_slug_unique ON public.worksheets (slug) WHERE slug IS NOT NULL;

-- Create index for fast slug lookups
CREATE INDEX idx_worksheets_slug ON public.worksheets (slug) WHERE is_archived = false;
