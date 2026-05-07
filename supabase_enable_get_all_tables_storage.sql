-- True Ceylon Travels - Enable GET/API read access for all tables + storage
-- Run this in Supabase SQL Editor.
-- Idempotent: safe to run multiple times.

begin;

-- 1) Ensure RLS is enabled on every table in public schema.
do $$
declare
  r record;
begin
  for r in
    select tablename
    from pg_tables
    where schemaname = 'public'
  loop
    execute format(
      'alter table public.%I enable row level security;',
      r.tablename
    );
  end loop;
end $$;

-- 2) Create open SELECT policies for anon + authenticated on every public table.
--    This allows GET requests from Supabase REST API.
do $$
declare
  r record;
  policy_name text;
begin
  for r in
    select tablename
    from pg_tables
    where schemaname = 'public'
  loop
    policy_name := 'Public GET ' || r.tablename;

    execute format(
      'drop policy if exists %I on public.%I;',
      policy_name,
      r.tablename
    );

    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true);',
      policy_name,
      r.tablename
    );
  end loop;
end $$;

-- 3) Storage read policies (files listing + file read via API/CDN).
--    storage.objects controls file access for Supabase Storage.
alter table if exists storage.objects enable row level security;

drop policy if exists "Public GET storage objects" on storage.objects;
create policy "Public GET storage objects"
on storage.objects
for select
to anon, authenticated
using (true);

commit;

-- Optional safety note:
-- This makes all public schema table rows and all storage objects readable.
-- If you want to keep some tables private (ex: contact), create stricter policies after running this.
