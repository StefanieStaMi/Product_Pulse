import { Nav, Footer } from '../../components'
import s from '../fit-check.module.css'

export const metadata = { title: 'Privacy notice — Fit Check and resource downloads', alternates: { canonical: 'https://www.productpulseconsulting.com/fit-check/privacy' } }

export default function Privacy() {
  return <><Nav /><main className="section container"><div className={s.prose}>
    <div className="kicker">Layers · Freedom-of-Work Fit Check</div>
    <h1 className="case-title">Privacy notice</h1>
    <p>This notice covers the Freedom-of-Work Fit Check and the free resource downloads (PAZ and MAPA) on this website.</p>
    <h2>Who is responsible</h2>
    <p>Silvia Stefanie Stanislawski Michelena (Product Pulse Consulting / Layers), Schwalbenweg 10, 65719 Hofheim am Taunus, Germany. Email: <a href="mailto:stefanie@productpulseconsulting.com">stefanie@productpulseconsulting.com</a>. Controller under the GDPR.</p>
    <h2>What we collect</h2>
    <p><strong>Fit Check.</strong> Your first name, email address, and what you enter into the Fit Check: the experience text you paste (for example from LinkedIn or your CV), what you want more and less of, the time you could make, whether you need to stay employed while testing, what the change must protect, an optional income floor, the formats you're interested in, and what's stopping you. We also store the generated options and a one-way hashed version of your IP address (to prevent abuse). We don't ask for a CV file. Please leave out contact details, confidential information and information about other people.</p>
    <p><strong>Resource downloads (PAZ and MAPA).</strong> Your first name, email address, which resource you requested, the language you chose, that you agreed to the privacy notice, and whether you also asked to receive the Layers newsletter. We also store a one-way hashed version of your IP address (to prevent abuse).</p>
    <h2>Why</h2>
    <p><strong>Fit Check.</strong> To generate your Fit Check options and email them to you (Art. 6(1)(b) GDPR: providing the service you request). <strong>Resource downloads.</strong> To email you the sheet you requested, with a download link (Art. 6(1)(b) GDPR: providing the service you request). If you tick the newsletter box on either form, to send you Layers emails (Art. 6(1)(a) GDPR: consent, which you can withdraw anytime via the unsubscribe link).</p>
    <h2>How long</h2>
    <p><strong>Fit Check.</strong> Your answers, including the pasted experience text, and the generated options are deleted from our database automatically 30 days after submission. The email with your options is sent via Resend, which keeps delivery logs for a limited time. <strong>Resource downloads.</strong> The record of your download request (name, email, which file, language, consent and newsletter choice) is deleted from our database automatically 30 days after submission. The email with your file is sent via Resend, which keeps delivery logs for a limited time. Only if you ticked the newsletter box do we add your name and email to our newsletter tool (Kit), where you stay until you unsubscribe.</p>
    <h2>Who processes it for us</h2>
    <ul>
      <li><strong>Supabase</strong> (database, EU region Frankfurt): stores your Fit Check answers and resource download requests until deletion.</li>
      <li><strong>Vercel</strong>: website hosting.</li>
      <li><strong>OpenAI</strong>: generates the Fit Check text via API. API data is not used to train models; it may be processed outside the EU under Standard Contractual Clauses. OpenAI is not used for resource downloads.</li>
      <li><strong>Resend</strong>: sends the Fit Check email and the resource download email (USA, Standard Contractual Clauses).</li>
      <li><strong>Kit (ConvertKit)</strong>: newsletter, and only if you ticked that box (USA, Standard Contractual Clauses).</li>
    </ul>
    <h2>Your rights</h2>
    <p>You can request access, correction, deletion, restriction, portability, object to processing, and withdraw consent. Email <a href="mailto:stefanie@productpulseconsulting.com">stefanie@productpulseconsulting.com</a> and we'll act within a few days. You can also complain to a data protection authority, e.g. the Hessian Commissioner for Data Protection (HBDI).</p>
    <h2>Automated processing</h2>
    <p>Your options are AI-generated from your answers. It doesn't make any legal or similarly significant decision about you.</p>
    <h2>Disclaimer</h2>
    <p>The Freedom-of-Work Fit Check is AI-assisted, based only on what you share, and meant as a starting point for your own thinking. Its options are starting ideas to test, not a promise of work or income. It isn't career, legal, tax or financial advice.</p>
  </div></main><Footer /></>
}
