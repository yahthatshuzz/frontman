-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Sessions table (for account tracking)
create table sessions (
  id uuid default uuid_generate_v4() primary key,
  user_token text unique not null,
  title text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Takes table (video recordings with scores)
create table takes (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references sessions(id) on delete cascade not null,
  video_url text not null,
  audio_url text,
  transcript text,
  score numeric,
  score_data jsonb,
  is_best boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Indexes for performance
create index idx_takes_session_id on takes(session_id);
create index idx_takes_score on takes(score);
create index idx_takes_is_best on takes(is_best);

-- Row Level Security (optional, for production)
alter table sessions enable row level security;
alter table takes enable row level security;
