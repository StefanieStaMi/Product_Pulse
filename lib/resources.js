import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { sbRpc } from './fitcheck'
import { copy, sheets } from './resources-config'

function secret() {
  return process.env.RESOURCE_DOWNLOAD_SECRET || process.env.FITCHECK_IP_SALT || 'layers'
}

const TOKEN_DAYS = 7

export function makeDownloadToken({ id, resource, lang }) {
  const exp = Date.now() + TOKEN_DAYS * 24 * 60 * 60 * 1000
  const body = Buffer.from(JSON.stringify({ id, resource, lang, exp })).toString('base64url')
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function readDownloadToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (!data?.id || !sheets[data.resource] || !sheets[data.resource].files[data.lang]) return null
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}

export function downloadPath(token) {
  return `/api/resources/download/${token}`
}

export function pdfAbsolutePath(filename) {
  const allowed = new Set(Object.values(sheets).flatMap(s => Object.values(s.files)))
  if (!allowed.has(filename)) return null
  return path.join(process.cwd(), 'content/resources', filename)
}

export async function readPdf(filename) {
  const abs = pdfAbsolutePath(filename)
  if (!abs) return null
  return fs.readFile(abs)
}

export async function submitResourceRequest({ email, firstName, resource, lang, newsletter, ipHash }) {
  return sbRpc('resource_request_submit', {
    p_email: email,
    p_first_name: firstName,
    p_resource: resource,
    p_lang: lang,
    p_consent: true,
    p_newsletter_opt_in: newsletter === true,
    p_ip_hash: ipHash
  })
}

export async function markResourceSent(id) {
  return sbRpc('resource_request_mark_sent', { p_id: id })
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

export function resourceEmail({ firstName, lang, title, url, origin }) {
  const es = lang === 'es'
  const subject = es
    ? `${firstName}, tu hoja está lista: ${title}`
    : `${firstName}, your sheet is ready: ${title}`
  const hello = es ? `Hola ${esc(firstName)},` : `Hi ${esc(firstName)},`
  const intro = es
    ? `Aquí está <strong>${esc(title)}</strong>. También te la adjunto en este correo, por si prefieres no hacer clic.`
    : `Here is <strong>${esc(title)}</strong>. I’ve also attached it to this email, in case you don’t want to click.`
  const btn = es ? 'Descargar la hoja' : 'Download the sheet'
  const note = es
    ? 'Este enlace funciona durante 7 días. Pediste esta hoja en Layers; no es una suscripción, a menos que hayas marcado la casilla del boletín.'
    : 'This link works for 7 days. You asked for this sheet from Layers; it isn’t a subscription, unless you also ticked the newsletter box.'
  const privacy = `${origin}/fit-check/privacy`
  const ig = es
    ? 'Si quieres seguir cerca, estoy en Instagram como <a href="https://www.instagram.com/stefanie.stami/" style="color:#333">@stefanie.stami</a>.'
    : 'If you’d like to stay close, I’m <a href="https://www.instagram.com/stefanie.stami/" style="color:#333">@stefanie.stami</a> on Instagram.'
  const html = `<!doctype html><html><head><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"></head><body style="margin:0;background:#f6f4f1">
<div style="max-width:600px;margin:0 auto;padding:32px 20px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#333">
<div style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:12px">Layers · Resources</div>
<div style="background:#fff;border-radius:12px;padding:28px 24px">
<p>${hello}</p>
<p>${intro}</p>
<p style="margin:28px 0"><a href="${esc(url)}" style="display:inline-block;background:#171716;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">${btn}</a></p>
<p>${ig}</p>
<p style="margin:20px 0 0;font-size:13px;color:#777">${note}</p>
</div>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin-top:20px"><a href="${esc(privacy)}" style="color:#999">${es ? 'Aviso de privacidad' : 'Privacy notice'}</a></p>
</div></body></html>`
  const text = es
    ? `Hola ${firstName},

Aquí está ${title}:
${url}

También te la adjunto en este correo. El enlace funciona durante 7 días.

Si quieres seguir cerca, estoy en Instagram como @stefanie.stami.

Aviso de privacidad: ${privacy}
`
    : `Hi ${firstName},

Here is ${title}:
${url}

I’ve also attached it to this email. The link works for 7 days.

If you’d like to stay close, I’m @stefanie.stami on Instagram.

Privacy notice: ${privacy}
`
  return { subject, html, text }
}

export async function sendResourceEmail({ email, firstName, lang, title, url, filename, pdf, origin }) {
  const { subject, html, text } = resourceEmail({ firstName, lang, title, url, origin })
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND3_API_KEY || process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FITCHECK_FROM || 'Stefanie | Layers <fitcheck@productpulseconsulting.com>',
      to: [email],
      reply_to: 'stefanie@productpulseconsulting.com',
      subject,
      html,
      text,
      attachments: pdf ? [{ filename, content: pdf.toString('base64') }] : undefined
    })
  })
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 300)}`)
}

export function uiCopy(lang) {
  return copy[lang] || copy.en
}
