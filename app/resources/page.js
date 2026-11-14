import { Nav, Footer } from '../components'
import { isLang, isSheet } from '../../lib/resources-config'
import ResourcesView from './ResourcesView'

export const metadata = {
  title: 'Resources — PAZ, MAPA, and the Freedom-of-Work Fit Check',
  description: 'Free resources for building a calm, values-filled home on purpose: the PAZ Peace by design sheet, the MAPA family temperament map, and the Freedom-of-Work Fit Check.',
  alternates: { canonical: 'https://www.productpulseconsulting.com/resources' }
}

export default async function ResourcesPage({ searchParams }) {
  const sp = await searchParams
  const resource = isSheet(sp?.r) ? sp.r : ''
  const lang = isLang(sp?.lang) ? sp.lang : 'en'
  return <><Nav /><ResourcesView initialResource={resource} initialLang={lang} /><Footer /></>
}
