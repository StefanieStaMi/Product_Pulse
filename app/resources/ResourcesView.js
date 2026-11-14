'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { copy, fitCheck, isLang, isSheet, sheetList, sheets } from '../../lib/resources-config'
import s from './resources.module.css'

function syncUrl(resource, lang) {
  if (typeof window === 'undefined') return
  const path = resource ? `/resources/${resource}` : '/resources'
  const url = lang && lang !== 'en' ? `${path}?lang=${lang}` : path
  window.history.replaceState(null, '', url)
}

export default function ResourcesView({ initialResource = '', initialLang = 'en' }) {
  const [lang, setLang] = useState(isLang(initialLang) ? initialLang : 'en')
  const [resource, setResource] = useState(isSheet(initialResource) ? initialResource : 'paz')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)
  const t = copy[lang] || copy.en
  const other = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    if (isSheet(initialResource)) {
      document.getElementById('get-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [initialResource])

  function chooseLang(next) {
    setLang(next)
    syncUrl(isSheet(initialResource) ? initialResource : '', next)
  }

  function chooseSheet(id) {
    setResource(id)
    setDone(null)
    syncUrl(id, lang)
    document.getElementById('get-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const data = {
      first_name: String(fd.get('first_name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      resource: fd.get('resource'),
      lang: fd.get('lang'),
      consent: fd.get('consent') === 'on',
      newsletter: fd.get('newsletter') === 'on',
      company_website: fd.get('company_website')
    }
    if (!data.consent) { setError(lang === 'es' ? 'Necesito tu consentimiento para enviarte la hoja.' : 'Consent is required to send you the sheet.'); return }
    setBusy(true)
    try {
      const res = await fetch('/api/resources', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok && !json.downloadUrl) { setError(json.error || (lang === 'es' ? 'Algo salió mal. Inténtalo de nuevo en un minuto.' : 'Something went wrong. Please try again in a minute.')); return }
      setDone({
        name: data.first_name,
        title: json.title || sheets[data.resource]?.title[data.lang],
        downloadUrl: json.downloadUrl,
        warning: json.error || ''
      })
      window.setTimeout(() => document.getElementById('get-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } catch {
      setError(lang === 'es' ? 'Algo salió mal. Inténtalo de nuevo en un minuto.' : 'Something went wrong. Please try again in a minute.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="section container"><div className={s.wrap}>
    <div className="kicker">{t.kicker}</div>
    <h1 className="case-title">{t.title}</h1>
    <p className={s.lead}>{t.lead}</p>
    <p className={s.cred}>{t.credential}</p>
    {t.placeholderNote ? <p className={s.note}>{t.placeholderNote}</p> : null}

    <div className={s.lang} role="group" aria-label={t.langLabel}>
      <span>{t.langLabel}</span>
      <button type="button" aria-pressed={lang === 'en'} onClick={() => chooseLang('en')}>{t.langEn}</button>
      <button type="button" aria-pressed={lang === 'es'} onClick={() => chooseLang('es')}>{t.langEs}</button>
    </div>

    <div className={s.grid}>
      <article className={`${s.card} ${s.featured}`}>
        <span className={s.badge}>{fitCheck.badge}</span>
        <h2>{fitCheck.title[lang]}{fitCheck.title[other] !== fitCheck.title[lang] && <span className={s.other}>{fitCheck.title[other]}</span>}</h2>
        <p>{fitCheck.description[lang]}</p>
        <Link className={`button primary ${s.cta}`} href={fitCheck.href}>{t.fitCta}</Link>
      </article>
      <div className={s.pair}>
        {sheetList.map(sheet => (
          <article className={`${s.card} ${s[sheet.id]}`} key={sheet.id} id={sheet.id}>
            {sheet.thumbs?.[lang] && <img className={s.thumb} src={sheet.thumbs[lang]} alt={sheet.title[lang]} />}
            <span className={s.badge}>{sheet.badge}</span>
            <h2>{sheet.title[lang]}<span className={s.other}>{sheet.title[other]}</span></h2>
            <p>{sheet.description[lang]}</p>
            <button type="button" className={`button light ${s.cta}`} onClick={() => chooseSheet(sheet.id)}>{t.sheetCta}</button>
          </article>
        ))}
      </div>
    </div>

    <div id="get-sheet">
      {done ? (
        <div className={s.success}>
          <div className="kicker">{t.successKicker}</div>
          <h2>{t.successTitle(done.name, done.title)}</h2>
          <p>{t.successLead}</p>
          {done.warning && <p className={s.error} role="alert">{done.warning}</p>}
          <div className={s.actions}>
            {done.downloadUrl && <a className="button primary" href={done.downloadUrl}>{t.download}</a>}
            <a className="button light" href="https://www.instagram.com/stefanie.stami/" target="_blank" rel="noreferrer">@stefanie.stami</a>
            <button type="button" className="button light" onClick={() => { setDone(null); setError('') }}>{t.another}</button>
          </div>
          <p style={{ marginTop: '1.2rem' }}>{t.instagram}</p>
        </div>
      ) : (
        <form className={s.form} onSubmit={onSubmit}>
          <div className="kicker">{t.formKicker}</div>
          <h2>{t.formTitle}</h2>
          <p className={s.lead} style={{ margin: '0 0 .4rem' }}>{t.formLead}</p>

          <div className={s.row}>
            <label className={s.q}><span>{t.firstName}</span>
              <input name="first_name" required maxLength={60} autoComplete="given-name" /></label>
            <label className={s.q}><span>{t.email}</span>
              <input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
          </div>

          <fieldset className={s.q}><legend>{t.which}</legend>
            <div className={s.chips}>
              {sheetList.map(sheet => (
                <label key={sheet.id}>
                  <input type="radio" name="resource" value={sheet.id} checked={resource === sheet.id} onChange={() => { setResource(sheet.id); syncUrl(sheet.id, lang) }} />
                  {sheet.title[lang]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={s.q}><legend>{t.whichLang}</legend>
            <div className={s.chips}>
              <label><input type="radio" name="lang" value="en" checked={lang === 'en'} onChange={() => chooseLang('en')} />{t.langEn}</label>
              <label><input type="radio" name="lang" value="es" checked={lang === 'es'} onChange={() => chooseLang('es')} />{t.langEs}</label>
            </div>
          </fieldset>

          <label className={s.hp} aria-hidden="true">Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" /></label>

          <label className={s.check}><input type="checkbox" name="consent" required />
            <span>{t.consent} <a href="/fit-check/privacy" target="_blank">{t.privacy}</a>.</span></label>
          <label className={s.check}><input type="checkbox" name="newsletter" />
            <span>{t.newsletter}</span></label>

          {error && <p className={s.error} role="alert">{error}</p>}
          <button className="button primary" type="submit" disabled={busy}>{busy ? t.submitting : t.submit}</button>
        </form>
      )}
    </div>
  </div></main>
}
