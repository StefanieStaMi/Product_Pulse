'use client'

import { useEffect, useState } from 'react'

export default function AboutOverlay() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return <>
    <button className="button light about-trigger" type="button" onClick={() => setOpen(true)}>A little more about me +</button>
    {open && <div className="about-overlay" role="dialog" aria-modal="true" aria-labelledby="about-overlay-title" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="about-drawer">
        <button className="about-close" type="button" aria-label="Close about Stefanie" onClick={() => setOpen(false)}>×</button>
        <div className="kicker">More about Stef</div>
        <h2 id="about-overlay-title">Founder perspective.<br/>Operator instincts.</h2>
        <div className="about-overlay-grid">
          <div><h3>My story</h3><p>I’ve spent 15+ years across HR, HRTech and product — from scale-ups like Personio, Factorial and Leapsome to building my own company and working hands-on with early-stage founders.</p></div>
          <div><h3>How I work</h3><p>Strategic enough to challenge the roadmap. Hands-on enough to get into the product. I move between customer reality, commercial priorities, team dynamics and execution without losing the thread.</p></div>
          <div><h3>Where I add value</h3><p>I’m most useful when the product has become a founder bottleneck: priorities are moving, teams need clearer ownership, or the next stage requires more product leadership than the company needs to hire full-time.</p></div>
          <div><h3>Experience</h3><p>Personio · Factorial · Leapsome · Runa · PotentialU · Cubic.Art · OneClimate</p></div>
        </div>
        <div className="about-overlay-actions"><a className="button primary" href="https://www.linkedin.com/in/stefaniestanislawski/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="text-link" href="/contact">Talk to me ↗</a></div>
      </div>
    </div>}
  </>
}
