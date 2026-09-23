import Link from 'next/link'
import { Nav, Footer } from './components'

const projects = [
  ['/cubic-art','Cubic.Art','Fractional Head of Product','From scattered execution to a sharper investment platform.'],
  ['/oneclimate','OneClimate','Fractional Head of Product','Building the habit loop behind a climate-action product.'],
  ['/potentialu','PotentialU','Fractional Product Leader','Turning an ambitious HRTech vision into a working product.'],
  ['/leapsome','Leapsome','Product Advisor','Helping build a modern HRIS inside a high-growth platform.']
]

export default function Home() {
  const services = [
    ['01','Product Strategy','Clarify direction, sharpen the roadmap and connect customer needs with business outcomes.'],
    ['02','Product-Market Fit & Growth','Find the highest-leverage opportunities and create a path from usage to durable growth.'],
    ['03','UX, IA & Product Quality','Turn complexity into intuitive experiences through strong product thinking and user journeys.'],
    ['04','Product Leadership','Create clarity across product, design, engineering and leadership.'],
    ['05','Zero-to-One','Move from fuzzy idea to useful prototype or production-ready product without overbuilding.'],
    ['06','Product Ops & Scale','Establish the rituals, metrics and operating model that make execution predictable.']
  ]
  return <><Nav/><main>
    <section className="hero container"><div><div className="kicker">Fractional Product Leadership · HRTech</div><h1>Make the product feel inevitable.</h1><p className="hero-copy">I help ambitious teams turn product uncertainty into clear priorities, stronger execution and products people actually want to use.</p><div className="actions"><a className="button primary" href="#contact">Let's talk ↗</a><a className="button light" href="#projects">See the work ↓</a></div></div></section>
    <section className="section container split" id="about"><div><div className="kicker">About</div><h2>Senior enough for the hard calls. Hands-on enough to make them happen.</h2></div><div><p>I've spent 15+ years across HR, HRTech and product leadership, working with startups and scale-ups where product decisions directly impact growth.</p><p>My sweet spot is the messy middle: when the idea is strong, the team is capable, but priorities, customer insight, product strategy or execution need to click into place.</p><p>I've worked at Personio, Factorial and Leapsome, founded my own HRTech company, and led products from zero-to-one through scale.</p><a className="button light" href="https://www.linkedin.com/in/stefaniestanislawski/" target="_blank" rel="noreferrer">More on LinkedIn ↗</a></div></section>
    <section className="section container" id="services"><div className="section-head"><div><div className="kicker">How I help</div><h2>Less product theatre.<br/>More product progress.</h2></div><p className="section-intro">Flexible leadership for the moments when a full-time executive isn't the answer — but senior product thinking is.</p></div><div className="services">{services.map(([n,t,p])=><article className="service" key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></section>
    <section className="section container" id="projects"><div className="section-head"><div><div className="kicker">Selected work</div><h2>Real products.<br/>Real constraints.</h2></div></div><div className="projects">{projects.map(([href,n,k,t])=><Link className="project" href={href} key={href}><small>{k} · {n}</small><h3>{t}</h3><span>Read case study ↗</span></Link>)}</div></section>
    <section className="section container"><div className="kicker">Proof</div><h2>What people say</h2><div className="quotes"><blockquote>“Stefanie is the product leader every startup needs.”<strong>Bidjan Nashat</strong><span>Founder & CEO @ PotentialU</span></blockquote><blockquote>“Her strategic insights and hands-on approach helped us find our market fit and scale efficiently.”<strong>Andrea Zapata</strong><span>CEO @ CubicArt</span></blockquote><blockquote>“Her impact was immediate and significant.”<strong>Simon Bail</strong><span>Founder & CEO @ OneClimate</span></blockquote></div></section>
    <section className="container cta" id="contact"><div><div><div className="kicker">Let's work together</div><h2>Have a product problem worth solving?</h2></div><Link className="button primary" href="/contact">Start the conversation ↗</Link></div></section>
  </main><Footer/></>
}