-- Project Componeo: Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Create components table
create table if not exists public.components (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text not null,
  code text not null,
  thumbnail_url text, -- New Column for storage links
  author_id uuid references auth.users(id) on delete cascade not null,
  is_public boolean default true
);

-- 2. Enable Row Level Security
alter table public.components enable row level security;

-- 3. Create Component Policies
create policy "Public components are viewable by everyone"
  on public.components for select
  using ( is_public = true );

create policy "Users can insert their own components"
  on public.components for insert
  with check ( auth.uid() = author_id );

create policy "Users can update their own components"
  on public.components for update
  using ( auth.uid() = author_id );

create policy "Users can delete their own components"
  on public.components for delete
  using ( auth.uid() = author_id );

-- 4. Storage Configuration
-- Create the bucket (run this if storage.buckets table exists)
insert into storage.buckets (id, name, public)
values ('component-previews', 'component-previews', true)
on conflict (id) do nothing;

-- Set up RLS for Storage
create policy "Public Access to Previews"
  on storage.objects for select
  using ( bucket_id = 'component-previews' );

create policy "Authenticated users can upload previews"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'component-previews' 
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- 5. Search Optimization
create index if not exists components_title_idx on public.components using gin (title gin_trgm_ops);
create index if not exists components_category_idx on public.components (category);
