alter table public.tools enable row level security;
alter table public.categories enable row level security;
alter table public.tool_categories enable row level security;
alter table public.comparisons enable row level security;
alter table public.alternative_pages enable row level security;
alter table public.affiliate_links enable row level security;
alter table public.blog_posts enable row level security;
alter table public.page_metrics enable row level security;
alter table public.outbound_clicks enable row level security;
alter table public.admin_audit_logs enable row level security;

comment on table public.tools is 'RLS enabled. Public site reads from generated seed data until explicit read policies are added.';
comment on table public.outbound_clicks is 'RLS enabled. Inserts should use the server-only Supabase service role client.';
comment on table public.admin_audit_logs is 'RLS enabled. Admin audit writes should use validated server-side mutations.';
