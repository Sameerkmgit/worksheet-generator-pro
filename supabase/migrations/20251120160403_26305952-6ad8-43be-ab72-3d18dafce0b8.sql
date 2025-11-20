-- Create storage bucket for worksheet images
insert into storage.buckets (id, name, public)
values ('worksheet-images', 'worksheet-images', true);

-- Allow public read access to images
create policy "Public can view worksheet images"
on storage.objects
for select
using (bucket_id = 'worksheet-images');

-- Allow authenticated users to upload images (we'll add admin check later)
create policy "Authenticated users can upload worksheet images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'worksheet-images');

-- Allow authenticated users to update images
create policy "Authenticated users can update worksheet images"
on storage.objects
for update
to authenticated
using (bucket_id = 'worksheet-images');

-- Allow authenticated users to delete images
create policy "Authenticated users can delete worksheet images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'worksheet-images');