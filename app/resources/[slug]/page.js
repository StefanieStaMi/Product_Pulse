import { notFound } from 'next/navigation'
import { Nav, Footer } from '../../components'
import { isLang, isSheet, sheets } from '../../../lib/resources-config'
import ResourcesView from '../ResourcesView'

export function generateStaticParams() {
  return Object.keys(sheets).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const sheet = sheets[slug]
  if (!sheet) return {}
  const strip = s => s.replace(/^\[Placeholder( ES)?\]\s*/, '')
  return {
    title: `${strip(sheet.title.en)} — Layers`,
    description: strip(sheet.description.en),
    alternates: { canonical: `https://www.productpulseconsulting.com/resources/${slug}` }
  }
}

export default async function ResourceDeepLink({ params, searchParams }) {
  const { slug } = await params
  if (!isSheet(slug)) notFound()
  const sp = await searchParams
  const lang = isLang(sp?.lang) ? sp.lang : 'en'
  return <><Nav /><ResourcesView initialResource={slug} initialLang={lang} /><Footer /></>
}
