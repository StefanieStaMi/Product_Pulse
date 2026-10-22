'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FLEX_OPTIONS, YEARS, FUNCTIONS } from './questions'
import s from './fit-check.module.css'

export default function FitCheckForm() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [fn, setFn] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    data.flexibility = fd.getAll('flexibility')
    data.consent = fd.get('consent') === 'on'
    data.newsletter = fd.get('newsletter') === 'on'
    if (!data.consent) { setError('Please tick the consent box so we can create and email your profile.'); return }
    setBusy(true)
    try {
      const res = await fetch('/api/fit-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.error || 'Something went wrong. Please try again.')
      router.push('/fit-check/thanks')
    } catch (err) { setError(err.message); setBusy(false) }
  }

  return <form className={s.form} onSubmit={onSubmit}>
    <div className={s.hp} aria-hidden="true"><label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>

    <fieldset className={s.q}><legend>1. What's your first name, and where should we send your profile?</legend>
      <div className={s.row}>
        <input name="first_name" required maxLength={60} placeholder="First name" autoComplete="given-name" />
        <input name="email" type="email" required maxLength={200} placeholder="you@email.com" autoComplete="email" />
      </div></fieldset>

    <label className={s.q}><span>2. What do you do, in one line?</span><small>Your current (or most recent) role and the kind of company. e.g. "Head of Product at a 300-person HR SaaS."</small>
      <input name="role_line" required maxLength={200} /></label>

    <fieldset className={s.q}><legend>3. How many years have you been doing this kind of work?</legend>
      <div className={s.chips}>{YEARS.map(y => <label key={y}><input type="radio" name="years" value={y} required />{y}</label>)}</div></fieldset>

    <fieldset className={s.q}><legend>4. Which function is your home turf?</legend>
      <div className={s.chips}>{FUNCTIONS.map(f => <label key={f}><input type="radio" name="function" value={f} required onChange={() => setFn(f)} />{f}</label>)}</div>
      {fn === 'Other' && <input name="function_other" maxLength={100} placeholder="Other: ____" required />}</fieldset>

    <label className={s.q}><span>5. Paste 3–5 career highlights you're proud of.</span><small>Things you built, fixed, grew or rescued. Numbers welcome, modesty not required. (Please leave out client names or anything confidential.)</small>
      <textarea name="highlights" required minLength={40} maxLength={3000} rows={7} /></label>

    <label className={s.q}><span>6. What do people keep coming to you for?</span><small>The problem colleagues, ex-bosses or friends-of-friends call you about, even when it's not in your job description.</small>
      <textarea name="go_to_problem" required maxLength={1000} rows={3} /></label>

    <label className={s.q}><span>7. Which industries or company stages do you know from the inside?</span><small>e.g. B2B SaaS, Series A–C, healthtech, family-owned Mittelstand.</small>
      <input name="industries" required maxLength={300} /></label>

    <fieldset className={s.q}><legend>8. What does "flexible" actually need to look like for you?</legend><small>Pick all that apply.</small>
      <div className={s.chips}>{FLEX_OPTIONS.map(o => <label key={o}><input type="checkbox" name="flexibility" value={o} />{o}</label>)}</div></fieldset>

    <label className={s.q}><span>9. What's the income you'd need to feel safe making the move?</span><small>Rough monthly or yearly figure, and the currency. This stays private and only shapes the scenarios in your profile.</small>
      <input name="income_need" maxLength={100} /></label>

    <label className={s.q}><span>10. What's the thing that's actually stopping you right now?</span><small>Be honest, no one's grading this. e.g. "I don't know what I'd even sell", "I'm scared to name a price", "No idea where clients come from."</small>
      <textarea name="blocker" required maxLength={1000} rows={3} /></label>

    <label className={s.check}><input type="checkbox" name="consent" required />
      <span>I agree that Layers may use my answers to generate my Fractional Fit Check with the help of an AI provider, and email it to me. My answers are deleted automatically within 30 days. I've read the <a href="/fit-check/privacy" target="_blank">privacy notice</a>.</span></label>
    <label className={s.check}><input type="checkbox" name="newsletter" />
      <span>Yes, also send me Layers' emails about flexible, fractional work. Unsubscribe anytime with one click. (Optional)</span></label>

    {error && <p className={s.error} role="alert">{error}</p>}
    <button className="button" type="submit" disabled={busy}>{busy ? 'Writing your profile… (about 20 seconds)' : 'Send me my Fit Check →'}</button>
    <p className={s.small}>AI-assisted and based only on what you share. A starting point, not career, legal or financial advice.</p>
  </form>
}
