import Link from 'next/link'
import { Nav, Footer } from './components'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="not-found">
        <div className="container not-found-inner">
          <div className="not-found-code">404</div>

          <div className="not-found-grid">
            <div>
              <div className="kicker">Wrong turn</div>
              <h1>Looks like this page got lost.</h1>
            </div>

            <div className="not-found-copy">
              <p>
                The page you were looking for does not exist — or the link has gone a little stale.
              </p>
              <div className="not-found-actions">
                <Link href="/" className="button primary">Back to home ↗</Link>
                <Link href="/contact" className="text-link">Talk to Stef</Link>
              </div>
            </div>
          </div>

          <div className="not-found-note">
            <span>PRODUCT PULSE</span>
            <strong>Good products know when to redirect.</strong>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
