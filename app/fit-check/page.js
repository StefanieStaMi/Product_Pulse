import { Nav, Footer } from '../components'
import FitCheckForm from './FitCheckForm'
import s from './fit-check.module.css'

export const metadata = {
  title: 'Freedom-of-Work Fit Check — free, 5 minutes',
  description: 'For women carrying a big career and a young family, often far from home: turn the career you already have into 2–3 possible options for work that fits your life, plus a small way to test each one.',
  alternates: { canonical: 'https://www.productpulseconsulting.com/fit-check' },
  openGraph: {
    title: "You've built the experience. Let's find work that fits your home.",
    description: "You've built the experience. Let's find work that fits your home. 2–3 options to test, in 5 minutes, free."
  }
}

export default function FitCheck() {
  return <><Nav /><main className="section container"><div className={s.wrap}>
    <div className="kicker">Layers · Freedom-of-Work Fit Check · Free</div>
    <h1 className="case-title">You've built the experience. Let's find work that fits your home.</h1>
    <p className={s.lead}>For women carrying a big career and a young family — in tech, finance, consulting or marketing, and often far from their village: turn what you already have into 2–3 possible fractional, consulting, advisory or mentoring options, plus a small, practical way to test each one around your real life.</p>
    <div className="actions" style={{ margin: '0 0 2.5rem' }}><a className="button primary" href="#start">Show me my options →</a></div>

    <h2 className={s.h2}>Sound familiar?</h2>
    <ul className={s.list}>
      <li>You're good at what you do, and tired of a workday that wasn't built around a young family far from home.</li>
      <li>You can feel that the home can't get calmer until the work changes — but you can't leap without a solid way to test it first.</li>
      <li>You don't need another generic "follow your passion" post. You need options that build on what you've already done.</li>
    </ul>

    <h2 className={s.h2}>How it works</h2>
    <ol className={s.steps}>
      <li>Paste your experience: your LinkedIn, CV text, or a few messy paragraphs.</li>
      <li>Answer five short questions about what you want, your time and what this must protect.</li>
      <li>Get your options by email: 2–3 starting ideas, each with a small test you can run within two weeks.</li>
    </ol>

    <h2 className={s.h2}>Who's behind this</h2>
    <p className={s.about}>I'm Stefanie: Ex-Head of Product, now Fractional CPO · mom of 3, raising Pia and twins Elena and Maria far from home. I use product thinking for work that fits the family: start from what you have, test small, learn and adjust.</p>

    <p className={s.small}>No CV upload, just pasted text. Your answers are deleted after 30 days. AI helps write it; it's a starting point, not advice. <a href="/fit-check/privacy">Privacy notice</a></p>
    <FitCheckForm />
  </div></main><Footer /></>
}
