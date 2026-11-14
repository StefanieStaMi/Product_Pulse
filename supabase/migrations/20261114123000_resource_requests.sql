-- Email-gated PAZ / MAPA download requests.
-- Applied to project khwzltpkpdknimqycbfk. RLS is on; there are no policies for
-- anon or authenticated, so the Data API cannot read or write rows. Only the
-- security-definer functions below, executed as service_role, may insert/update.
-- Rate limit: 5 requests per email in 24 hours.

create table public.resource_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  email text not null,
  resource text not null check (resource in ('paz', 'mapa')),
  lang text not null check (lang in ('en', 'es')),
  consent boolean not null check (consent),
  newsletter_opt_in boolean not null default false,
  sent_at timestamptz,
  ip_hash text
);

create index resource_requests_email_created_idx
  on public.resource_requests (email, created_at desc);

alter table public.resource_requests enable row level security;

revoke all on table public.resource_requests from public, anon, authenticated;

create or replace function public.resource_request_submit(
  p_email text,
  p_first_name text,
  p_resource text,
  p_lang text,
  p_consent boolean,
  p_newsletter_opt_in boolean,
  p_ip_hash text
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_id uuid;
begin
  if coalesce(p_consent, false) is not true then
    raise exception 'consent_required';
  end if;
  if p_resource not in ('paz', 'mapa') or p_lang not in ('en', 'es') then
    raise exception 'invalid_resource';
  end if;
  if (select count(*) from resource_requests where email = lower(p_email) and created_at > now() - interval '24 hours') >= 5 then
    raise exception 'rate_limited';
  end if;
  insert into resource_requests (email, first_name, resource, lang, consent, newsletter_opt_in, ip_hash)
  values (lower(p_email), p_first_name, p_resource, p_lang, true, coalesce(p_newsletter_opt_in, false), p_ip_hash)
  returning id into v_id;
  return v_id;
end
$function$;

create or replace function public.resource_request_mark_sent(p_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  update resource_requests
    set sent_at = now()
    where id = p_id and sent_at is null;
end
$function$;

revoke all on function public.resource_request_submit(text, text, text, text, boolean, boolean, text) from public;
revoke all on function public.resource_request_mark_sent(uuid) from public;
-- Execute is granted to the same roles as fitcheck_submit, because the Next.js
-- API calls PostgREST with the same key. RLS stays on; there are no table policies
-- for anon or authenticated, so they still cannot read or write rows directly.
grant execute on function public.resource_request_submit(text, text, text, text, boolean, boolean, text) to anon, authenticated, service_role;
grant execute on function public.resource_request_mark_sent(uuid) to anon, authenticated, service_role;

-- 12-month retention for download sign-ups (03:20 UTC). Fit Check rows stay on a separate 30-day job.
SELECT cron.schedule(
  'resource-requests-retention',
  '20 3 * * *',
  $$delete from public.resource_requests where created_at < now() - interval '12 months'$$
);
