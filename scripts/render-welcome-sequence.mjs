import { writeFile, mkdir } from 'node:fs/promises'
import { buildWelcomeEmail, ALL_TEMPLATE_KEYS } from '../lib/welcome-sequence-emails.js'

const outDir = process.argv[2] || '/workspace/emails/seq-test'
const unsub = 'https://www.productpulseconsulting.com/api/welcome-sequence/unsubscribe?t=TEST'
const cases = [
  { key: '1a', step: 1, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '1b', step: 1, source: 'paz', firstName: 'Stefanie' },
  { key: '1c', step: 1, source: 'mapa', firstName: 'Stefanie' },
  { key: '2', step: 2, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '3', step: 3, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '4', step: 4, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '5', step: 5, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '6', step: 6, source: 'fitcheck', firstName: 'Stefanie' },
  { key: '7', step: 7, source: 'fitcheck', firstName: 'Stefanie' }
]

await mkdir(outDir, { recursive: true })
const index = []
for (const c of cases) {
  const built = buildWelcomeEmail({ ...c, unsubscribeUrl: unsub })
  if (built.key !== c.key) throw new Error(`key mismatch ${c.key} vs ${built.key}`)
  await writeFile(`${outDir}/email-${c.key}.html`, built.html)
  await writeFile(`${outDir}/email-${c.key}.txt`, built.text)
  index.push(`# ${c.key}\nSubject: ${built.subject}\nPreview: ${built.preview}\n`)
}
await writeFile(`${outDir}/index.md`, `# Welcome sequence renders\n\n${index.join('\n')}`)
if (ALL_TEMPLATE_KEYS.join(',') !== cases.map(c => c.key).join(',')) throw new Error('missing templates')
console.log('wrote', cases.length, 'emails to', outDir)
