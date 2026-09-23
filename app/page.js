import Link from 'next/link'
import { Nav, Footer, Portrait, testimonialImages } from './components'

const work = [
  {href:'/potentialu',name:'PotentialU',tag:'HRTech · Fractional Product Leader',title:'From an ambitious AI vision to a working enterprise product.',tone:'yellow',metric:'0→1'},
  {href:'/cubic-art',name:'Cubic.Art',tag:'Marketplace · Fractional Head of Product',title:'Bringing product direction, customer insight and execution together.',tone:'lilac',metric:'300%'},
  {href:'/oneclimate',name:'OneClimate',tag:'ClimateTech · Fractional Head of Product',title:'Finding the product loop that moved activation and engagement.',tone:'mint',metric:'6 weeks'},
  {href:'/leapsome',name:'Leapsome',tag:'HRTech · Product Advisor',title:'Helping shape a new CoreHR product inside a fast-growing platform.',tone:'blue',metric:'CoreHR'}
]

const services = [
  ['01','Product strategy','Turn founder ambition into a focused strategy, roadmap and set of decisions the team can execute against.'],
  ['02','Product leadership','Step into the leadership gap across Product, Design and Engineering — with enough seniority to challenge and enough hands-on energy to ship.'],
  ['03','Product operations','Build the operating rhythm behind good product: priorities, rituals, metrics, ownership and cross-functional alignment.'],
  ['04','Product-market fit','Find the signal in customer feedback, usage and commercial reality — then turn it into product choices.'],
  ['05','Zero → one','Get from fuzzy idea to something real, testable and valuable without building a giant machine first.'],
  ['06','UX & product quality','Simplify complex products and make the experience good enough to earn trust, adoption and retention.']
]

const founders = [
  ['The roadmap keeps changing.','You need someone to turn customer, commercial and founder input into a coherent set of product bets.'],
  ['The team is busy, but progress feels slow.','You need clearer ownership, decision-making and an operating rhythm — not more meetings.'],
  ['You are still the de facto Head of Product.','You need a senior product partner who can own the problem while you stay focused on the company.'],
  ['You are approaching a crucial next stage.','You need product, operations and leadership to scale together before the cracks become expensive.']
]

const quotes = [
  {image:testimonialImages.bidjan, quote:'“Stefanie is the product leader every startup needs. She made complex decisions easy and balanced high-level strategy with hands-on execution.”', name:'Bidjan Nashat', role:'Founder & CEO · PotentialU'},
  {image:testimonialImages.andrea, quote:'“Her strategic insights and hands-on approach helped us find our market fit and scale efficiently.”', name:'Andrea Zapata', role:'CEO · CubicArt'},
  {image:testimonialImages.chet, quote:'“She is the colleague you want by your side when you are delivering for clients and building a great team.”', name:'Chet Kuchinad', role:'Co-Founder · PotentialU'},
  {image:testimonialImages.simon, quote:'“Her impact on our product was immediate and significant. She helped us focus the team and build for meaningful user engagement and growth.”', name:'Simon Bail', role:'Founder & CEO · OneClimate'}
]

export default function Home() {
  return <><Nav/><main>
    <section className="hero container">
      <div className="hero-grid">
        <div className="hero-copy-wrap">
          <div className="kicker">Fractional Product Leadership · HRTech Startups</div>
          <h1>Make the product work harder for the business.</h1>
          <p className="hero-copy">I help early-stage HRTech founders when product strategy, execution or operations have become the bottleneck — stepping in as the senior product leader you need, without another full-time executive hire.</p>
          <div className="actions"><Link className="button primary" href="/contact">Let's talk ↗</Link><a className="text-link" href="#work">See the work ↓</a></div>
          <div className="hero-proof"><span>15+ years in HR & HRTech</span><span>Personio · Factorial · Leapsome</span><span>Founder · Product leader · Operator</span></div>
        </div>
        <Portrait/>
      </div>
    </section>
    <section className="logo-strip" aria-label="Selected company experience"><div className="container logo-strip-inner"><span>Experience across</span><div className="logo-cloud"><img src="/logos/personio.png" alt="Personio"/><img src="/logos/factorial.jpeg" alt="Factorial"/><img src="/logos/Leapsome.png" alt="Leapsome"/><img src="/logos/runa.png" alt="Runa"/><img src="/logos/potentialu.png" alt="PotentialU"/><img src="/logos/cubic.jpg" alt="Cubic.Art"/><img src="/logos/oneclimate.jpeg" alt="OneClimate"/></div></div></section><section className="credibility container"><div className="credibility-grid"><div><div className="kicker">The person behind Product Pulse</div><h2>I’m Stefanie Stanislawski.</h2></div><div className="credibility-copy"><p><strong>15+ years across HR, HRTech and product.</strong> I’ve worked inside companies like Personio, Factorial and Leapsome, built a startup myself, and now step into early-stage teams when product needs senior leadership without another full-time executive.</p><div className="credibility-facts"><span>Founder</span><span>Product leader</span><span>Operator</span><span>Europe + LatAm</span></div><Link className="text-link" href="/about">More about my background ↗</Link></div></div></section>
    <section className="section container" id="about">
      <div className="section-head"><div><div className="kicker">For founders & CEOs</div><h2>When product starts becoming the company's bottleneck.</h2></div><p className="section-intro">You don't necessarily need a permanent CPO. You do need somebody senior who can see the whole product system, make hard calls and get the team moving.</p></div>
      <div className="founder-grid light-grid">{founders.map(([title,text],i)=><article className="founder-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="section dark-band" id="services">
      <div className="container"><div className="section-head"><div><div className="kicker light-kicker">What I do</div><h2>Strategy is useful.<br/>Execution is the point.</h2></div><p className="section-intro dark-intro">I work across product strategy and product operations because, in an early-stage company, the two are inseparable.</p></div>
      <div className="services dark-services">{services.map(([n,t,p])=><article className="service dark-service" key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></div>
    </section>
    <section className="section container" id="work">
      <div className="section-head"><div><div className="kicker">Selected work</div><h2>Products I've helped<br/>move forward.</h2></div><p className="section-intro">A few examples of the problems I've stepped into — from zero-to-one product creation to market fit, scale and team operating models.</p></div>
      <div className="work-grid">{work.map((item,i)=><Link className={'work-card '+item.tone} href={item.href} key={item.href}><div className="work-art"><div className="work-index">0{i+1}</div><div className="work-metric">{item.metric}</div><div className="artifact"><span>{item.name}</span><i/><i/><i/></div></div><div className="work-info"><small>{item.tag}</small><h3>{item.title}</h3><span>Read case study ↗</span></div></Link>)}</div>
    </section>
    <section className="section proof-section"><div className="container"><div className="proof-head"><div><div className="kicker">Client proof</div><h2>Good product work<br/>gets remembered.</h2></div><p>Four founders, four different problems — the common thread is making product decisions clearer and execution stronger.</p></div><div className="quotes">{quotes.map(q=><article className="quote-card" key={q.name}><p>{q.quote}</p><div className="quote-person"><img src={q.image} alt={q.name+' — '+q.role} width="56" height="56" loading="lazy"/><div><strong>{q.name}</strong><span>{q.role}</span></div></div></article>)}</div></div></section>
    <section className="section container about-tease"><div className="about-tease-inner"><div><div className="kicker">A bit more about me</div><h2>Founder empathy. Product discipline. Zero patience for theatre.</h2></div><div><p>I've lived the founder side, the product side and the scale-up side. That means I can move between strategy, customer reality, team dynamics and execution without losing the thread.</p><Link className="button light" href="/about">Meet Stef ↗</Link></div></div></section>
    <section className="container cta" id="contact"><div><div><div className="kicker light-kicker">Let's work together</div><h2>Have a product problem worth solving?</h2><p>Tell me what is stuck. We'll figure out whether I can help.</p></div><Link className="button accent" href="/contact">Start the conversation ↗</Link></div></section>
  </main><Footer/></>
}
