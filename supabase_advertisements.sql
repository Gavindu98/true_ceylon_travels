-- True Ceylon Travels: Advertisements section
-- Run this in Supabase SQL Editor.
-- Idempotent: safe to run multiple times.

begin;

-- ---------------------------------------------------------------------------
-- 1) Table: advertisements
-- ---------------------------------------------------------------------------
create table if not exists public.advertisements (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  title text not null,
  image_url text not null
);

create index if not exists idx_advertisements_created_at
  on public.advertisements (created_at desc);

-- ---------------------------------------------------------------------------
-- 2) RLS + public read policy
-- ---------------------------------------------------------------------------
alter table public.advertisements enable row level security;

drop policy if exists "Public can read advertisements" on public.advertisements;
create policy "Public can read advertisements"
on public.advertisements
for select
using (true);

commit;

-- ---------------------------------------------------------------------------
-- 3) Storage bucket for advertisement images
-- ---------------------------------------------------------------------------
-- Run this separately if the insert below succeeds.
-- If it fails, create the bucket manually in Supabase Dashboard:
--   Storage → New bucket → name: advertisements → Public bucket: ON
--
-- Uploads go through your Next.js API with the service role key, so you do
-- NOT need storage.objects policies here (those require table owner access).

insert into storage.buckets (id, name, public)
values ('advertisements', 'advertisements', true)
on conflict (id) do update
set public = excluded.public;
