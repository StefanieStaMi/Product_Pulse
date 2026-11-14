import crypto from 'node:crypto'
import { sbRpc } from './fitcheck.js'
import { buildWelcomeEmail, SESSION_STEPS } from './welcome-sequence-emails.js'

const DAY_MS = 24 * 60 * 60 * 1000
const WEEK_MS = 7 * DAY_MS

export function sequenceEnabled() {
  const v = process.env.WELCOME_SEQUENCE_ENABLED
  if (v === 'false' || v === '0') return false
  if (v === 'true' || v === '1') return true
  // Default: preview only. Production stays off until WELCOME_SEQUENCE_ENABLED=true.
  return process.env.VERCEL_ENV === 'preview'
}

export function publicOrigin() {
  if (process.env.WELCOME_SEQUENCE_PUBLIC_ORIGIN) {
    return process.env.WELCOME_SEQUENCE_PUBLIC_ORIGIN.replace(/\/$/, '')
  }
  if (process.env.VERCEL_ENV === 'production') return 'https://www.productpulseconsulting.com'
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'https://www.productpulseconsulting.com'
}

export function isAllowedTestRecipient(email) {
  const value = String(email || '').toLowerCase()
  const allow = (process.env.WELCOME_SEQUENCE_TEST_EMAILS || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
  if (allow.includes(value)) return true
  return /\+seqtest(?:[a-z0-9._+-]*)?@/i.test(value)
}

function secret() {
  return process.env.FITCHECK_IP_SALT || process.env.CRON_SECRET || 'layers-welcome-sequence'
}

export function makeUnsubToken({ id, email }) {
  const payload = Buffer.from(JSON.stringify({ id, email: String(email).toLowerCase() }), 'utf8').toString('base64url')
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function readUnsubToken(token) {
  const raw = String(token || '')
  const dot = raw.lastIndexOf('.')
  if (dot <= 0) return null
  const payload = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!data || !data.email) return null
    return data
  } catch {
    return null
  }
}

export function unsubscribePath(token) {
  return `/api/welcome-sequence/unsubscribe?t=${encodeURIComponent(token)}`
}

function firstDelayMs({ isTest }) {
  if (isTest) return Number(process.env.WELCOME_SEQUENCE_TEST_INTERVAL_MS || 0)
  return DAY_MS
}

function stepDelayMs({ isTest }) {
  if (isTest) return Number(process.env.WELCOME_SEQUENCE_TEST_INTERVAL_MS || 0)
  return WEEK_MS
}

function enrolIsTest() {
  return process.env.VERCEL_ENV !== 'production'
}

export async function enrolWelcomeSequence({ email, firstName, source, lang = 'en' }) {
  if (!sequenceEnabled()) return { ok: false, skipped: 'disabled' }
  const addr = String(email || '').trim().toLowerCase()
  if (!addr) return { ok: false, skipped: 'no_email' }
  const src = source === 'paz' || source === 'mapa' || source === 'fitcheck' ? source : null
  if (!src) return { ok: false, skipped: 'bad_source' }
  const isTest = enrolIsTest()
  const nextSendAt = new Date(Date.now() + firstDelayMs({ isTest })).toISOString()
  const id = await sbRpc('welcome_sequence_enrol', {
    p_email: addr,
    p_first_name: firstName || null,
    p_source: src,
    p_lang: lang === 'es' ? 'es' : 'en',
    p_next_send_at: nextSendAt,
    p_is_test: isTest
  })
  return { ok: true, id, isTest, nextSendAt }
}

export async function setBooked(email) {
  return sbRpc('welcome_sequence_set_booked', { p_email: String(email).toLowerCase() })
}

export async function unsubscribeWelcomeSequence({ id = null, email = null }) {
  const found = await sbRpc('welcome_sequence_unsubscribe', {
    p_id: id || null,
    p_email: email ? String(email).toLowerCase() : null
  })
  if (email) {
    try { await unsubscribeFromKit(email) }
    catch (e) { console.error('kit unsubscribe', e.message) }
  }
  return found
}

async function unsubscribeFromKit(email) {
  const key = process.env.KIT_API_KEY
  if (!key) return
  const res = await fetch('https://api.kit.com/v4/subscribers/unsubscribe', {
    method: 'POST',
    headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email_address: String(email).toLowerCase() })
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`kit unsubscribe ${res.status}: ${text.slice(0, 300)}`)
}

export async function deleteTestEnrolment(email) {
  return sbRpc('welcome_sequence_delete_test', { p_email: String(email).toLowerCase() })
}

function canSendRow(row) {
  if (!row?.is_test) return true
  return isAllowedTestRecipient(row.email)
}

async function sendResend({ to, subject, html, text, unsubscribeUrl }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND3_API_KEY || process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.FITCHECK_FROM || 'Stefanie | Layers <fitcheck@productpulseconsulting.com>',
      to: [to],
      reply_to: 'stefanie@productpulseconsulting.com',
      subject,
      html,
      text,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      }
    })
  })
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 300)}`)
}

export async function processDueWelcomeEmails({ isTest, origin, limit = 10 } = {}) {
  const base = (origin || publicOrigin()).replace(/\/$/, '')
  const rows = await sbRpc('welcome_sequence_claim_due', {
    p_limit: limit,
    p_is_test: Boolean(isTest)
  }) || []
  const results = []
  for (const row of rows) {
    const step = Number(row.next_step)
    const nextStep = step + 1
    const nextSendAt = new Date(Date.now() + stepDelayMs({ isTest: row.is_test })).toISOString()
    const skipBooked = row.booked && SESSION_STEPS.has(step)
    const unsafeTest = !canSendRow(row)
    try {
      if (unsafeTest) {
        console.error('welcome sequence blocked unsafe test recipient', row.email)
        await sbRpc('welcome_sequence_mark_sent', {
          p_id: row.id,
          p_step: step,
          p_next_step: 8,
          p_next_send_at: nextSendAt,
          p_skipped: true
        })
        results.push({ id: row.id, email: row.email, step, skipped: 'unsafe_test_recipient' })
        continue
      }
      if (skipBooked) {
        await sbRpc('welcome_sequence_mark_sent', {
          p_id: row.id,
          p_step: step,
          p_next_step: nextStep,
          p_next_send_at: nextSendAt,
          p_skipped: true
        })
        results.push({ id: row.id, email: row.email, step, skipped: 'booked' })
        continue
      }
      const token = makeUnsubToken({ id: row.id, email: row.email })
      const unsubscribeUrl = `${base}${unsubscribePath(token)}`
      const built = buildWelcomeEmail({
        step,
        source: row.source,
        firstName: row.first_name,
        unsubscribeUrl
      })
      await sendResend({
        to: row.email,
        subject: built.subject,
        html: built.html,
        text: built.text,
        unsubscribeUrl
      })
      await sbRpc('welcome_sequence_mark_sent', {
        p_id: row.id,
        p_step: step,
        p_next_step: nextStep,
        p_next_send_at: nextSendAt,
        p_skipped: false
      })
      results.push({ id: row.id, email: row.email, step, key: built.key, sent: true })
    } catch (e) {
      console.error('welcome sequence send', row.id, e.message)
      results.push({ id: row.id, email: row.email, step, error: e.message })
    }
  }
  return results
}

export function cronAuthorized(req) {
  const secretValue = process.env.CRON_SECRET || process.env.WELCOME_SEQUENCE_CRON_SECRET
  const auth = req.headers.get('authorization') || ''
  if (secretValue) {
    const expected = `Bearer ${secretValue}`
    const a = Buffer.from(auth)
    const b = Buffer.from(expected)
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) return true
  }
  // Preview deployments are SSO-protected; Vercel cron only runs in production.
  // Allow a preview-only header so the compressed test can invoke the job.
  if (process.env.VERCEL_ENV === 'preview' && req.headers.get('x-welcome-sequence-run') === 'preview') {
    return true
  }
  return false
}

export function previewOnly(req) {
  return process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'
}
