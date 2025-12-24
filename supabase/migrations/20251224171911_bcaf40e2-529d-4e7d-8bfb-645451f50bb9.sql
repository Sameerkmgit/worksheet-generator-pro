-- Storage policies for worksheet-images bucket
-- Allow anyone to read public worksheet images
DROP POLICY IF EXISTS "Public read worksheet images" ON storage.objects;
CREATE POLICY "Public read worksheet images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'worksheet-images');

-- Only admins can upload worksheet images
DROP POLICY IF EXISTS "Admins can upload worksheet images" ON storage.objects;
CREATE POLICY "Admins can upload worksheet images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'worksheet-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can update worksheet images
DROP POLICY IF EXISTS "Admins can update worksheet images" ON storage.objects;
CREATE POLICY "Admins can update worksheet images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'worksheet-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'worksheet-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can delete worksheet images
DROP POLICY IF EXISTS "Admins can delete worksheet images" ON storage.objects;
CREATE POLICY "Admins can delete worksheet images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'worksheet-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
