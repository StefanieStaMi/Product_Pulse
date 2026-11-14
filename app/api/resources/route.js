import { NextResponse } from 'next/server'
import { hashIp, subscribeNewsletter } from '../../../lib/fitcheck'
import { enrolWelcomeSequence } from '../../../lib/welcome-sequence'
import { isLang, isSheet, sheets } from '../../../lib/resources-config'
import { downloadPath, makeDownloadToken, markResourceSent, readPdf, sendResourceEmail, submitResourceRequest } from '../../../lib/resources'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const str = (v, max, min = 0) => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max ? v.trim() : null

function originFrom(req) {
  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  return process.env.RESOURCE_PUBLIC_ORIGIN || (host ? `${proto}://${host}` : 'https://www.productpulseconsulting.com')
}

export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  // Honeypot: pretend success so bots learn nothing
  if (body.company_website) return NextResponse.json({ ok: true })

  const email = str(body.email, 200)
  const firstName = str(body.first_name, 60, 1)
  const resource = isSheet(body.resource) ? body.resource : null
  const lang = isLang(body.lang) ? body.lang : null
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (!firstName || !resource || !lang) return NextResponse.json({ error: 'Please tell me your name and which sheet you would like.' }, { status: 400 })
  if (body.consent !== true) return NextResponse.json({ error: 'Consent is required to send you the sheet.' }, { status: 400 })

  const sheet = sheets[resource]
  const filename = sheet.files[lang]
  const downloadName = sheet.downloadName[lang]
  const title = sheet.title[lang]
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'

  let id
  try {
    id = await submitResourceRequest({
      email,
      firstName,
      resource,
      lang,
      newsletter: body.newsletter === true,
      ipHash: hashIp(ip)
    })
  } catch (e) {
    if (String(e.body).includes('rate_limited')) return NextResponse.json({ error: "You've already requested a few of these today. Give it a day and try again." }, { status: 429 })
    console.error('resource submit', e.message, e.body)
    return NextResponse.json({ error: 'Something went wrong on our side. Please try again in a minute.' }, { status: 500 })
  }

  const token = makeDownloadToken({ id, resource, lang })
  const origin = originFrom(req)
  const url = `${origin}${downloadPath(token)}`
  let emailed = false
  try {
    const pdf = await readPdf(filename)
    if (!pdf) throw new Error(`missing pdf ${filename}`)
    await sendResourceEmail({ email: email.toLowerCase(), firstName, lang, title, url, filename: downloadName, pdf, origin })
    emailed = true
    await markResourceSent(id).catch(e => console.error('resource mark_sent', e.message, e.body))
  } catch (e) {
    console.error('resource email', e.message)
  }

  // Welcome sequence: only when the newsletter box is ticked. Disabled in
  // production until WELCOME_SEQUENCE_ENABLED=true. Do not start it for
  // people who only requested a download.
  if (body.newsletter === true) {
    try { await subscribeNewsletter({ email: email.toLowerCase(), firstName }) }
    catch (e) { console.error('resource newsletter', e.message) }
    try { await enrolWelcomeSequence({ email: email.toLowerCase(), firstName, source: resource, lang }) }
    catch (e) { console.error('resource welcome sequence', e.message) }
  }

  if (!emailed) {
    return NextResponse.json({
      error: 'We saved your request but hit a snag sending the email. You can download the sheet below, and Stefanie can follow up if needed.',
      ok: true,
      downloadUrl: downloadPath(token),
      filename: downloadName,
      title
    }, { status: 200 })
  }

  return NextResponse.json({ ok: true, downloadUrl: downloadPath(token), filename: downloadName, title })
}
