import Link from 'next/link'

export const portraitUrl = '/Stef_Profile.jpeg'

export const testimonialImages = {
  bidjan: '/Bidjan.jpg',
  andrea: '/Andrea.jpeg',
  chet: '/Chet.jpeg',
  simon: '/Simon.jpeg'
}

export function Nav() {
  return <header className="nav">
    <div className="container nav-inner">
      <Link href="/" className="logo" aria-label="Product Pulse home">Product Pulse<span /></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/#stef">About</Link>
        <Link href="/#services">What I do</Link>
        <Link href="/#work">Work</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="nav-cta" href="/contact">Book a conversation ↗</Link>
    </div>
  </header>
}

export function Portrait({className=''}) {
  return <div className={'portrait '+className}>
    <img src={portraitUrl} alt="Stefanie Stanislawski, fractional product leader for HRTech startups" loading="eager" fetchPriority="high" />
    <div className="portrait-tag">Product · Strategy · Ops</div>
  </div>
}

export function Footer() {
  return <footer className="footer-wrap"><div className="container footer footer-rich">
    <div className="footer-brand"><strong>Product Pulse<span className="footer-dot" /></strong><p>Fractional Product Leadership for HRTech.</p></div>
    <div className="footer-person"><strong>Stefanie Stanislawski</strong><span>Product leader · Founder · Operator</span><small>Based in Germany · Working internationally</small></div>
    <div className="footer-links">
      <a href="https://www.linkedin.com/in/stefaniestanislawski/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      <Link href="/contact">Contact ↗</Link>
    </div>
  </div></footer>
}
