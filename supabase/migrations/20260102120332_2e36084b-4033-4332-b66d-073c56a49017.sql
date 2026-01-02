-- Create storage bucket for worksheet packs
INSERT INTO storage.buckets (id, name, public)
VALUES ('worksheet-packs', 'worksheet-packs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to worksheet packs
CREATE POLICY "Public read access for worksheet packs"
ON storage.objects FOR SELECT
USING (bucket_id = 'worksheet-packs');