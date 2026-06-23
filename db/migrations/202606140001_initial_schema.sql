create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'tool_status') then
    create type public.tool_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'affiliate_status') then
    create type public.affiliate_status as enum ('none', 'applied', 'approved', 'rejected', 'paused');
  end if;

  if not exists (select 1 from pg_type where typname = 'pricing_model') then
    create type public.pricing_model as enum ('free', 'freemium', 'subscription', 'credits', 'one_time', 'unknown');
  end if;

  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'review', 'published', 'noindex');
  end if;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  tagline text not null,
  description text not null,
  website_url text not null,
  affiliate_url text,
  logo_url text,
  safe_screenshot_url text,
  status public.tool_status not null default 'draft',
  editor_score numeric(3, 1) check (editor_score is null or (editor_score >= 0 and editor_score <= 10)),
  popularity_score integer not null default 0 check (popularity_score >= 0),
  is_featured boolean not null default false,
  is_sponsored boolean not null default false,
  supports_nsfw_chat boolean not null default false,
  supports_image_generation boolean not null default false,
  supports_video_generation boolean not null default false,
  supports_voice boolean not null default false,
  supports_phone_call boolean not null default false,
  supports_character_creation boolean not null default false,
  supports_anime_style boolean not null default false,
  supports_realistic_style boolean not null default false,
  has_mobile_app boolean not null default false,
  has_web_app boolean not null default true,
  has_free_plan boolean not null default false,
  has_free_trial boolean not null default false,
  requires_credit_card boolean not null default false,
  accepts_crypto boolean not null default false,
  accepts_paypal boolean not null default false,
  accepts_card boolean not null default false,
  nsfw_policy_summary text not null default 'Unknown',
  privacy_summary text not null default 'Unknown',
  data_retention_summary text not null default 'Unknown',
  content_restrictions text not null default 'Unknown',
  geo_restrictions text not null default 'Unknown',
  age_requirement text not null default '18+',
  pricing_model public.pricing_model not null default 'unknown',
  starting_price numeric(10, 2),
  currency text not null default 'USD',
  affiliate_program_status public.affiliate_status not null default 'none',
  commission_type text,
  commission_rate text,
  cookie_duration text,
  affiliate_network text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_checked_at date not null default current_date,
  constraint tools_slug_unique unique (slug)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text not null,
  seo_title text not null,
  seo_description text not null,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order integer not null default 0,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_slug_unique unique (slug)
);

create table if not exists public.tool_categories (
  tool_id uuid not null references public.tools(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (tool_id, category_id)
);

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  tool_a_id uuid not null references public.tools(id) on delete cascade,
  tool_b_id uuid not null references public.tools(id) on delete cascade,
  verdict text not null,
  seo_title text not null,
  seo_description text not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comparisons_slug_unique unique (slug),
  constraint comparisons_tool_pair_unique unique (tool_a_id, tool_b_id),
  constraint comparisons_distinct_tools check (tool_a_id <> tool_b_id)
);

create table if not exists public.alternative_pages (
  id uuid primary key default gen_random_uuid(),
  base_tool_id uuid not null references public.tools(id) on delete cascade,
  slug text not null,
  reason_summary text not null,
  seo_title text not null,
  seo_description text not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint alternative_pages_slug_unique unique (slug),
  constraint alternative_pages_base_tool_unique unique (base_tool_id)
);

create table if not exists public.affiliate_links (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  url text not null,
  network text,
  campaign text,
  status public.affiliate_status not null default 'applied',
  is_primary boolean not null default false,
  commission_type text,
  commission_rate text,
  cookie_duration text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  excerpt text not null,
  body text not null,
  status public.content_status not null default 'draft',
  author text not null default 'NSFW AI Hunt editorial',
  published_at timestamptz,
  seo_title text not null,
  seo_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_slug_unique unique (slug)
);

create table if not exists public.page_metrics (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  page_type text not null,
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  ctr numeric(8, 5) not null default 0 check (ctr >= 0),
  avg_position numeric(8, 2),
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_metrics_route_unique unique (route)
);

create table if not exists public.outbound_clicks (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid references public.tools(id) on delete set null,
  affiliate_link_id uuid references public.affiliate_links(id) on delete set null,
  tool_slug text not null,
  destination_url text not null,
  referrer text,
  user_agent text,
  ip_hash text,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists affiliate_links_one_primary_per_tool_idx
  on public.affiliate_links (tool_id)
  where is_primary;

create index if not exists tools_slug_idx on public.tools (slug);
create index if not exists tools_status_idx on public.tools (status);
create index if not exists tools_featured_idx on public.tools (is_featured, status);
create index if not exists tools_last_checked_at_idx on public.tools (last_checked_at);

create index if not exists categories_slug_idx on public.categories (slug);
create index if not exists categories_status_idx on public.categories (status);
create index if not exists categories_parent_id_idx on public.categories (parent_id);

create index if not exists tool_categories_tool_id_idx on public.tool_categories (tool_id);
create index if not exists tool_categories_category_id_idx on public.tool_categories (category_id);
create index if not exists tool_categories_status_idx on public.tool_categories (status);

create index if not exists comparisons_slug_idx on public.comparisons (slug);
create index if not exists comparisons_status_idx on public.comparisons (status);
create index if not exists comparisons_tool_a_id_idx on public.comparisons (tool_a_id);
create index if not exists comparisons_tool_b_id_idx on public.comparisons (tool_b_id);

create index if not exists alternative_pages_slug_idx on public.alternative_pages (slug);
create index if not exists alternative_pages_status_idx on public.alternative_pages (status);
create index if not exists alternative_pages_base_tool_id_idx on public.alternative_pages (base_tool_id);

create index if not exists affiliate_links_tool_id_idx on public.affiliate_links (tool_id);
create index if not exists affiliate_links_status_idx on public.affiliate_links (status);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at);

create index if not exists page_metrics_route_idx on public.page_metrics (route);
create index if not exists page_metrics_status_idx on public.page_metrics (status);

create index if not exists outbound_clicks_tool_slug_idx on public.outbound_clicks (tool_slug);
create index if not exists outbound_clicks_created_at_idx on public.outbound_clicks (created_at);
create index if not exists outbound_clicks_status_idx on public.outbound_clicks (status);

create index if not exists admin_audit_logs_actor_user_id_idx on public.admin_audit_logs (actor_user_id);
create index if not exists admin_audit_logs_entity_idx on public.admin_audit_logs (entity_type, entity_id);
create index if not exists admin_audit_logs_status_idx on public.admin_audit_logs (status);

drop trigger if exists set_tools_updated_at on public.tools;
create trigger set_tools_updated_at
before update on public.tools
for each row execute function public.set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists set_tool_categories_updated_at on public.tool_categories;
create trigger set_tool_categories_updated_at
before update on public.tool_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_comparisons_updated_at on public.comparisons;
create trigger set_comparisons_updated_at
before update on public.comparisons
for each row execute function public.set_updated_at();

drop trigger if exists set_alternative_pages_updated_at on public.alternative_pages;
create trigger set_alternative_pages_updated_at
before update on public.alternative_pages
for each row execute function public.set_updated_at();

drop trigger if exists set_affiliate_links_updated_at on public.affiliate_links;
create trigger set_affiliate_links_updated_at
before update on public.affiliate_links
for each row execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

drop trigger if exists set_page_metrics_updated_at on public.page_metrics;
create trigger set_page_metrics_updated_at
before update on public.page_metrics
for each row execute function public.set_updated_at();

drop trigger if exists set_outbound_clicks_updated_at on public.outbound_clicks;
create trigger set_outbound_clicks_updated_at
before update on public.outbound_clicks
for each row execute function public.set_updated_at();

drop trigger if exists set_admin_audit_logs_updated_at on public.admin_audit_logs;
create trigger set_admin_audit_logs_updated_at
before update on public.admin_audit_logs
for each row execute function public.set_updated_at();

