
-- Tighten worksheet-pdfs storage policies to admin only
DROP POLICY IF EXISTS "Admins can upload worksheet PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update worksheet PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete worksheet PDFs" ON storage.objects;

CREATE POLICY "Admins can upload worksheet PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'worksheet-pdfs' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update worksheet PDFs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'worksheet-pdfs' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete worksheet PDFs"
ON storage.objects FOR DELETE
USING (bucket_id = 'worksheet-pdfs' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Restrict subcategories SELECT: archived rows only visible to admins
DROP POLICY IF EXISTS "Anyone can view subcategories" ON public.worksheet_subcategories;
DROP POLICY IF EXISTS "Public can read active subcategories" ON public.worksheet_subcategories;

CREATE POLICY "Public can read active subcategories"
ON public.worksheet_subcategories FOR SELECT
USING (is_archived = false OR public.has_role(auth.uid(), 'admin'::public.app_role));
