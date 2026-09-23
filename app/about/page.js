import Link from 'next/link'
import { Nav, Footer, Portrait } from '../components'

export const metadata = {
  title: 'About Stefanie Stanislawski — HRTech Product Leader',
  description: 'Meet Stefanie Stanislawski, a fractional product leader with 15+ years across HR, HRTech and startup product leadership.',
  alternates: { canonical: 'https://www.productpulseconsulting.com/about' }
}

export default function About(){
  return <><Nav/><main>
    <section className="about-hero container">
      <div><div className="kicker">About Stef</div><h1 className="display">A product leader with a founder's bias for action.</h1><p className="lead">I've spent 15+ years at the intersection of HR, technology and product — inside scale-ups, startups and my own HRTech company.</p></div>
      <Portrait className="about-portrait"/>
    </section>
    <section className="section container split">
      <div><div className="kicker">The useful bit</div><h2>I know the difference between a product problem and an organisation problem.</h2></div>
      <div className="copy"><p>Sometimes the roadmap is the problem. Sometimes it is the decision-making around it. Sometimes the product team is shipping, but nobody agrees what “good” looks like.</p><p>My role is to make those things explicit — then help the team move.</p><p>I've worked across Personio, Factorial and Leapsome, founded Predictive People, and now work with founders who need senior product leadership without adding another permanent executive too early.</p></div>
    </section>
    <section className="section dark-band"><div className="container founder-grid"><div><div className="kicker light-kicker">Where I add the most value</div><h2>When the founder is still the product person.</h2></div><div className="founder-list"><div><b>01</b><span>You're growing and product decisions are becoming a bottleneck.</span></div><div><b>02</b><span>You need a roadmap the whole company can actually believe in.</span></div><div><b>03</b><span>Your PM/Design/Engineering setup needs clearer operating rhythm.</span></div><div><b>04</b><span>You need someone senior enough to challenge the plan — and hands-on enough to change it.</span></div></div></div></section>
    <section className="container cta"><div><div><div className="kicker light-kicker">Ready when you are</div><h2>Let's look at the problem before we talk about the solution.</h2></div><Link className="button primary" href="/contact">Start the conversation ↗</Link></div></section>
  </main><Footer/></>
}
