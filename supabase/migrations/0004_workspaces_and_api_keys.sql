-- Workspaces (minimal) and per-workspace API keys for the MCP server.
-- Until Accounts (roadmap step 1) ships, everything lives in the 'default' workspace. When Accounts lands, add a
-- workspaces table and membership, and key row level security on workspace_id.

alter table public.businesses
  add column if not exists workspace_id text not null default 'default';
create index if not exists businesses_workspace_idx on public.businesses (workspace_id, created_at desc);

create table if not exists public.api_keys (
  id uuid primary key,
  workspace_id text not null,
  name text not null,
  prefix text not null,
  -- SHA-256 of the key. The key itself is never stored.
  key_hash text not null unique,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);
create index if not exists api_keys_workspace_idx on public.api_keys (workspace_id, created_at desc);

alter table public.api_keys enable row level security;
