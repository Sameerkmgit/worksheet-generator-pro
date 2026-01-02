-- Fix security definer views by using security_invoker = true

-- Recreate v_pack_items_dynamic with security_invoker
drop view if exists public.v_pack_card_dynamic;
drop view if exists public.v_pack_items_dynamic;

create view public.v_pack_items_dynamic
with (security_invoker = true)
as
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

-- Recreate v_pack_card_dynamic with security_invoker
create view public.v_pack_card_dynamic
with (security_invoker = true)
as
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

-- Re-grant select on new views
grant select on public.v_pack_items_dynamic to anon;
grant select on public.v_pack_card_dynamic to anon;