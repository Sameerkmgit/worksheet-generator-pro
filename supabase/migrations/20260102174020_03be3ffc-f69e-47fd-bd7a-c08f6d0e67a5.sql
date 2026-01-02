-- 1) Create worksheet_packs if it doesn't exist
create table if not exists public.worksheet_packs (
  id uuid primary key default gen_random_uuid(),
  grade int not null,
  slug text not null unique,
  title text not null,
  description text,
  is_published boolean not null default true,
  rule_type text not null default 'FIRST_N_BY_GRADE',
  rule_n int not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helpful index
create index if not exists worksheet_packs_grade_idx on public.worksheet_packs(grade);

-- 2) Ensure packs exist for grades 1-5 (idempotent)
insert into public.worksheet_packs (grade, slug, title, description, is_published, rule_type, rule_n)
values
  (1, 'grade-1-pack', 'Grade 1 Complete Pack', '10 essential worksheets for Grade 1 students covering Math, English, and Science', true, 'FIRST_N_BY_GRADE', 10),
  (2, 'grade-2-pack', 'Grade 2 Complete Pack', '10 essential worksheets for Grade 2 students covering Math, English, and Science', true, 'FIRST_N_BY_GRADE', 10),
  (3, 'grade-3-pack', 'Grade 3 Complete Pack', '10 essential worksheets for Grade 3 students covering Math, English, and Science', true, 'FIRST_N_BY_GRADE', 10),
  (4, 'grade-4-pack', 'Grade 4 Complete Pack', '10 essential worksheets for Grade 4 students covering Math, English, and Science', true, 'FIRST_N_BY_GRADE', 10),
  (5, 'grade-5-pack', 'Grade 5 Complete Pack', '10 essential worksheets for Grade 5 students covering Math, English, and Science', true, 'FIRST_N_BY_GRADE', 10)
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  is_published = excluded.is_published,
  rule_type = excluded.rule_type,
  rule_n = excluded.rule_n;

-- 3) Create/replace view: pack → worksheet mapping
create or replace view public.v_pack_items_dynamic as
select
  p.id as pack_id,
  p.grade,
  w.id as worksheet_id,
  w.title,
  row_number() over (partition by p.grade order by w.id asc) as display_order
from public.worksheet_packs p
join public.worksheets w
  on w.grade::int = p.grade
where p.is_published = true
  and p.rule_type = 'FIRST_N_BY_GRADE';

-- 4) Create/replace view: pack card data (USED BY UI)
create or replace view public.v_pack_card_dynamic as
select
  p.id as pack_id,
  p.grade,
  p.slug,
  p.title,
  p.description,
  json_agg(v.title order by v.display_order) as worksheet_titles,
  count(*) as worksheet_count
from public.worksheet_packs p
join public.v_pack_items_dynamic v
  on v.pack_id = p.id
where v.display_order <= p.rule_n
group by p.id, p.grade, p.slug, p.title, p.description;

-- 5) RLS + public read
alter table public.worksheet_packs enable row level security;

drop policy if exists "public read published packs" on public.worksheet_packs;
create policy "public read published packs"
on public.worksheet_packs
for select
using (is_published = true);

grant usage on schema public to anon;
grant select on public.v_pack_items_dynamic to anon;
grant select on public.v_pack_card_dynamic to anon;
grant select on public.worksheet_packs to anon;