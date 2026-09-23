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
    openGraph:{title:item.metaTitle,description:item.metaDescription,images:[{url:'https://www.productpulseconsulting.com/og-image.svg',width:1200,height:630,type:'image/svg+xml',alt:'Product Pulse — Fractional Product Leadership for HRTech Startups'}]},twitter:{card:'summary_large_image',images:['https://www.productpulseconsulting.com/og-image.svg']}
  }
}

function MiniMetric({value,label}) {
  return <div className={styles.miniMetric}><strong>{value}</strong><span>{label}</span></div>
}

function ProductVisual({slug}) {
  if(slug==='potentialu') return <div className={styles.visualStage + ' ' + styles.potentialVisual} aria-label="PotentialU product interface mockup">
    <div className={styles.windowBar}><span/><span/><span/><b>PotentialU</b></div>
    <div className={styles.potentialShell}>
      <aside className={styles.sideRail}>
        <div className={styles.sideLogo}>U<span/></div>
        <div className={styles.sideItemActive}>⌕</div><div className={styles.sideItem}>◌</div><div className={styles.sideItem}>↗</div><div className={styles.sideItem}>□</div>
      </aside>
      <div className={styles.potentialMain}>
        <div className={styles.mockTopline}><div><span className={styles.eyebrow}>STORE OPERATIONS</span><strong>Hong Kong · District 07</strong></div><div className={styles.avatar}>DM</div></div>
        <div className={styles.searchBox}><span>⌕</span><strong>Ask anything about store operations…</strong><em>⌘ K</em></div>
        <div className={styles.answerCard}>
          <div className={styles.answerTag}>INSTANT ANSWER</div>
          <h3>What is the current closing procedure?</h3>
          <p>Store managers should complete the cash reconciliation, submit the daily checklist, and confirm the handover before close.</p>
          <div className={styles.sourceRow}><span>3 verified sources</span><span>92% confidence</span></div>
        </div>
        <div className={styles.potentialBottom}>
          <MiniMetric value="96%" label="answer accuracy"/>
          <MiniMetric value="15s" label="target response time"/>
          <MiniMetric value="24/7" label="frontline access"/>
        </div>
      </div>
    </div>
    <div className={styles.floatCard + ' ' + styles.floatTop}><span>AI AGENTS</span><strong>Ops · Coach · Team</strong><small>Role-aware intelligence</small></div>
    <div className={styles.floatCard + ' ' + styles.floatBottom}><span>LIVE CLIENT</span><strong>Starbucks HK</strong><small>Pilot → scaled deployment</small></div>
  </div>

  if(slug==='cubic-art') return <div className={styles.visualStage + ' ' + styles.cubicVisual} aria-label="Cubic.Art marketplace product interface mockup">
    <div className={styles.cubicOrb}/><div className={styles.cubicOrbSmall}/>
    <div className={styles.marketWindow}>
      <div className={styles.windowBar}><span/><span/><span/><b>Cubic.Art</b></div>
      <div className={styles.marketNav}><strong>Explore</strong><span>Artworks</span><span>Collections</span><span>My portfolio</span><span className={styles.marketProfile}>AS</span></div>
      <div className={styles.marketBody}>
        <div className={styles.marketHero}><div><span className={styles.eyebrow}>DIGITAL ART · MARKETPLACE</span><h3>Build a portfolio<br/>worth coming back to.</h3></div><MiniMetric value="+300%" label="revenue in 6 months"/></div>
        <div className={styles.artGrid}><div className={styles.artLarge}><span>01</span><b>Untitled / 04</b></div><div className={styles.artLilac}><span>02</span></div><div className={styles.artBlue}><span>03</span></div></div>
      </div>
    </div>
    <div className={styles.floatCard + ' ' + styles.cubicFloat}><span>PRODUCT SYSTEM</span><strong>Vision · UX · Roadmap</strong><small>Sharper direction, stronger execution</small></div>
  </div>

  if(slug==='leapsome') return <div className={styles.visualStage + ' ' + styles.leapsomeVisual} aria-label="Leapsome CoreHR product interface mockup">
    <div className={styles.hrShell}>
      <aside className={styles.hrSide}><div className={styles.hrLogo}>leapsome<span/></div><div className={styles.hrNavActive}>Overview</div><div>People</div><div>Time off</div><div>Payroll</div><div>Documents</div></aside>
      <div className={styles.hrMain}>
        <div className={styles.hrHead}><div><span className={styles.eyebrow}>COREHR</span><h3>People overview</h3></div><span className={styles.hrPill}>Beta</span></div>
        <div className={styles.hrMetrics}><MiniMetric value="428" label="employees"/><MiniMetric value="96%" label="profiles complete"/><MiniMetric value="14" label="new this month"/></div>
        <div className={styles.hrTable}>
          <div className={styles.hrTableHead}><span>Employee</span><span>Role</span><span>Status</span></div>
          <div><span><i className={styles.personDot}>MC</i> Maya Chen</span><span>People Ops</span><b>Active</b></div>
          <div><span><i className={styles.personDot}>JR</i> James Roth</span><span>Engineering</span><b>Active</b></div>
          <div><span><i className={styles.personDot}>AM</i> Ana Müller</span><span>Marketing</span><b>On leave</b></div>
          <div><span><i className={styles.personDot}>DK</i> David Kim</span><span>Sales</span><b>Active</b></div>
        </div>
      </div>
    </div>
    <div className={styles.floatCard + ' ' + styles.hrFloat}><span>PRODUCT ADVISORY</span><strong>Vision · Scope · Validation</strong><small>New CoreHR product area</small></div>
  </div>

  return <div className={styles.visualStage + ' ' + styles.oneClimateVisual} aria-label="OneClimate product interface mockup">
    <div className={styles.phoneMock}>
      <div className={styles.phoneNotch}/>
      <div className={styles.phoneTop}><span>9:41</span><b>OneClimate</b><span>•••</span></div>
      <div className={styles.pathHero}><span>YOUR ACTION PATH</span><strong>Make climate action<br/>a habit.</strong><div className={styles.pathCircle}>72%</div></div>
      <div className={styles.actionCards}><div><b>Today's action</b><span>Choose a lower-carbon lunch</span><em>+20</em></div><div><b>Keep your streak</b><span>4 days in a row</span><em>🔥</em></div></div>
      <div className={styles.phoneNav}><span>Home</span><span>Path</span><span>Impact</span><span>Profile</span></div>
    </div>
    <div className={styles.floatCard + ' ' + styles.oneClimateFloat}><span>GROWTH LOOP</span><strong>Activation · Habit · Retention</strong><small>Action Path → production in 6 weeks</small></div>
  </div>
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
          <ProductVisual slug={slug}/>
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
