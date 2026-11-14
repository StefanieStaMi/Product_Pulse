import { NextResponse } from 'next/server'
import { cronAuthorized, processDueWelcomeEmails, publicOrigin, sequenceEnabled } from '../../../../lib/welcome-sequence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(req) {
  if (!cronAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // Production cron is a no-op until the sequence is explicitly enabled.
  if (process.env.VERCEL_ENV === 'production' && !sequenceEnabled()) {
    return NextResponse.json({ ok: true, skipped: 'disabled_in_production' })
  }
  const isTest = process.env.VERCEL_ENV !== 'production'
  const results = await processDueWelcomeEmails({ isTest, origin: publicOrigin(), limit: 20 })
  return NextResponse.json({ ok: true, isTest, sent: results.length, results })
}

export async function POST(req) {
  return GET(req)
}
