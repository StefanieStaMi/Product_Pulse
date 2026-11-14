'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HOURS, STAY_EMPLOYED, PROTECT, FORMATS, MAX_PROTECT, EXPERIENCE_MIN, EXPERIENCE_MAX } from './questions'
import s from './fit-check.module.css'

export default function FitCheckForm() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [exp, setExp] = useState('')
  const [protect, setProtect] = useState([])

  const toggleProtect = (v, on) => setProtect(p => on ? (p.length < MAX_PROTECT ? [...p, v] : p) : p.filter(x => x !== v))

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    data.protect = fd.getAll('protect')
    data.formats = fd.getAll('formats')
    data.consent = fd.get('consent') === 'on'
    data.newsletter = fd.get('newsletter') === 'on'
    if (exp.trim().length < EXPERIENCE_MIN) { setError(`Please paste a bit more of your experience (at least ${EXPERIENCE_MIN} characters) so your options can build on it.`); return }
    if (!data.formats.length) { setError('Please pick at least one format, or "Help me explore".'); return }
    if (!data.consent) { setError('Please tick the consent box so we can create and email your options.'); return }
    setBusy(true)
    try {
      const res = await fetch('/api/fit-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.error || 'Something went wrong. Please try again.')
      router.push('/fit-check/thanks')
    } catch (err) { setError(err.message); setBusy(false) }
  }

  const len = exp.trim().length

  return <form className={s.form} onSubmit={onSubmit} id="start">
    <div className={s.hp} aria-hidden="true"><label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>

    <fieldset className={s.q}><legend>1. What's your first name, and where should we send your options?</legend>
      <div className={s.row}>
        <input name="first_name" required maxLength={60} placeholder="First name" autoComplete="given-name" aria-label="First name" />
        <input name="email" type="email" required maxLength={200} placeholder="you@email.com" autoComplete="email" aria-label="Email" />
      </div></fieldset>

    <label className={s.q}><span>2. Paste your experience. Messy is welcome.</span><small>Your LinkedIn About and Experience sections, CV text, or a few paragraphs about your work: problems you've solved, outcomes, what people ask you for help with. Please leave out contact details and anything confidential.</small>
      <textarea name="experience" required minLength={EXPERIENCE_MIN} maxLength={EXPERIENCE_MAX} rows={12} value={exp} onChange={e => setExp(e.target.value)} />
      <small className={s.counter} aria-live="polite">{len < EXPERIENCE_MIN ? `${len} / ${EXPERIENCE_MIN} characters minimum` : `${len.toLocaleString('en')} / ${EXPERIENCE_MAX.toLocaleString('en')} characters`}</small></label>

    <label className={s.q}><span>3. What do you want more of, and what do you never want to do again?</span><small>e.g. "More: thinking clearly with a small team, and being home when school ends. Never again: 9pm calls and proving myself all day."</small>
      <textarea name="more_and_never" required maxLength={1000} rows={3} /></label>

    <fieldset className={s.q}><legend>4. What could you realistically make room for?</legend>
      <small>Hours per week you could give to testing this, alongside everything else.</small>
      <div className={s.chips}>{HOURS.map(h => <label key={h}><input type="radio" name="hours_per_week" value={h} required />{h}</label>)}</div>
      <small>Do you need to stay employed while you test?</small>
      <div className={s.chips}>{STAY_EMPLOYED.map(o => <label key={o}><input type="radio" name="stay_employed" value={o} required />{o}</label>)}</div></fieldset>

    <fieldset className={s.q}><legend>5. What must this protect?</legend>
      <small>Pick up to three.</small>
      <div className={s.chips}>{PROTECT.map(o => {
        const on = protect.includes(o)
        return <label key={o} className={!on && protect.length >= MAX_PROTECT ? s.dim : undefined}><input type="checkbox" name="protect" value={o} checked={on} disabled={!on && protect.length >= MAX_PROTECT} onChange={e => toggleProtect(o, e.target.checked)} />{o}</label>
      })}</div>
      <small>Optional, and private: the income floor you'd need before relying on this. It only tells us how cautious to be. It's never repeated back or used for rate suggestions.</small>
      <input name="income_floor" maxLength={100} placeholder="Optional" aria-label="Income floor (optional)" /></fieldset>

    <fieldset className={s.q}><legend>6. Which formats interest you?</legend>
      <small>Pick any. Not sure? Choose "Help me explore".</small>
      <div className={s.chips}>{FORMATS.map(f => <label key={f}><input type="checkbox" name="formats" value={f} />{f}</label>)}</div></fieldset>

    <label className={s.q}><span>7. What's the thing that's actually stopping you right now?</span><small>Be honest, no one's grading this. e.g. "I can't risk our income", "I don't know who would pay for this", "I'm scared I'd be starting from zero."</small>
      <textarea name="blocker" required maxLength={1000} rows={3} /></label>

    <label className={s.check}><input type="checkbox" name="consent" required />
      <span>I agree that Layers may use my answers, including the experience I paste, to generate my Freedom-of-Work Fit Check with the help of an AI provider, and email it to me. My answers are deleted automatically within 30 days. I've read the <a href="/fit-check/privacy" target="_blank">privacy notice</a>.</span></label>
    <label className={s.check}><input type="checkbox" name="newsletter" />
      <span>Yes, also send me Layers' emails about redesigning work around your life. Unsubscribe anytime with one click. (Optional)</span></label>

    {error && <p className={s.error} role="alert">{error}</p>}
    <button className="button primary" type="submit" disabled={busy}>{busy ? 'Writing your options… (about 30 seconds)' : 'Send me my options →'}</button>
    <p className={s.small}>AI-assisted and based only on what you share. A starting point, not career, legal or financial advice.</p>
  </form>
}
