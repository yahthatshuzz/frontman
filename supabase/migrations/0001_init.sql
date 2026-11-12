-- Frontman Terminal: initial schema.
-- Records keep a few queryable columns flat and the full object in `data`.

create table if not exists public.businesses (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null,
  status text not null default 'new',
  data jsonb not null
);

create table if not exists public.scripts (
  id uuid primary key,
  created_at timestamptz not null default now(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  status text not null default 'draft',
  pillar text not null,
  data jsonb not null
);

create index if not exists scripts_business_idx on public.scripts (business_id, created_at desc);

-- The app talks to these tables from the server with the service role key.
-- Turn on row level security now so nothing is exposed through the public anon key.
alter table public.businesses enable row level security;
alter table public.scripts enable row level security;
