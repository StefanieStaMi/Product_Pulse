import Link from 'next/link'
import { Nav, Footer } from '../../components'
import s from '../fit-check.module.css'

export const metadata = { title: 'Check your inbox — Fractional Fit Check', robots: { index: false } }

export default function Thanks() {
  return <><Nav /><main className="section container"><div className={s.wrap}>
    <div className="kicker">Layers · Fractional Fit Check</div>
    <h1 className="case-title">Done. Check your inbox.</h1>
    <p className={s.lead}>Your one-page Fit Check is on its way and should land in the next few minutes. If it hides, look in Promotions or Spam and drag it out. It's worth the rescue.</p>
    <p>While you wait: write down the one sentence you'd say if someone at a school pickup asked "so what do you do now?". We'll compare notes.</p>
    <div className="actions"><Link href="/" className="button light">← Back home</Link></div>
  </div></main><Footer /></>
}
