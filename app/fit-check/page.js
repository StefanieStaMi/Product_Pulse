import { Nav, Footer } from '../components'
import FitCheckForm from './FitCheckForm'
import s from './fit-check.module.css'

export const metadata = {
  title: 'Fractional Fit Check — free, 5 minutes',
  description: 'Ten honest answers, one page back: what you could sell as a fractional, who would buy it, and your first step this week.',
  alternates: { canonical: 'https://www.productpulseconsulting.com/fit-check' }
}

export default function FitCheck() {
  return <><Nav /><main className="section container"><div className={s.wrap}>
    <div className="kicker">Layers · Fractional Fit Check</div>
    <h1 className="case-title">You don't need a five-year plan. You need a first step.</h1>
    <p className={s.lead}>The Fractional Fit Check turns 10 honest answers into a one-page profile: what you could sell, who'd buy it, and the one thing to do this week. Free, five minutes, straight to your inbox.</p>
    <ul className={s.list}>
      <li>You've done the big jobs. You're good at them. You'd just like to do them on three days a week.</li>
      <li>You've read every "how I went fractional" post and still don't know what you'd actually offer.</li>
      <li>Your spreadsheet of options has become its own part-time job.</li>
    </ul>
    <p><strong>What you get:</strong> your fractional fit in plain words, the problem you solve as one usable sentence, who'd likely pay for it, how it could fit around the life you have, and one first step you can do in under an hour.</p>
    <p className={s.small}>No CV upload. Your answers are deleted after 30 days. AI helps write it; it's a starting point, not advice. <a href="/fit-check/privacy">Privacy notice</a></p>
    <FitCheckForm />
  </div></main><Footer /></>
}
