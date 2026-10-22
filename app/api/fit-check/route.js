import { NextResponse } from 'next/server'
import { sbRpc, hashIp, generateProfile, deliverViaKit } from '../../../lib/fitcheck'
import { FLEX_OPTIONS, YEARS, FUNCTIONS } from '../../fit-check/questions'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const str = (v, max, min = 0) => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max ? v.trim() : null

export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  // Honeypot: pretend success so bots learn nothing
  if (body.company_website) return NextResponse.json({ ok: true })

  const email = str(body.email, 200)
  const a = {
    first_name: str(body.first_name, 60, 1),
    role_line: str(body.role_line, 200, 3),
    years: YEARS.includes(body.years) ? body.years : null,
    function: FUNCTIONS.includes(body.function) ? (body.function === 'Other' ? (str(body.function_other, 100, 1) || 'Other') : body.function) : null,
    highlights: str(body.highlights, 3000, 40),
    go_to_problem: str(body.go_to_problem, 1000, 3),
    industries: str(body.industries, 300, 2),
    flexibility: Array.isArray(body.flexibility) ? body.flexibility.filter(f => FLEX_OPTIONS.includes(f)) : [],
    income_need: str(body.income_need || '', 100) || '',
    blocker: str(body.blocker, 1000, 3)
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  const missing = Object.entries(a).filter(([k, v]) => v === null).map(([k]) => k)
  if (missing.length) return NextResponse.json({ error: 'Please answer every question (highlights need a little more detail).', fields: missing }, { status: 400 })
  if (body.consent !== true) return NextResponse.json({ error: 'Consent is required to create your profile.' }, { status: 400 })

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
    const html = await generateProfile(a)
    await deliverViaKit({ email: email.toLowerCase(), firstName: a.first_name, html, newsletter: body.newsletter === true })
    await sbRpc('fitcheck_complete', { p_id: id, p_profile: html, p_status: 'sent' })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('fitcheck generate/deliver', e.message)
    await sbRpc('fitcheck_complete', { p_id: id, p_profile: null, p_status: 'failed' }).catch(() => {})
    return NextResponse.json({ error: 'We saved your answers but hit a snag writing your profile. Stefanie will follow up by email.' }, { status: 502 })
  }
}
