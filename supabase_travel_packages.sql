-- True Ceylon Travels: Handpicked travel packages
-- Run this in Supabase SQL Editor.
-- Covers homepage sections: Signature packages + Coastal escapes.
-- Idempotent: safe to run multiple times.

begin;

create table if not exists public.travel_packages (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  section text not null check (section in ('signature', 'coastal')),
  title text not null,
  content text not null default '',
  image_url text not null,
  href text not null default '/contact',
  sort_order integer not null default 0
);

create index if not exists idx_travel_packages_section_sort
  on public.travel_packages (section, sort_order, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_travel_packages_updated_at on public.travel_packages;
create trigger trg_travel_packages_updated_at
before update on public.travel_packages
for each row execute function public.set_updated_at();

alter table public.travel_packages enable row level security;

drop policy if exists "Public can read travel packages" on public.travel_packages;
create policy "Public can read travel packages"
on public.travel_packages
for select
using (true);

commit;

-- Seed current homepage cards only when the table is empty.
insert into public.travel_packages (section, title, content, image_url, href, sort_order)
select *
from (
  values
    (
      'signature',
      '10-Day Sri Lanka Journey',
      'A complete island route for couples, families, and first-time visitors.',
      '/images/campaign/ten-day-journey.png',
      '/tours',
      1
    ),
    (
      'signature',
      'Experience The Luxury Way to Travel',
      'Private car journeys with curated Sri Lanka moments.',
      '/images/campaign/experience-luxury.png',
      '/tours',
      2
    ),
    (
      'signature',
      'Private Luxury Transport',
      'Chauffeur-driven sedans, SUVs, and vans for comfort-first travel.',
      '/images/campaign/private-luxury-transport.png',
      '/contact',
      3
    ),
    (
      'coastal',
      'Arugam Bay',
      'Surf, lagoon safaris, and laid-back coastal escapes.',
      '/images/campaign/arugam-bay.png',
      '/contact',
      1
    ),
    (
      'coastal',
      'Mirissa',
      'Whale watching, snorkeling, and southern beach sunsets.',
      '/images/campaign/mirissa.png',
      '/destinations/mirissa-whale-coast',
      2
    ),
    (
      'coastal',
      'Galle Fort',
      'Colonial charm, ocean views, and timeless streets.',
      '/images/campaign/galle-fort.png',
      '/destinations/galle-fort-beaches',
      3
    )
) as seed(section, title, content, image_url, href, sort_order)
where not exists (select 1 from public.travel_packages);

-- Storage bucket for uploaded package images.
-- If this insert fails, create the bucket manually:
--   Storage → New bucket → name: travel_packages → Public bucket: ON
insert into storage.buckets (id, name, public)
values ('travel_packages', 'travel_packages', true)
on conflict (id) do update
set public = excluded.public;
