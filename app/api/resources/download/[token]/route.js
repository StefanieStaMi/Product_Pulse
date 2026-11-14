import { NextResponse } from 'next/server'
import { sheets } from '../../../../../lib/resources-config'
import { readDownloadToken, readPdf } from '../../../../../lib/resources'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_req, { params }) {
  const { token } = await params
  const data = readDownloadToken(token)
  if (!data) return new NextResponse('This download link is invalid or has expired. Please request the sheet again.', { status: 410, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  const sheet = sheets[data.resource]
  const filename = sheet.files[data.lang]
  const downloadName = sheet.downloadName[data.lang]
  const pdf = await readPdf(filename)
  if (!pdf) return new NextResponse('The file is missing. Please try again later.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Cache-Control': 'private, no-store'
    }
  })
}
