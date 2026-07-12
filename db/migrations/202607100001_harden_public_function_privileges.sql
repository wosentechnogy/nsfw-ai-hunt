create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on all functions in schema public from public, anon, authenticated;

alter default privileges in schema public
revoke execute on functions from public, anon, authenticated;
