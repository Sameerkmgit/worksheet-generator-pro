
-- Create worksheet-pdfs storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('worksheet-pdfs', 'worksheet-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can read worksheet PDFs"
ON storage.objects FOR SELECT
USING (bucket_id = 'worksheet-pdfs');

-- Allow admin uploads
CREATE POLICY "Admins can upload worksheet PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'worksheet-pdfs' AND auth.role() = 'authenticated');

-- Allow admin updates
CREATE POLICY "Admins can update worksheet PDFs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'worksheet-pdfs' AND auth.role() = 'authenticated');

-- Allow admin deletes
CREATE POLICY "Admins can delete worksheet PDFs"
ON storage.objects FOR DELETE
USING (bucket_id = 'worksheet-pdfs' AND auth.role() = 'authenticated');
