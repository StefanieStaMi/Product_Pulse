-- Layers welcome sequence enrolments (7 emails, weekly after a 1-day wait).
-- Applied to project khwzltpkpdknimqycbfk. RLS is on; there are no policies for
-- anon or authenticated, so the Data API cannot read or write rows. Only the
-- security-definer functions below may insert/update. No back-fill of past opt-ins.

create table public.welcome_sequence_enrolments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  first_name text,
  source text not null check (source in ('fitcheck', 'paz', 'mapa')),
  lang text not null default 'en',
  next_step integer not null default 1 check (next_step between 1 and 8),
  next_send_at timestamptz not null,
  last_sent_at timestamptz,
  last_sent_step integer,
  booked boolean not null default false,
  unsubscribed_at timestamptz,
  completed_at timestamptz,
  is_test boolean not null default false
);

create unique index welcome_sequence_enrolments_email_idx
  on public.welcome_sequence_enrolments (lower(email));

create index welcome_sequence_due_idx
  on public.welcome_sequence_enrolments (is_test, next_send_at)
  where unsubscribed_at is null and completed_at is null;

alter table public.welcome_sequence_enrolments enable row level security;

revoke all on table public.welcome_sequence_enrolments from public, anon, authenticated;

create or replace function public.welcome_sequence_enrol(
  p_email text,
  p_first_name text,
  p_source text,
  p_lang text,
  p_next_send_at timestamptz,
  p_is_test boolean
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_id uuid;
begin
  if p_source not in ('fitcheck', 'paz', 'mapa') then
    raise exception 'invalid_source';
  end if;
  select id into v_id
    from welcome_sequence_enrolments
    where lower(email) = lower(p_email);
  if v_id is not null then
    return v_id;
  end if;
  insert into welcome_sequence_enrolments (
    email, first_name, source, lang, next_send_at, is_test
  ) values (
    lower(p_email), p_first_name, p_source, coalesce(p_lang, 'en'), p_next_send_at, coalesce(p_is_test, false)
  )
  returning id into v_id;
  return v_id;
end
$function$;

create or replace function public.welcome_sequence_claim_due(
  p_limit integer,
  p_is_test boolean
)
returns setof public.welcome_sequence_enrolments
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  return query
  with due as (
    select e.id
    from welcome_sequence_enrolments e
    where e.unsubscribed_at is null
      and e.completed_at is null
      and e.next_step between 1 and 7
      and e.next_send_at <= now()
      and e.is_test = coalesce(p_is_test, false)
    order by e.next_send_at
    limit greatest(1, least(coalesce(p_limit, 10), 50))
    for update skip locked
  )
  update welcome_sequence_enrolments e
    set next_send_at = now() + interval '15 minutes'
  from due
  where e.id = due.id
  returning e.*;
end
$function$;

create or replace function public.welcome_sequence_mark_sent(
  p_id uuid,
  p_step integer,
  p_next_step integer,
  p_next_send_at timestamptz,
  p_skipped boolean
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  update welcome_sequence_enrolments
    set last_sent_at = case when coalesce(p_skipped, false) then last_sent_at else now() end,
        last_sent_step = case when coalesce(p_skipped, false) then last_sent_step else p_step end,
        next_step = p_next_step,
        next_send_at = p_next_send_at,
        completed_at = case when p_next_step > 7 then now() else completed_at end
    where id = p_id
      and unsubscribed_at is null;
end
$function$;

create or replace function public.welcome_sequence_unsubscribe(
  p_id uuid,
  p_email text
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_count integer;
begin
  update welcome_sequence_enrolments
    set unsubscribed_at = coalesce(unsubscribed_at, now())
    where (p_id is not null and id = p_id)
       or (p_email is not null and lower(email) = lower(p_email));
  get diagnostics v_count = row_count;
  return v_count > 0;
end
$function$;

create or replace function public.welcome_sequence_set_booked(p_email text)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_count integer;
begin
  update welcome_sequence_enrolments
    set booked = true
    where lower(email) = lower(p_email);
  get diagnostics v_count = row_count;
  return v_count > 0;
end
$function$;

create or replace function public.welcome_sequence_delete_test(p_email text)
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_count integer;
begin
  delete from welcome_sequence_enrolments
    where is_test = true
      and lower(email) = lower(p_email);
  get diagnostics v_count = row_count;
  return v_count;
end
$function$;

revoke all on function public.welcome_sequence_enrol(text, text, text, text, timestamptz, boolean) from public;
revoke all on function public.welcome_sequence_claim_due(integer, boolean) from public;
revoke all on function public.welcome_sequence_mark_sent(uuid, integer, integer, timestamptz, boolean) from public;
revoke all on function public.welcome_sequence_unsubscribe(uuid, text) from public;
revoke all on function public.welcome_sequence_set_booked(text) from public;
revoke all on function public.welcome_sequence_delete_test(text) from public;

grant execute on function public.welcome_sequence_enrol(text, text, text, text, timestamptz, boolean) to anon, authenticated, service_role;
grant execute on function public.welcome_sequence_claim_due(integer, boolean) to anon, authenticated, service_role;
grant execute on function public.welcome_sequence_mark_sent(uuid, integer, integer, timestamptz, boolean) to anon, authenticated, service_role;
grant execute on function public.welcome_sequence_unsubscribe(uuid, text) to anon, authenticated, service_role;
grant execute on function public.welcome_sequence_set_booked(text) to anon, authenticated, service_role;
grant execute on function public.welcome_sequence_delete_test(text) to anon, authenticated, service_role;

-- Drop completed or unsubscribed test/live rows after 12 months (03:25 UTC).
SELECT cron.schedule(
  'welcome-sequence-retention',
  '25 3 * * *',
  $$delete from public.welcome_sequence_enrolments
    where (unsubscribed_at is not null and unsubscribed_at < now() - interval '12 months')
       or (completed_at is not null and completed_at < now() - interval '12 months')$$
);
