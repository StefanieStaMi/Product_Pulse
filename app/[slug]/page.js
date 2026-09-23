import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav, Footer } from '../components'
import { cases } from '../caseData'

export function generateStaticParams(){return Object.keys(cases).map(slug=>({slug}))}

export async function generateMetadata({params}){
  const {slug}=await params
  const item=cases[slug]
  if(!item)return {}
  return {
    title:item.metaTitle,
    description:item.metaDescription,
    alternates:{canonical:`https://www.productpulseconsulting.com/${slug}`},
    openGraph:{title:item.metaTitle,description:item.metaDescription}
  }
}

export default async function CasePage({params}){
  const {slug}=await params
  const item=cases[slug]
  if(!item)notFound()
  const breadcrumb={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:'https://www.productpulseconsulting.com/'},
      {'@type':'ListItem',position:2,name:item.name,item:`https://www.productpulseconsulting.com/${slug}`}
    ]
  }
  return <><Nav/><main>
    <section className="case-hero container"><div className="kicker">Case study · {item.category}</div><h1 className="case-title">{item.title}</h1><div className="case-meta"><span>Client: <strong>{item.name}</strong></span><span>Duration: <strong>{item.duration}</strong></span><a href={item.preview} target="_blank" rel="noreferrer">Visit product ↗</a></div></section>
    <section className={'case-visual container '+item.tone}><div className="visual-note">{item.visualNote}</div><div className="visual-client">{item.name}</div></section>
    <section className="container"><div className="case-grid"><div className="case-panel"><h2>Overview</h2><p>{item.intro}</p></div><div className="case-panel"><h2>The challenge</h2><ul>{item.challenge.map(x=><li key={x}>{x}</li>)}</ul></div><div className="case-panel" style={{gridColumn:'1 / -1'}}><h2>What I did</h2><div className="case-grid" style={{padding:0}}>{item.solution.map(([t,p])=><div className="case-panel" key={t}><h2>{t}</h2><p>{p}</p></div>)}</div></div></div><div className="kicker">Selected outcomes</div><div className="case-results">{item.results.map(([v,l])=><div className="result" key={v}><strong>{v}</strong><span>{l}</span></div>)}</div><div className="actions" style={{paddingBottom:90}}><Link className="button light" href="/#work">← Back to all work</Link><Link className="button primary" href="/contact">Start a conversation ↗</Link></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><Footer/></>
}
