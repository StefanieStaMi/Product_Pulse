import { NextResponse } from 'next/server'
import {
  cronAuthorized,
  deleteTestEnrolment,
  enrolWelcomeSequence,
  isAllowedTestRecipient,
  previewOnly,
  processDueWelcomeEmails,
  publicOrigin,
  sequenceEnabled
} from '../../../../lib/welcome-sequence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Preview-only helper for the compressed end-to-end test. Never available in production.
export async function POST(req) {
  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (!(cronAuthorized(req) || previewOnly(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const action = body.action
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (action === 'status') {
    return NextResponse.json({
      ok: true,
      enabled: sequenceEnabled(),
      env: process.env.VERCEL_ENV || 'unknown',
      origin: publicOrigin()
    })
  }

  if (!email || !isAllowedTestRecipient(email)) {
    return NextResponse.json({ error: 'Only +seqtest addresses are allowed on this test route.' }, { status: 400 })
  }

  if (action === 'enrol') {
    const source = body.source === 'paz' || body.source === 'mapa' ? body.source : 'fitcheck'
    const result = await enrolWelcomeSequence({
      email,
      firstName: body.firstName || 'Stefanie',
      source,
      lang: body.lang || 'en'
    })
    return NextResponse.json({ ok: true, ...result })
  }

  if (action === 'process') {
    const results = await processDueWelcomeEmails({
      isTest: true,
      origin: publicOrigin(),
      limit: body.limit || 10
    })
    return NextResponse.json({ ok: true, results })
  }

  if (action === 'cleanup') {
    const deleted = await deleteTestEnrolment(email)
    return NextResponse.json({ ok: true, deleted })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
