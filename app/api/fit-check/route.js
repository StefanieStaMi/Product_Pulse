import { NextResponse } from 'next/server'
import { sbRpc, hashIp, generateProfile, sendProfileEmail, subscribeNewsletter } from '../../../lib/fitcheck'
import { enrolWelcomeSequence } from '../../../lib/welcome-sequence'
import { HOURS, STAY_EMPLOYED, PROTECT, FORMATS, MAX_PROTECT, EXPERIENCE_MIN, EXPERIENCE_MAX } from '../../fit-check/questions'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const str = (v, max, min = 0) => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max ? v.trim() : null
const pick = (v, allowed) => Array.isArray(v) ? [...new Set(v.filter(x => allowed.includes(x)))] : []

export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  // Honeypot: pretend success so bots learn nothing
  if (body.company_website) return NextResponse.json({ ok: true })

  const email = str(body.email, 200)
  const protect = pick(body.protect, PROTECT)
  const formats = pick(body.formats, FORMATS)
  const a = {
    version: 2,
    first_name: str(body.first_name, 60, 1),
    experience: str(body.experience, EXPERIENCE_MAX, EXPERIENCE_MIN),
    more_and_never: str(body.more_and_never, 1000, 3),
    hours_per_week: HOURS.includes(body.hours_per_week) ? body.hours_per_week : null,
    stay_employed: STAY_EMPLOYED.includes(body.stay_employed) ? body.stay_employed : null,
    protect: protect.length <= MAX_PROTECT ? protect : null,
    income_floor: str(body.income_floor || '', 100) || '',
    formats: formats.length ? formats : null,
    blocker: str(body.blocker, 1000, 3)
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  const missing = Object.entries(a).filter(([k, v]) => v === null).map(([k]) => k)
  if (missing.length) {
    const msg = missing.includes('experience') ? `Please paste between ${EXPERIENCE_MIN} and ${EXPERIENCE_MAX.toLocaleString('en')} characters of your experience.`
      : missing.includes('protect') ? `Please pick up to ${MAX_PROTECT} things this must protect.`
      : 'Please answer every question.'
    return NextResponse.json({ error: msg, fields: missing }, { status: 400 })
  }
  if (body.consent !== true) return NextResponse.json({ error: 'Consent is required to create your options.' }, { status: 400 })

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
  let id
  try {
    id = await sbRpc('fitcheck_submit', { p_email: email, p_first_name: a.first_name, p_answers: a, p_consent_newsletter: body.newsletter === true, p_ip_hash: hashIp(ip) })
  } catch (e) {
    if (String(e.body).includes('rate_limited')) return NextResponse.json({ error: "You've already sent a few of these today. Give it a day and try again." }, { status: 429 })
    console.error('fitcheck submit', e.message, e.body)
    return NextResponse.json({ error: 'Something went wrong on our side. Please try again in a minute.' }, { status: 500 })
  }

  try {
    const { html } = await generateProfile(a)
    await sendProfileEmail({ email: email.toLowerCase(), firstName: a.first_name, html })
    if (body.newsletter === true) {
      try { await subscribeNewsletter({ email: email.toLowerCase(), firstName: a.first_name }) }
      catch (e) { console.error('fitcheck newsletter', e.message) }
      try { await enrolWelcomeSequence({ email: email.toLowerCase(), firstName: a.first_name, source: 'fitcheck' }) }
      catch (e) { console.error('fitcheck welcome sequence', e.message) }
    }
    await sbRpc('fitcheck_complete', { p_id: id, p_profile: html, p_status: 'sent' })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('fitcheck generate/deliver', e.message)
    await sbRpc('fitcheck_complete', { p_id: id, p_profile: null, p_status: 'failed' }).catch(() => {})
    return NextResponse.json({ error: 'We saved your answers but hit a snag writing your options. Stefanie will follow up by email.' }, { status: 502 })
  }
}
