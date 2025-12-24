-- 1) subcategories table
create table if not exists public.worksheet_subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.worksheet_categories(id) on delete cascade,
  title text not null,
  slug text not null,
  sort_order int not null default 0,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index if not exists idx_ws_subcats_category on public.worksheet_subcategories(category_id);

-- 2) add subcategory_id on worksheets
alter table public.worksheets
add column if not exists subcategory_id uuid references public.worksheet_subcategories(id) on delete set null;

create index if not exists idx_worksheets_subcategory on public.worksheets(subcategory_id);

-- 3) Enable RLS
alter table public.worksheet_subcategories enable row level security;

-- 4) Public can read active subcategories
drop policy if exists "Public can read active subcategories" on public.worksheet_subcategories;
create policy "Public can read active subcategories"
on public.worksheet_subcategories
for select
to anon
using (is_archived = false);

-- 5) Anyone can view subcategories (for authenticated users too)
drop policy if exists "Anyone can view subcategories" on public.worksheet_subcategories;
create policy "Anyone can view subcategories"
on public.worksheet_subcategories
for select
using (true);

-- 6) Admins can manage subcategories
drop policy if exists "Admins can insert subcategories" on public.worksheet_subcategories;
create policy "Admins can insert subcategories"
on public.worksheet_subcategories
for insert
with check (has_role(auth.uid(), 'admin'::app_role));

drop policy if exists "Admins can update subcategories" on public.worksheet_subcategories;
create policy "Admins can update subcategories"
on public.worksheet_subcategories
for update
using (has_role(auth.uid(), 'admin'::app_role));

drop policy if exists "Admins can delete subcategories" on public.worksheet_subcategories;
create policy "Admins can delete subcategories"
on public.worksheet_subcategories
for delete
using (has_role(auth.uid(), 'admin'::app_role));

-- 7) Create subcategories for each distinct topic inside each category
insert into public.worksheet_subcategories (category_id, title, slug, sort_order)
select
  w.category_id,
  initcap(replace(topic, '_', ' ')) as title,
  topic as slug,
  0 as sort_order
from (
  select distinct
    category_id,
    lower(
      regexp_replace(
        regexp_replace(title, '^grade[ _-]?[0-9]+[ _-]?', ''),
        '(_mcq_)?[0-9]+$',''
      )
    ) as topic
  from public.worksheets
  where is_archived = false
    and category_id is not null
) w
where w.topic is not null
  and w.topic <> ''
on conflict (category_id, slug) do nothing;

-- 8) Attach each worksheet to its subcategory
update public.worksheets w
set subcategory_id = sc.id
from public.worksheet_subcategories sc
where w.category_id = sc.category_id
  and lower(
    regexp_replace(
      regexp_replace(w.title, '^grade[ _-]?[0-9]+[ _-]?', ''),
      '(_mcq_)?[0-9]+$',''
    )
  ) = sc.slug
  and w.subcategory_id is null;