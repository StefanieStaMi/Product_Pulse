import Link from 'next/link'

export function Nav() {
  return <header className="nav"><div className="container nav-inner">
    <Link href="/" className="logo">Product Pulse<span /></Link>
    <nav className="nav-links">
      <a href="/#about">About</a><a href="/#services">Services</a><a href="/#projects">Projects</a><a href="/#contact">Contact</a>
    </nav>
  </div></header>
}

export function Footer() {
  return <footer className="container footer"><span>© {new Date().getFullYear()} Stefanie Stanislawski</span><a href="https://www.linkedin.com/in/stefaniestanislawski/" target="_blank" rel="noreferrer">LinkedIn ↗</a></footer>
}
