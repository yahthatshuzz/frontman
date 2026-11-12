-- Generic per-business records: connected social accounts (tokens encrypted by the app), scheduled posts, metrics.
create table if not exists public.records (
  id text primary key,
  kind text not null,
  business_id uuid not null references public.businesses(id) on delete cascade,
  status text,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  data jsonb not null
);
create index if not exists records_business_kind_idx on public.records (business_id, kind, created_at desc);
create index if not exists records_due_idx on public.records (kind, status, due_at);
alter table public.records enable row level security;
