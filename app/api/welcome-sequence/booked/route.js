import { NextResponse } from 'next/server'
import { cronAuthorized, previewOnly, setBooked } from '../../../../lib/welcome-sequence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Manual v1: mark an email as having booked the session so emails 3, 5 and 7 are skipped.
export async function POST(req) {
  if (!(cronAuthorized(req) || previewOnly(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })
  const updated = await setBooked(email)
  return NextResponse.json({ ok: true, updated })
}
