import Link from 'next/link'
import { Nav, Footer } from '../../components'
import { BOOKING_URL } from '../../../lib/booking'
import s from '../fit-check.module.css'

export const metadata = { title: 'Check your inbox — Freedom-of-Work Fit Check', robots: { index: false } }

export default function Thanks() {
  return <><Nav /><main className="section container"><div className={s.wrap}>
    <div className="kicker">Layers · Freedom-of-Work Fit Check</div>
    <h1 className="case-title">Your options are on their way.</h1>
    <p className={s.lead}>Check your inbox in about a minute. If it hides, look in Promotions or Spam and drag it out.</p>
    <div className={s.card}>
      <div className="kicker">Next step · 1:1 working session</div>
      <h2>Let's turn your best option into a plan you can actually test.</h2>
      <p>Bring your results to a one-hour working session with me. We'll challenge the ideas, sharpen who you could help and how, and map your first experiment around your work and family life.</p>
      <p><strong>60 minutes · 1:1 on video · €150</strong>, paid when you book.</p>
      <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Build my test plan with Stefanie · €150</a>
    </div>
    <div className="actions"><Link href="/" className="button light">← Back home</Link></div>
  </div></main><Footer /></>
}
