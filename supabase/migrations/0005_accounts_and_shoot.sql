-- Accounts (roadmap step 1) and Shoot (roadmap step 2).
-- The app reads and writes with the service role key and checks workspace membership in code (src/lib/session.ts).
-- Row level security is on with no policies, so the public publishable key can't read or write any of these tables.

create table if not exists public.workspaces (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  workspace_id text not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null default '',
  role text not null default 'owner' check (role in ('owner', 'operator')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);
create index if not exists workspace_members_user_idx on public.workspace_members (user_id);

-- Everything created before Accounts lives in the "default" workspace.
insert into public.workspaces (id, name) values ('default', 'Frontman team') on conflict (id) do nothing;

-- One row per QR code. The token is the permission for the public phone recorder at /r/[token].
create table if not exists public.shoot_links (
  token text primary key,
  business_id uuid not null references public.businesses(id) on delete cascade,
  workspace_id text not null,
  script_id text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  opened_at timestamptz
);
create index if not exists shoot_links_business_idx on public.shoot_links (business_id, created_at desc);

create table if not exists public.takes (
  id text primary key,
  business_id uuid not null references public.businesses(id) on delete cascade,
  script_id text not null,
  status text not null default 'uploading',
  created_at timestamptz not null default now(),
  data jsonb not null
);
create index if not exists takes_business_idx on public.takes (business_id, created_at desc);

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.shoot_links enable row level security;
alter table public.takes enable row level security;

-- Private bucket for raw takes. Phones upload with signed upload URLs; the dashboard plays them with signed URLs.
insert into storage.buckets (id, name, public, allowed_mime_types)
values ('takes', 'takes', false, array['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'])
on conflict (id) do nothing;
