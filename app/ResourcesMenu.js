'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Add more resources here — they appear in the dropdown automatically.
export const resources = [
  {
    href: '/fit-check',
    title: 'Fractional Fit Check',
    badge: 'Free',
    description: 'Find your first step into fractional work in 3 minutes'
  }
]

export default function ResourcesMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btn = useRef(null)
  const pathname = usePathname()
  const hoverTimer = useRef(null)
  const hoverOpenedAt = useRef(0)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onDown = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const enter = () => { if (!canHover()) return; clearTimeout(hoverTimer.current); setOpen(o => { if (!o) hoverOpenedAt.current = Date.now(); return true }) }
  const leave = () => { if (!canHover()) return; hoverTimer.current = setTimeout(() => setOpen(false), 150) }
  const onBlur = e => { if (ref.current && !ref.current.contains(e.relatedTarget)) setOpen(false) }

  return <div className={'res' + (open ? ' is-open' : '')} ref={ref} onMouseEnter={enter} onMouseLeave={leave} onBlur={onBlur}>
    <button ref={btn} type="button" className="res-trigger" aria-expanded={open} aria-controls="res-panel"
      onClick={() => {
        // If hover just opened it, a click shouldn't immediately close it again
        if (Date.now() - hoverOpenedAt.current < 600) { setOpen(true); return }
        setOpen(o => !o)
      }}>
      <span className="res-dot" aria-hidden="true" />Resources<span className="res-caret" aria-hidden="true">▾</span>
    </button>
    <div id="res-panel" className="res-panel" hidden={!open}>
      <ul>
        {resources.map(r => <li key={r.href}>
          <Link href={r.href} className="res-item" onClick={() => setOpen(false)}>
            <span className="res-title">{r.title}{r.badge && <span className="res-badge">{r.badge}</span>}</span>
            <span className="res-desc">{r.description}</span>
          </Link>
        </li>)}
      </ul>
    </div>
  </div>
}
