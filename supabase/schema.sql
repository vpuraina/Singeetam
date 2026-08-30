-- ============================================================
-- Singeetam database schema
-- Run this in Supabase: Dashboard -> SQL Editor -> New query
-- ============================================================

-- 1. PROFILES
-- One row per authenticated user, created automatically on signup.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'New Listener',
  avatar_url text,
  is_premium boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'New Listener'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. TRACKS
-- Metadata for user-uploaded tracks. The actual audio file lives in R2;
-- this table just stores the R2 object key/URL and display info.
create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  artist_name text not null default 'Unknown Artist',
  duration_seconds integer not null default 0,
  storage_key text not null,          -- object key inside the R2 bucket
  public_url text not null,           -- playable URL (R2 public URL + key)
  cover_url text,
  status text not null default 'ready' check (status in ('processing', 'ready', 'blocked')),
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

alter table tracks enable row level security;

create policy "Public tracks are viewable by everyone"
  on tracks for select
  using (is_public = true or owner_id = auth.uid());

create policy "Users can insert their own tracks"
  on tracks for insert
  with check (owner_id = auth.uid());

create policy "Users can update their own tracks"
  on tracks for update
  using (owner_id = auth.uid());

create policy "Users can delete their own tracks"
  on tracks for delete
  using (owner_id = auth.uid());

-- 3. Helpful index for "my uploads" and admin queries
create index if not exists tracks_owner_id_idx on tracks (owner_id);
create index if not exists tracks_created_at_idx on tracks (created_at desc);
