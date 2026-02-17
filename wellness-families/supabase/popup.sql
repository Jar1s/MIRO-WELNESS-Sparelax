create table if not exists public.popups (
  id uuid primary key default gen_random_uuid(),
  image_url text,
  title text,
  body text,
  link_url text,
  popup_size text default 'md',
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_popups_updated_at on public.popups;
create trigger set_popups_updated_at
before update on public.popups
for each row execute procedure public.set_updated_at();

alter table public.popups enable row level security;

alter table public.popups
  add column if not exists popup_size text default 'md';

drop policy if exists "public read active popups" on public.popups;

alter table public.popups drop column if exists start_at;
alter table public.popups drop column if exists end_at;

create policy "public read active popups"
on public.popups
for select
to anon
using (
  enabled = true
);
