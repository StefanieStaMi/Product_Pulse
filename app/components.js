import Link from 'next/link'

export const portraitUrl = 'https://framerusercontent.com/images/SwJjrw9gWACrKR3bryOEsCSM.jpeg'

export const testimonialImages = {
  bidjan: 'https://framerusercontent.com/images/1OJn3UOpoMx4ZffdPPgES11gibg.jpeg',
  andrea: 'https://framerusercontent.com/images/0KbSXHNyjum6SCVG0DbzRGsu5PA.webp',
  chet: 'https://framerusercontent.com/images/AFa1CPSR4u0Us5ht8R9yFboJexA.jpeg',
  simon: 'https://framerusercontent.com/images/PvFczTssVGUdSJlAhf5E3GUoHY.jpeg'
}

export function Nav() {
  return <header className="nav">
    <div className="container nav-inner">
      <Link href="/" className="logo" aria-label="Product Pulse home">Product Pulse<span /></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/#about">About</Link>
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
  return <footer className="container footer">
    <div><strong>Product Pulse</strong><span>Fractional Product Leadership for HRTech</span></div>
    <div className="footer-links">
      <a href="https://www.linkedin.com/in/stefaniestanislawski/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      <Link href="/contact">Contact</Link>
    </div>
  </footer>
}
