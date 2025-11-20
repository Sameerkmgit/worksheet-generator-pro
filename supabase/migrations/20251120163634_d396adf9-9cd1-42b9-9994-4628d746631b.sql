-- Allow anonymous uploads to worksheet-images bucket (admin only feature)
DROP POLICY IF EXISTS "Authenticated users can upload worksheet images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update worksheet images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete worksheet images" ON storage.objects;

CREATE POLICY "Anyone can upload worksheet images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'worksheet-images');

CREATE POLICY "Anyone can update worksheet images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'worksheet-images');

CREATE POLICY "Anyone can delete worksheet images"
ON storage.objects FOR DELETE
USING (bucket_id = 'worksheet-images');