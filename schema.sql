-- Run this in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security stays ON with NO public policies.
-- Only the service role key (used server-side in api/contact.js) can
-- read or write this table. The browser never talks to Supabase directly,
-- so an anon/public policy is not needed.
alter table public.messages enable row level security;
