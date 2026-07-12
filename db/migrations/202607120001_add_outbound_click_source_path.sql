alter table public.outbound_clicks
  add column if not exists source_path text;

create index if not exists outbound_clicks_source_path_idx
  on public.outbound_clicks (source_path);
