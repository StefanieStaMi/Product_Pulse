import Link from 'next/link'
import { Nav, Footer } from '../components'

export const metadata={
  title:'Contact Stefanie — Fractional Product Leadership for HRTech',
  description:'Talk to Stefanie about fractional product leadership, product operations or a product challenge inside your HRTech startup.',
  alternates:{canonical:'https://www.productpulseconsulting.com/contact'}
}

export default function Contact(){return <><Nav/><main className="section container"><div className="contact-layout"><div><div className="kicker">Let's connect</div><h1 className="case-title">Tell me what is stuck.</h1><p className="hero-copy">Whether product has become the bottleneck, you need a senior product partner for the next stage, or your team needs a clearer operating model, let's start with the problem.</p><div className="contact-notes"><div><strong>Good fit</strong><span>Early-stage HRTech · founders & CEOs · product + ops leadership gaps</span></div><div><strong>Usually not</strong><span>Execution-only PM work without room for strategic ownership</span></div></div><div className="actions"><Link href="/" className="button light">← Back home</Link></div></div><div className="tally"><iframe src="https://tally.so/embed/mJ5Njo?alignLeft=1&transparentBackground=1&dynamicHeight=1" title="Product Pulse contact form"/></div></div></main><Footer/></>}
