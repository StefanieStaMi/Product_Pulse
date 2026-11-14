// FINAL Layers welcome sequence copy (weekly cadence). Do not invent quotes or results.
import { BOOKING_URL } from './booking.js'

export const INSTAGRAM_URL = 'https://www.instagram.com/stefanie.stami/'
export const FIT_CHECK_URL = 'https://www.productpulseconsulting.com/fit-check'
export const SESSION_URL = BOOKING_URL || 'https://calendar.app.google/USwTKLXvEbDJL2Xt6'
export const SESSION_STEPS = new Set([3, 5, 7])

export const RESOURCE_NAMES = {
  paz: 'PAZ — Peace by design',
  mapa: 'MAPA — Family temperament map'
}

const ADDRESS = 'Schwalbenweg 10, 65719 Hofheim am Taunus, Germany'
const FROM_REASON = {
  fitcheck: 'did the Freedom-of-Work Fit Check',
  paz: 'downloaded a PAZ sheet',
  mapa: 'downloaded a MAPA sheet'
}

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export function displayName(firstName) {
  const n = String(firstName || '').trim()
  return n || 'there'
}

export function resourceName(source) {
  return RESOURCE_NAMES[source] || 'your sheet'
}

function reason(source) {
  return FROM_REASON[source] || 'asked for a Layers resource'
}

export function footerText({ source, unsubscribeUrl }) {
  return `You're getting this because you asked for Layers emails when you ${reason(source)}. Not for you right now? Unsubscribe in one click: ${unsubscribeUrl}\nNo hard feelings.\n\nLayers · Stefanie Stanislawski\n${ADDRESS}`
}

function footerHtml({ source, unsubscribeUrl }) {
  return `<p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:#888;margin:28px 0 0">You're getting this because you asked for Layers emails when you ${esc(reason(source))}. Not for you right now? <a href="${esc(unsubscribeUrl)}" style="color:#888">Unsubscribe in one click</a>. No hard feelings.</p>
<p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:#888;margin:12px 0 0">Layers · Stefanie Stanislawski<br>${esc(ADDRESS)}</p>`
}

function linkHtml(href, label) {
  return `<p style="margin:20px 0 12px"><strong>→ <a href="${esc(href)}" style="color:#1f3b34">${esc(label)}</a></strong></p>`
}

function wrapHtml({ preview, body, source, unsubscribeUrl }) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Layers</title></head><body style="margin:0;background:#f6f4f1">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preview)}&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;</div>
<div style="max-width:600px;margin:0 auto;padding:32px 20px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:#333">
<div style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:12px">Layers</div>
<div style="background:#fff;border-radius:12px;padding:28px 24px">${body}</div>
${footerHtml({ source, unsubscribeUrl })}
</div></body></html>`
}

function p(text) {
  return `<p style="margin:0 0 14px">${text}</p>`
}

function ul(items) {
  return `<ul style="margin:0 0 14px;padding-left:20px">${items.map(i => `<li style="margin:0 0 8px">${i}</li>`).join('')}</ul>`
}

function ol(items) {
  return `<ol style="margin:0 0 14px;padding-left:20px">${items.map(i => `<li style="margin:0 0 8px">${i}</li>`).join('')}</ol>`
}

const IG = 'Follow me on Instagram @stefanie.stami'
const IG_ALONG = 'Follow along @stefanie.stami'
const IG_SHORT = 'Follow @stefanie.stami'
const SESSION = 'Build my test plan with Stefanie · €150'

function email1a(name) {
  const subject = 'Read your options like a test, not a leap'
  const preview = 'A 10-minute way to choose the one worth testing first.'
  const text = `Hi ${name},

Yesterday you got 2–3 options from the Fit Check. If you're like most women I know who are carrying a big career and a young family, you read them once, felt something, and then someone needed you.

So here's how I'd read them. It takes 10 minutes.

1. Don't rank them by which sounds best. Rank them by which one you could learn the most about, fastest. The option with the smallest test usually goes first, not the "dream" one.
2. For each option, write the one sentence that would kill it. "No one pays outside help for this." "I can't do this in the hours I actually have." That's your riskiest assumption.
3. Notice your reaction. The option that made you slightly nervous in a good way is data too. Write down why.

You don't need to quit anything. You only need to know which assumption you'd test first, around the life you already have.

This is how I approached my own move out of a full-time Head of Product role: as a series of tests, not a leap. Next week I'll tell you how that actually went, including the parts I don't usually say out loud.

In the meantime, I share the real version of this (decisions, trade-offs, three daughters, one 3 pm pickup, far from home) on Instagram:

→ ${IG}
${INSTAGRAM_URL}

Stef

P.S. Hit reply and tell me which option you'd test first, just the number. I read these myself.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`Yesterday you got 2–3 options from the Fit Check. If you're like most women I know who are carrying a big career and a young family, you read them once, felt something, and then someone needed you.`),
    p(`So here's how I'd read them. It takes 10 minutes.`),
    ol([
      `<strong>Don't rank them by which sounds best.</strong> Rank them by which one you could learn the most about, fastest. The option with the smallest test usually goes first, not the “dream” one.`,
      `<strong>For each option, write the one sentence that would kill it.</strong> “No one pays outside help for this.” “I can't do this in the hours I actually have.” That's your riskiest assumption.`,
      `<strong>Notice your reaction.</strong> The option that made you slightly nervous in a good way is data too. Write down why.`
    ]),
    p(`You don't need to quit anything. You only need to know which assumption you'd test first, around the life you already have.`),
    p(`This is how I approached my own move out of a full-time Head of Product role: as a series of tests, not a leap. Next week I'll tell you how that actually went, including the parts I don't usually say out loud.`),
    p(`In the meantime, I share the real version of this (decisions, trade-offs, three daughters, one 3 pm pickup, far from home) on Instagram:`),
    linkHtml(INSTAGRAM_URL, IG),
    p(`Stef`),
    p(`P.S. Hit reply and tell me which option you'd test first, just the number. I read these myself.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email1resource(name, source, variant) {
  const subject = "One page is a start. Here's how to use it this week."
  const preview = 'A small way to use the sheet you just downloaded.'
  const res = resourceName(source)
  const use = variant === 'mapa'
    ? "Use it once this week, on a real day: sit with one child's temperament, and try one small thing that fits them."
    : 'Use it once this week, on a real day: pick one slot, one boundary, or one buffer, and try it.'
  const text = `Hi ${name},

You downloaded ${res}. That's already more than most weeks allow.

You don't need to overhaul the house tonight. ${use} Then notice what got calmer, and what still isn't.

A lot of the time, the home can't get much calmer until the work changes too. That's not a reason to leap. It's a reason to test. If you want a next free step on that side, the Freedom-of-Work Fit Check turns the career you already have into 2–3 options you can try around your real life. No need to do it today.
${FIT_CHECK_URL}

Next week I'll tell you how I redesigned my own work so I could be home at 3 pm with Pia, Elena and Maria — including the parts I don't usually say out loud.

In the meantime, I share the day-to-day of building a calm, values-filled home far from my village, on Instagram:

→ ${IG}
${INSTAGRAM_URL}

Stef

P.S. If you try one thing from the sheet this week, hit reply and tell me what it was. I read these myself.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`You downloaded ${esc(res)}. That's already more than most weeks allow.`),
    p(`You don't need to overhaul the house tonight. ${esc(use)} Then notice what got calmer, and what still isn't.`),
    p(`A lot of the time, the home can't get much calmer until the work changes too. That's not a reason to leap. It's a reason to test. If you want a next free step on that side, the <a href="${FIT_CHECK_URL}" style="color:#1f3b34">Freedom-of-Work Fit Check</a> turns the career you already have into 2–3 options you can try around your real life. No need to do it today.`),
    p(`Next week I'll tell you how I redesigned my own work so I could be home at 3 pm with Pia, Elena and Maria — including the parts I don't usually say out loud.`),
    p(`In the meantime, I share the day-to-day of building a calm, values-filled home far from my village, on Instagram:`),
    linkHtml(INSTAGRAM_URL, IG),
    p(`Stef`),
    p(`P.S. If you try one thing from the sheet this week, hit reply and tell me what it was. I read these myself.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email2(name) {
  const subject = 'A calmer home, on purpose'
  const preview = "I didn't start over. Here's what it actually looked like."
  const text = `Hi ${name},

"Something has to change."

That's the first thing I wrote down, back when I was Head of Product, running a 27-person domain on a platform with 700,000+ users, with three daughters at home, far from my village.

Here's what came next, in the words I used at the time:

- Research: "What? How? Not a lot of info."
- Mindset: "I'm scared. What happens with my 'security'? My job title?"
- Experiment: "Let me try this."
- Joy: "It worked! Can I get more?"
- Reality check: "What's the right level for me?" I'm still answering that one.

I didn't throw my career away, and I didn't start from zero. I turned the experience I already had into work that could fit our home: I've been a fractional CPO since 2024, and I advise and mentor on the side. In fractional work my income doubled in the high months.

My clients get the same Head of Product brain, in fewer hours. Pia, Elena and Maria get a mom who's there at 3 pm.

It isn't magic. Clients are real obligations, and freedom only exists if I protect the boundary. But it was possible, and that's the part I wish someone had told me earlier.

I'm sharing more of these stages, and what I'd do differently, on Instagram:

→ ${IG_ALONG}
${INSTAGRAM_URL}

Next week: how to test a change without putting your life at risk.

Stef`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`“Something has to change.”`),
    p(`That's the first thing I wrote down, back when I was Head of Product, running a 27-person domain on a platform with 700,000+ users, with three daughters at home, far from my village.`),
    p(`Here's what came next, in the words I used at the time:`),
    ul([
      `<strong>Research:</strong> “What? How? Not a lot of info.”`,
      `<strong>Mindset:</strong> “I'm scared. What happens with my ‘security’? My job title?”`,
      `<strong>Experiment:</strong> “Let me try this.”`,
      `<strong>Joy:</strong> “It worked! Can I get more?”`,
      `<strong>Reality check:</strong> “What's the right level for me?” I'm still answering that one.`
    ]),
    p(`I didn't throw my career away, and I didn't start from zero. I turned the experience I already had into work that could fit our home: I've been a fractional CPO since 2024, and I advise and mentor on the side. In fractional work my income doubled in the high months.`),
    p(`My clients get the same Head of Product brain, in fewer hours. Pia, Elena and Maria get a mom who's there at 3 pm.`),
    p(`It isn't magic. Clients are real obligations, and freedom only exists if I protect the boundary. But it was possible, and that's the part I wish someone had told me earlier.`),
    p(`I'm sharing more of these stages, and what I'd do differently, on Instagram:`),
    linkHtml(INSTAGRAM_URL, IG_ALONG),
    p(`Next week: how to test a change without putting your life at risk.`),
    p(`Stef`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email3(name) {
  const subject = "Don't leap. Test one thing."
  const preview = 'The assumption that kills an option, and how to test it cheaply.'
  const text = `Hi ${name},

Peace doesn't come from doing more. It comes from design. The same is true of a career change: you don't have to blow up your life to find out whether a new shape of work could fit.

Here's the loop I use, for products and for this: start from what you have → test small → learn → adjust.

Any option for work that fits your home (fractional work, consulting, advisory, mentoring, or a mix) rests on three assumptions:

1. Someone owns this problem and feels it now. It's not just a problem that exists. Someone is losing sleep, money or a week over it.
2. They'd trust someone outside to help. That's a question about format: ongoing ownership, a defined project, or advice now and then.
3. It fits your real week. The hours you actually have, far from a village, with school and bedtime. Not the hours you'd have in a tidier life.

Test the one most likely to kill the option first. Usually that's #1.

And learn to tell signals apart:
- Compliments are not evidence. "You'd be great at that!" costs nothing to say.
- Evidence sounds like someone describing the problem in detail without being prompted, naming who decides, or asking "when could you start?"

A strength isn't an offer yet. The test is what turns it into one.

If you'd like a second brain on which assumption to test first, and how to fit it around your real week, that's exactly what my one-hour working session is for:

→ ${SESSION}
${SESSION_URL}

Next week: the fears nobody puts on LinkedIn.

Stef

P.S. Which of the three assumptions feels shakiest? Reply with 1, 2 or 3.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`Peace doesn't come from doing more. It comes from design. The same is true of a career change: you don't have to blow up your life to find out whether a new shape of work could fit.`),
    p(`Here's the loop I use, for products and for this: <strong>start from what you have → test small → learn → adjust.</strong>`),
    p(`Any option for work that fits your home (fractional work, consulting, advisory, mentoring, or a mix) rests on three assumptions:`),
    ol([
      `<strong>Someone owns this problem and feels it now.</strong> It's not just a problem that exists. Someone is losing sleep, money or a week over it.`,
      `<strong>They'd trust someone outside to help.</strong> That's a question about format: ongoing ownership, a defined project, or advice now and then.`,
      `<strong>It fits your real week.</strong> The hours you actually have, far from a village, with school and bedtime. Not the hours you'd have in a tidier life.`
    ]),
    p(`Test the one most likely to kill the option first. Usually that's #1.`),
    p(`And learn to tell signals apart:`),
    ul([
      `<strong>Compliments are not evidence.</strong> “You'd be great at that!” costs nothing to say.`,
      `<strong>Evidence sounds like</strong> someone describing the problem in detail without being prompted, naming who decides, or asking “when could you start?”`
    ]),
    p(`A strength isn't an offer yet. The test is what turns it into one.`),
    p(`If you'd like a second brain on which assumption to test first, and how to fit it around your real week, that's exactly what my one-hour working session is for:`),
    linkHtml(SESSION_URL, SESSION),
    p(`Next week: the fears nobody puts on LinkedIn.`),
    p(`Stef`),
    p(`P.S. Which of the three assumptions feels shakiest? Reply with 1, 2 or 3.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email4(name) {
  const subject = 'The fear under “I need a Plan B”'
  const preview = "Fear is information. Here's how to use it."
  const leadDev = 'https://leaddev.com/leadership/setting-your-team-success-while-parental-leave'
  const text = `Hi ${name},

When I was deciding, my fear had a script: "What happens with my 'security'? My job title?"

That was the polite version. Underneath it was a quieter question: who am I if I'm not the person everyone needs? And another, just as real: if I change the work, do I throw away what I spent years building?

Women carrying a big career and a young family, often far from home, tell versions of this in public. A senior staff engineer, preparing for leave, wrote: "what if they realize they're just fine without me?" (Maude Lemaire, LeadDev: ${leadDev}).

Here's what I wish I'd known: each fear points to a different test.

- "The money." Test the buyer before you test your nerve. One real conversation about a real problem tells you more than a month of spreadsheets.
- "My title / did I waste my career." Write one sentence: "I help [who] with [what] when [situation]." Say it out loud to one person you respect. Then notice whether you shrank.
- "My family, far from our village." Decide what's protected before you test, not after. Pickup time, weekends, language at home, whatever yours is.
- "I'll be too tired to do any of this well." Make the first test smaller than a good Tuesday, not the size of a new life.

You don't have to stop being scared to start. You just need the test to be smaller than the fear.

I talk about the messy middle of this on Instagram:

→ ${IG_SHORT}
${INSTAGRAM_URL}

Next week: what I refuse to trade for any of this.

Stef

P.S. What's your fear, in one sentence? Reply. I won't share it.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`When I was deciding, my fear had a script: “What happens with my ‘security’? My job title?”`),
    p(`That was the polite version. Underneath it was a quieter question: who am I if I'm not the person everyone needs? And another, just as real: if I change the work, do I throw away what I spent years building?`),
    p(`Women carrying a big career and a young family, often far from home, tell versions of this in public. A senior staff engineer, preparing for leave, wrote: <em>“what if they realize they're just fine without me?”</em> (<a href="${leadDev}" style="color:#1f3b34">Maude Lemaire, LeadDev</a>).`),
    p(`Here's what I wish I'd known: <strong>each fear points to a different test.</strong>`),
    ul([
      `<strong>“The money.”</strong> Test the buyer before you test your nerve. One real conversation about a real problem tells you more than a month of spreadsheets.`,
      `<strong>“My title / did I waste my career.”</strong> Write one sentence: “I help [who] with [what] when [situation].” Say it out loud to one person you respect. Then notice whether you shrank.`,
      `<strong>“My family, far from our village.”</strong> Decide what's protected <em>before</em> you test, not after. Pickup time, weekends, language at home, whatever yours is.`,
      `<strong>“I'll be too tired to do any of this well.”</strong> Make the first test smaller than a good Tuesday, not the size of a new life.`
    ]),
    p(`You don't have to stop being scared to start. You just need the test to be smaller than the fear.`),
    p(`I talk about the messy middle of this on Instagram:`),
    linkHtml(INSTAGRAM_URL, IG_SHORT),
    p(`Next week: what I refuse to trade for any of this.`),
    p(`Stef`),
    p(`P.S. What's your fear, in one sentence? Reply. I won't share it.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email5(name) {
  const subject = "What I won't trade"
  const preview = "Seasons, not sacrifice. And what the session is (and isn't)."
  const text = `Hi ${name},

I'm Mexican and I live in Germany, raising Pia and twins Elena and Maria far from home. I once worked somewhere I had to ask permission to see my own family, and going home meant using all my vacation. That wasn't an option for me, and it's part of why I redesigned how I work.

Motherhood didn't remove my ambition. It gave it competition.

What I don't believe in is "having it all" at once. I believe in layers and seasons: some seasons work gets more, some seasons the girls do. The trick is choosing on purpose, instead of letting everything quietly pile up.

So any redesign has to protect what matters first. If it costs the childhood in front of you, it's not a redesign.

That's the lens I bring to the working session. In one hour, we:

- start from the career you already have (and your Fit Check options, if you have them),
- challenge the ideas honestly,
- and design a first experiment around your real week — school hours, energy, the life you actually live, not a tidier one.

It's not a promise of clients or income, and I won't do the work for you. I help people decide what to change and what to offer, so the fear gets smaller and they move.

→ ${SESSION}
${SESSION_URL}

Next week: a 45-minute test you can run this week, with the script.

Stef

P.S. Not sure the session fits your situation? Reply with one line about where you are, and I'll tell you honestly.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`I'm Mexican and I live in Germany, raising Pia and twins Elena and Maria far from home. I once worked somewhere I had to ask permission to see my own family, and going home meant using all my vacation. That wasn't an option for me, and it's part of why I redesigned how I work.`),
    p(`Motherhood didn't remove my ambition. It gave it competition.`),
    p(`What I don't believe in is “having it all” at once. I believe in <strong>layers and seasons</strong>: some seasons work gets more, some seasons the girls do. The trick is choosing on purpose, instead of letting everything quietly pile up.`),
    p(`So any redesign has to protect what matters first. If it costs the childhood in front of you, it's not a redesign.`),
    p(`That's the lens I bring to the working session. In one hour, we:`),
    ul([
      `start from the career you already have (and your Fit Check options, if you have them),`,
      `challenge the ideas honestly,`,
      `and design a first experiment around your real week — school hours, energy, the life you actually live, not a tidier one.`
    ]),
    p(`It's <strong>not</strong> a promise of clients or income, and I won't do the work for you. I help people decide what to change and what to offer, so the fear gets smaller and they move.`),
    linkHtml(SESSION_URL, SESSION),
    p(`Next week: a 45-minute test you can run this week, with the script.`),
    p(`Stef`),
    p(`P.S. Not sure the session fits your situation? Reply with one line about where you are, and I'll tell you honestly.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email6(name) {
  const subject = 'A 45-minute test (script inside)'
  const preview = 'Copy, paste, adjust. Run it this week.'
  const text = `Hi ${name},

Today is about doing one small thing, not thinking about it.

If you did the Fit Check, use your top option. If you came from a PAZ or MAPA sheet, start from the work-shaped tension you already feel: the 9 pm call, the week that has no slack, the sense that the home can't get calmer until the work changes.

Pick one person who sits where a buyer of that help would sit. Someone who'd plausibly have the problem. Not a friend who'll only cheer. Someone who'll tell you the truth.

Send this (adjust it to sound like you):

“Hi [name], quick one, and no pitch. I'm exploring whether [problem] is a real headache for [type of company] right now. Could I ask you three questions? 15 minutes in the next two weeks, whenever suits you.”

Ask these three:
1. “When did this last happen at your company, and who dealt with it?”
2. “What did it cost? Time, money, a missed deadline, a person leaving?”
3. “If someone outside had helped, what would that have looked like?”

Then score it honestly:
- 🟢 They describe it in detail, unprompted, or name a budget owner → keep going.
- 🟡 “Interesting, maybe” → try a sharper problem or a different person.
- 🔴 “That's never really an issue” → good. You just saved yourself months.

That's a real test. It takes about 45 minutes in total, and you didn't quit anything.

I share more tests like this, plus what happened when I ran my own, on Instagram:

→ ${IG_SHORT}
${INSTAGRAM_URL}

Next week, the last email in this little series.

Stef

P.S. Send it, then reply with 🟢, 🟡 or 🔴 when you hear back. I'd love to know.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`Today is about doing one small thing, not thinking about it.`),
    p(`If you did the Fit Check, use your top option. If you came from a PAZ or MAPA sheet, start from the work-shaped tension you already feel: the 9 pm call, the week that has no slack, the sense that the home can't get calmer until the work changes.`),
    p(`<strong>Pick one person who sits where a buyer of that help would sit.</strong> Someone who'd plausibly have the problem. Not a friend who'll only cheer. Someone who'll tell you the truth.`),
    p(`<strong>Send this (adjust it to sound like you):</strong>`),
    `<blockquote style="margin:0 0 14px;padding:12px 16px;border-left:3px solid #1f3b34;background:#f6f4f1;color:#333">“Hi [name], quick one, and no pitch. I'm exploring whether [problem] is a real headache for [type of company] right now. Could I ask you three questions? 15 minutes in the next two weeks, whenever suits you.”</blockquote>`,
    p(`<strong>Ask these three:</strong>`),
    ol([
      `“When did this last happen at your company, and who dealt with it?”`,
      `“What did it cost? Time, money, a missed deadline, a person leaving?”`,
      `“If someone outside had helped, what would that have looked like?”`
    ]),
    p(`<strong>Then score it honestly:</strong>`),
    ul([
      `🟢 They describe it in detail, unprompted, or name a budget owner → keep going.`,
      `🟡 “Interesting, maybe” → try a sharper problem or a different person.`,
      `🔴 “That's never really an issue” → good. You just saved yourself months.`
    ]),
    p(`That's a real test. It takes about 45 minutes in total, and you didn't quit anything.`),
    p(`I share more tests like this, plus what happened when I ran my own, on Instagram:`),
    linkHtml(INSTAGRAM_URL, IG_SHORT),
    p(`Next week, the last email in this little series.`),
    p(`Stef`),
    p(`P.S. Send it, then reply with 🟢, 🟡 or 🔴 when you hear back. I'd love to know.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

function email7(name) {
  const subject = `${name}, want to plan it together?`
  const preview = 'One hour. One experiment, fitted around your real life.'
  const text = `Hi ${name},

Over these last few weeks you've had a chance to:
- start from what you already have,
- see that a calmer shape of work is possible without starting over,
- name the assumption that could kill your idea,
- turn a fear into a test,
- and maybe send one message.

That's more progress than months of "I should really think about this."

If you'd like help with the next part, here's my offer, plainly:

A one-hour working session with me, €150. We'll start from the career you already have (bring your Fit Check results if you have them), challenge the ideas, and map a first experiment around your work and family. You'll leave with one option to test, the assumption behind it, the exact next step, and the signal that says "keep going."

It's for you if you're carrying a big career and a young family, you can't leap without a way to test first, and you want a second brain that's done this and won't give you generic advice.

It's not for you if you want a guaranteed income number, someone to do the work for you, or help negotiating your current role or finding a new full-time job.

→ ${SESSION}
${SESSION_URL}

Not now? Totally fine. From here, you'll get my Layers emails about building a calm, values-filled home on purpose, occasionally — roughly every week or so, when I have something useful to say. And Instagram is where I share the day-to-day.

Stef

P.S. If something's stopping you from booking (price, timing, "is this for me?"), reply and tell me. I'd rather know than guess.`
  const html = [
    p(`Hi ${esc(name)},`),
    p(`Over these last few weeks you've had a chance to:`),
    ul([
      `start from what you already have,`,
      `see that a calmer shape of work is possible without starting over,`,
      `name the assumption that could kill your idea,`,
      `turn a fear into a test,`,
      `and maybe send one message.`
    ]),
    p(`That's more progress than months of “I should really think about this.”`),
    p(`If you'd like help with the next part, here's my offer, plainly:`),
    p(`<strong>A one-hour working session with me, €150.</strong> We'll start from the career you already have (bring your Fit Check results if you have them), challenge the ideas, and map a first experiment around your work and family. You'll leave with one option to test, the assumption behind it, the exact next step, and the signal that says “keep going.”`),
    p(`<strong>It's for you if</strong> you're carrying a big career and a young family, you can't leap without a way to test first, and you want a second brain that's done this and won't give you generic advice.`),
    p(`<strong>It's not for you if</strong> you want a guaranteed income number, someone to do the work for you, or help negotiating your current role or finding a new full-time job.`),
    linkHtml(SESSION_URL, SESSION),
    p(`Not now? Totally fine. From here, you'll get my Layers emails about building a calm, values-filled home on purpose, occasionally — roughly every week or so, when I have something useful to say. And Instagram is where I share the day-to-day.`),
    p(`Stef`),
    p(`P.S. If something's stopping you from booking (price, timing, “is this for me?”), reply and tell me. I'd rather know than guess.`)
  ].join('\n')
  return { subject, preview, text, htmlBody: html }
}

export function templateKey(step, source) {
  if (Number(step) === 1) {
    if (source === 'paz') return '1b'
    if (source === 'mapa') return '1c'
    return '1a'
  }
  return String(step)
}

export function buildWelcomeEmail({ step, source, firstName, unsubscribeUrl }) {
  const name = displayName(firstName)
  const key = templateKey(step, source)
  let built
  if (key === '1a') built = email1a(name)
  else if (key === '1b') built = email1resource(name, source || 'paz', 'paz')
  else if (key === '1c') built = email1resource(name, source || 'mapa', 'mapa')
  else if (key === '2') built = email2(name)
  else if (key === '3') built = email3(name)
  else if (key === '4') built = email4(name)
  else if (key === '5') built = email5(name)
  else if (key === '6') built = email6(name)
  else if (key === '7') built = email7(name)
  else throw new Error(`unknown welcome email step ${step}`)

  return {
    key,
    subject: built.subject,
    preview: built.preview,
    text: `${built.text}\n\n--\n${footerText({ source, unsubscribeUrl })}`,
    html: wrapHtml({
      preview: built.preview,
      body: built.htmlBody,
      source,
      unsubscribeUrl
    })
  }
}

export const ALL_TEMPLATE_KEYS = ['1a', '1b', '1c', '2', '3', '4', '5', '6', '7']
