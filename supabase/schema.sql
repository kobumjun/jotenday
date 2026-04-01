-- 좋을텐데 MVP — Supabase 스키마
-- 대시보드 SQL 에디터에서 순서대로 실행하거나 전체 실행

create extension if not exists "pgcrypto";

-- Profiles (auth.users 확장)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade unique,
  username text not null unique,
  name text not null,
  gender text not null check (gender in ('male', 'female', 'other')),
  phone text not null,
  birth_date date not null,
  agreement_checked boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id);

-- 가입 전 아이디 중복 확인용 (익명 호출)
create or replace function public.is_username_available(p_username text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select not exists (
    select 1 from public.profiles p
    where lower(p.username) = lower(trim(p_username))
  );
$$;

grant execute on function public.is_username_available(text) to anon, authenticated;

-- 가입 시 프로필 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id, username, name, gender, phone, birth_date, agreement_checked
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', ''),
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'gender', 'other'),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce((new.raw_user_meta_data->>'birth_date')::date, current_date),
    coalesce((new.raw_user_meta_data->>'agreement_checked')::boolean, false)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Community
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  content text not null,
  author_name text not null default '',
  created_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

create policy "community_posts_select"
  on public.community_posts for select
  to anon, authenticated
  using (true);

create policy "community_posts_insert"
  on public.community_posts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "community_posts_update_own"
  on public.community_posts for update
  to authenticated
  using (auth.uid() = user_id);

create policy "community_posts_delete_own"
  on public.community_posts for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.set_community_author_name()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select p.name into new.author_name
  from public.profiles p
  where p.user_id = new.user_id
  limit 1;
  if new.author_name is null or new.author_name = '' then
    new.author_name := '회원';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_community_author on public.community_posts;
create trigger trg_community_author
  before insert on public.community_posts
  for each row execute function public.set_community_author_name();

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  content text not null,
  author_name text not null,
  image_url text,
  image_path text,
  created_at timestamptz not null default now(),
  is_published boolean not null default false
);

alter table public.reviews enable row level security;

create policy "reviews_select_published"
  on public.reviews for select
  to anon, authenticated
  using (is_published = true);

-- Inquiries (공개: insert 만)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "inquiries_insert_anon"
  on public.inquiries for insert
  to anon
  with check (true);

create policy "inquiries_insert_auth"
  on public.inquiries for insert
  to authenticated
  with check (true);

-- External links (좋을텐데 페이지)
create table if not exists public.external_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  href text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.external_links enable row level security;

create policy "external_links_select"
  on public.external_links for select
  to anon, authenticated
  using (true);

-- Match orders (상품 신청)
create table if not exists public.match_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  product_code text not null,
  product_name text not null,
  applicant_name text not null,
  age int,
  gender text check (gender in ('male', 'female', 'other')),
  phone text not null,
  job text,
  region text,
  bio text,
  preferred_style text,
  available_time text,
  note text,
  smoking text,
  drinking text,
  preferred_mood text,
  status text not null default 'pending' check (status in ('pending', 'contacted', 'completed', 'canceled')),
  admin_memo text,
  contacted_at timestamptz
);

alter table public.match_orders enable row level security;

create policy "match_orders_insert_anyone"
  on public.match_orders for insert
  to anon, authenticated
  with check (true);

create policy "match_orders_select_own"
  on public.match_orders for select
  to authenticated
  using (user_id is not null and auth.uid() = user_id);

-- Storage: 버킷 생성 후 대시보드에서 public 으로 설정하거나 아래 사용
insert into storage.buckets (id, name, public)
values ('reviews', 'reviews', true)
on conflict (id) do update set public = excluded.public;

-- 공개 읽기
drop policy if exists "reviews_bucket_public_read" on storage.objects;
create policy "reviews_bucket_public_read"
  on storage.objects for select
  using (bucket_id = 'reviews');

-- 업로드는 서비스 롤(서버 액션)만 사용 — anon/authenticated insert 정책 없음
