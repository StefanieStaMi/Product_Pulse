import { NextResponse } from 'next/server'
import { readUnsubToken, unsubscribeWelcomeSequence } from '../../../../lib/welcome-sequence'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function thanksHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribed · Layers</title></head>
<body style="margin:0;background:#f6f4f1;font-family:Georgia,serif;color:#333">
<main style="max-width:560px;margin:0 auto;padding:48px 24px">
<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#888">Layers</p>
<h1 style="font-size:28px;line-height:1.3;font-weight:normal">You're unsubscribed.</h1>
<p>You won't get any more Layers emails. No hard feelings — you can come back anytime via the site.</p>
<p><a href="https://www.productpulseconsulting.com" style="color:#1f3b34">productpulseconsulting.com</a></p>
</main></body></html>`
}

function badHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe · Layers</title></head>
<body style="margin:0;background:#f6f4f1;font-family:Georgia,serif;color:#333">
<main style="max-width:560px;margin:0 auto;padding:48px 24px">
<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#888">Layers</p>
<h1 style="font-size:28px;line-height:1.3;font-weight:normal">This unsubscribe link isn't valid.</h1>
<p>If you want to stop Layers emails, reply to any message and I'll take you off the list.</p>
</main></body></html>`
}

async function handle(req) {
  let token = new URL(req.url).searchParams.get('t')
  if (!token && req.method === 'POST') {
    try {
      const ct = req.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        const body = await req.json()
        token = body.t || body.token
      } else {
        const form = await req.formData()
        token = form.get('t') || form.get('token')
      }
    } catch { /* one-click POST may have an empty List-Unsubscribe=One-Click body */ }
  }
  // RFC 8058 one-click: some clients POST with List-Unsubscribe=One-Click and the token only in the URL.
  const data = readUnsubToken(token)
  if (!data) {
    if (req.method === 'POST' && !token) {
      // Empty one-click body without a token in the URL cannot be processed.
      return new NextResponse('Missing token', { status: 400 })
    }
    return new NextResponse(badHtml(), { status: 400, headers: { 'content-type': 'text/html; charset=utf-8' } })
  }
  await unsubscribeWelcomeSequence({ id: data.id || null, email: data.email })
  if (req.method === 'POST') return new NextResponse(null, { status: 200 })
  return new NextResponse(thanksHtml(), { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
}

export async function GET(req) { return handle(req) }
export async function POST(req) { return handle(req) }
