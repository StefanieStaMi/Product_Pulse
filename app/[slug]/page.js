import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav, Footer } from '../components'
import { cases } from '../caseData'
import styles from './case-study.module.css'

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
  const toneClass=styles[item.tone] || styles.yellow
  const breadcrumb={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:'https://www.productpulseconsulting.com/'},
      {'@type':'ListItem',position:2,name:item.name,item:`https://www.productpulseconsulting.com/${slug}`}
    ]
  }

  return <><Nav/><main className={styles.page}>
    <section className={`${styles.hero} ${toneClass}`}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className="kicker">Case study · {item.category}</div>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.lead}>{item.intro}</p>
            <div className={styles.heroMeta}>
              <div><span>Engagement</span><strong>{item.duration}</strong></div>
              <div><span>Scope</span><strong>{item.scope}</strong></div>
            </div>
            <a className="button primary" href={item.preview} target="_blank" rel="noreferrer">Visit product ↗</a>
          </div>
          <div className={styles.gallery} aria-label={item.name + ' project visuals'}>
            <div className={styles.galleryFeature}><img src={item.images[0].src} alt={item.images[0].alt} /></div>
            <div className={styles.galleryStack}>
              <div className={styles.gallerySmall}><img src={item.images[1].src} alt={item.images[1].alt} /></div>
              <div className={styles.gallerySmall}><img src={item.images[2].src} alt={item.images[2].alt} /></div>
            </div>
            <div className={styles.galleryLabel}>{item.visualNote}</div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.snapshot}>
      <div className={styles.container}>
        <div className={styles.snapshotGrid}>
          <div><span>Client</span><strong>{item.name}</strong></div>
          <div><span>Role</span><strong>{item.category}</strong></div>
          <div><span>Focus</span><strong>{item.scope}</strong></div>
        </div>
      </div>
    </section>

    <section className={styles.story}>
      <div className={styles.container}>
        <div className={styles.storyGrid}>
          <article>
            <div className="kicker">The starting point</div>
            <h2>What needed to change.</h2>
            <p>{item.intro}</p>
          </article>
          <article>
            <div className="kicker">The challenge</div>
            <h2>Where the friction was.</h2>
            <ul>{item.challenge.map(x=><li key={x}>{x}</li>)}</ul>
          </article>
        </div>

        <div className={styles.workHeader}>
          <div>
            <div className="kicker">The work</div>
            <h2>Where I moved the product forward.</h2>
          </div>
          <p>Strategy, execution and the operating decisions behind the visible product.</p>
        </div>

        <div className={styles.solutionGrid}>
          {item.solution.map(([title,body],i)=><article className={styles.solutionCard} key={title}>
            <span>0{i+1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>)}
        </div>

        {item.spotlight&&<section className={styles.spotlight}>
          <div className={styles.spotlightEyebrow}>{item.spotlight.eyebrow}</div>
          <div className={styles.spotlightGrid}>
            <h2>{item.spotlight.title}</h2>
            <p>{item.spotlight.body}</p>
          </div>
        </section>}

        <div className={styles.outcomeHeader}>
          <div className="kicker">Selected outcomes</div>
          <h2>What changed in the business and product.</h2>
        </div>
        <div className={styles.results}>
          {item.results.map(([value,label])=><div className={styles.result} key={value}><strong>{value}</strong><span>{label}</span></div>)}
        </div>

        <div className={styles.bottomNav}>
          <Link className="button light" href="/#work">← Back to all work</Link>
          <Link className="button primary" href="/contact">Start a conversation ↗</Link>
        </div>
      </div>
    </section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><Footer/></>
}
