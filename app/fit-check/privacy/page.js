import { Nav, Footer } from '../../components'
import s from '../fit-check.module.css'

export const metadata = { title: 'Privacy notice — Fractional Fit Check', alternates: { canonical: 'https://www.productpulseconsulting.com/fit-check/privacy' } }

export default function Privacy() {
  return <><Nav /><main className="section container"><div className={s.prose}>
    <div className="kicker">Layers · Fractional Fit Check</div>
    <h1 className="case-title">Privacy notice</h1>
    <h2>Who is responsible</h2>
    <p>Silvia Stefanie Stanislawski Michelena (Product Pulse Consulting / Layers), Schwalbenweg 10, 65719 Hofheim am Taunus, Germany. Email: <a href="mailto:stefanie@productpulseconsulting.com">stefanie@productpulseconsulting.com</a>. Controller under the GDPR.</p>
    <h2>What we collect</h2>
    <p>Your first name, email address, and the answers you type into the Fit Check (role, experience, highlights, preferences, income need). We don't ask for a CV. Please don't include confidential or third-party information.</p>
    <h2>Why</h2>
    <p>To generate your Fit Check profile and email it to you (Art. 6(1)(b) GDPR: providing the service you request). If you tick the newsletter box, to send you Layers emails (Art. 6(1)(a) GDPR: consent, which you can withdraw anytime via the unsubscribe link).</p>
    <h2>How long</h2>
    <p>Your answers and the generated profile are deleted from our database automatically 30 days after submission. In our email tool (Kit) we keep your name, email and the delivered profile only to send it; if you didn't opt into the newsletter you won't receive marketing emails, and you can ask us to delete you at any time. If you opted in, you stay on the list until you unsubscribe.</p>
    <h2>Who processes it for us</h2>
    <ul>
      <li><strong>Supabase</strong> (database, EU region Frankfurt): stores your answers until deletion.</li>
      <li><strong>Vercel</strong>: website hosting.</li>
      <li><strong>OpenAI</strong>: generates the text via API. API data is not used to train models; it may be processed outside the EU under Standard Contractual Clauses.</li>
      <li><strong>Kit (ConvertKit)</strong>: delivers your profile by email and, only if you ticked the box, sends the newsletter (USA, Standard Contractual Clauses).</li>
    </ul>
    <h2>Your rights</h2>
    <p>You can request access, correction, deletion, restriction, portability, object to processing, and withdraw consent. Email <a href="mailto:stefanie@productpulseconsulting.com">stefanie@productpulseconsulting.com</a> and we'll act within a few days. You can also complain to a data protection authority, e.g. the Hessian Commissioner for Data Protection (HBDI).</p>
    <h2>Automated processing</h2>
    <p>Your profile is AI-generated from your answers. It doesn't make any legal or similarly significant decision about you.</p>
    <h2>Disclaimer</h2>
    <p>The Fractional Fit Check is AI-assisted, based only on what you share, and meant as a starting point for your own thinking. It isn't career, legal, tax or financial advice. Any rate figures are general market context, not a quote or a promise of income.</p>
  </div></main><Footer /></>
}
