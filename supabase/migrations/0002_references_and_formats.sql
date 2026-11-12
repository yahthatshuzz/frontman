-- Reference videos the owner likes, and formats saved from them (or from audience research).
-- We store links, notes and breakdowns only. Never the videos themselves.

create table if not exists public.reference_videos (
  id uuid primary key,
  created_at timestamptz not null default now(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  url text not null,
  data jsonb not null
);
create index if not exists reference_videos_business_idx on public.reference_videos (business_id, created_at desc);

-- Custom format ids are "c-<uuid>", so this is text, not uuid.
create table if not exists public.custom_formats (
  id text primary key,
  created_at timestamptz not null default now(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  data jsonb not null
);
create index if not exists custom_formats_business_idx on public.custom_formats (business_id, created_at desc);

alter table public.reference_videos enable row level security;
alter table public.custom_formats enable row level security;
