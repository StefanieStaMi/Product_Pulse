// Resource catalog for /resources.
// When Tidy's final titles, descriptions and PDFs arrive, edit only this file:
// one field per title/description, and one filename per language. Components read from here.

export const LANGS = ['en', 'es']

export const copy = {
  en: {
    kicker: 'Layers · Resources',
    title: 'A calm home, on purpose. Start with one page.',
    lead: 'I help women carrying a big career and a young family far from their village build a calm, values-filled home on purpose: with systems, a freedom-based career, and grace, not by doing more. These free resources are a place to begin.',
    placeholderNote: 'Titles, descriptions and PDFs for PAZ and MAPA are placeholders until the final versions arrive.',
    langLabel: 'Language',
    langEn: 'English',
    langEs: 'Español',
    fitCta: 'Start the Fit Check →',
    sheetCta: 'Get this sheet →',
    formKicker: 'Get your sheet',
    formTitle: 'Where should I send it?',
    formLead: 'Tell me your name and email, and I’ll send the file and a download link. It only takes a moment.',
    firstName: 'First name',
    email: 'Email',
    which: 'Which sheet?',
    whichLang: 'Which language?',
    consent: 'I agree that Layers may email me the resource I requested, and may store my name, email and which file I asked for, as described in the privacy notice.',
    privacy: 'privacy notice',
    newsletter: "Yes, also send me Layers' emails about redesigning work around your life. Unsubscribe anytime with one click. (Optional)",
    submit: 'Email me the sheet →',
    submitting: 'Sending…',
    successKicker: 'Your sheet is ready',
    successTitle: (name, title) => `${name}, ${title} is on its way.`,
    successLead: 'Check your inbox in about a minute. If it hides, look in Promotions or Spam and drag it out. You can also download it here, now.',
    download: 'Download the sheet now →',
    instagram: 'If you’d like to stay close, I’m @stefanie.stami on Instagram.',
    another: 'Get another sheet',
    credential: 'Stefanie · Ex-Head of Product, now Fractional CPO · mom of 3'
  },
  es: {
    kicker: 'Layers · Recursos',
    title: '[Placeholder ES] Un hogar en calma, a propósito. Empieza con una página.',
    lead: '[Placeholder ES] Acompaño a mujeres que llevan una carrera grande y una familia chica, lejos de su gente, a construir un hogar en calma y con valores, a propósito: con sistemas, un trabajo con libertad, y gracia, no haciendo más. Estos recursos gratis son un buen lugar para empezar.',
    placeholderNote: '[Placeholder ES] Los títulos, descripciones y PDFs de PAZ y MAPA son provisionales hasta que lleguen las versiones finales.',
    langLabel: 'Idioma',
    langEn: 'English',
    langEs: 'Español',
    fitCta: 'Empezar el Fit Check →',
    sheetCta: 'Quiero esta hoja →',
    formKicker: 'Recibe tu hoja',
    formTitle: '¿A dónde te la envío?',
    formLead: 'Déjame tu nombre y correo, y te envío el archivo y un enlace para descargarlo. Toma solo un momento.',
    firstName: 'Nombre',
    email: 'Correo',
    which: '¿Cuál hoja?',
    whichLang: '¿En qué idioma?',
    consent: 'Acepto que Layers me envíe por correo el recurso que pedí, y que guarde mi nombre, correo y qué archivo pedí, como se describe en el aviso de privacidad.',
    privacy: 'aviso de privacidad',
    newsletter: 'Sí, también quiero los correos de Layers sobre rediseñar el trabajo alrededor de mi vida. Puedo darme de baja cuando quiera, con un clic. (Opcional)',
    submit: 'Envíame la hoja →',
    submitting: 'Enviando…',
    successKicker: 'Tu hoja está lista',
    successTitle: (name, title) => `${name}, ${title} va en camino.`,
    successLead: 'Revisa tu correo en un minuto. Si no está, mira en Promociones o Spam y sácalo de ahí. También puedes descargarla aquí, ahora.',
    download: 'Descargar la hoja ahora →',
    instagram: 'Si quieres seguir cerca, estoy en Instagram como @stefanie.stami.',
    another: 'Pedir otra hoja',
    credential: 'Stefanie · Ex-Head of Product, ahora Fractional CPO · mamá de 3'
  }
}

// Ungated. The Fit Check lives at /fit-check and is not email-gated.
export const fitCheck = {
  id: 'fit-check',
  href: '/fit-check',
  gated: false,
  badge: 'Free',
  title: {
    en: 'Freedom-of-Work Fit Check',
    es: 'Freedom-of-Work Fit Check'
  },
  description: {
    en: 'Turn the career you already have into 2–3 possible options for work that fits your home, plus a small way to test each one. Five minutes, free.',
    es: '[Placeholder ES] Convierte la experiencia que ya tienes en 2–3 opciones de trabajo que encaje con tu hogar, y una forma pequeña de probar cada una. Cinco minutos, gratis.'
  }
}

// Gated downloads. Swap title/description/file per language when Tidy’s finals arrive.
export const sheets = {
  paz: {
    id: 'paz',
    badge: 'Free',
    // PLACEHOLDER — replace with Tidy’s final EN/ES title
    title: {
      en: '[Placeholder] PAZ — Peace by design',
      es: '[Placeholder ES] PAZ — Paz a propósito'
    },
    // PLACEHOLDER — replace with Tidy’s final one-line EN/ES description
    description: {
      en: '[Placeholder] A one-page sheet to design a calmer week: destination, bridge, execution, buffers and slots.',
      es: '[Placeholder ES] Una hoja de una página para diseñar una semana más en calma: destino, puente, ejecución, márgenes y espacios.'
    },
    menuTitle: 'PAZ — Peace by design',
    menuDescription: '[Placeholder] A one-page sheet to design a calmer week (EN + ES)',
    files: {
      en: 'paz-en-placeholder.pdf',
      es: 'paz-es-placeholder.pdf'
    },
    downloadName: {
      en: 'PAZ-Peace-by-design-EN-placeholder.pdf',
      es: 'PAZ-Paz-a-proposito-ES-placeholder.pdf'
    }
  },
  mapa: {
    id: 'mapa',
    badge: 'Free',
    // PLACEHOLDER — replace with Tidy’s final EN/ES title
    title: {
      en: '[Placeholder] MAPA — Family temperament map',
      es: '[Placeholder ES] MAPA — Mapa de temperamentos de la familia'
    },
    // PLACEHOLDER — replace with Tidy’s final one-line EN/ES description
    description: {
      en: '[Placeholder] A one-page map of each child’s temperament, so you can raise them on purpose.',
      es: '[Placeholder ES] Un mapa de una página con el temperamento de cada hija o hijo, para criarlos a propósito.'
    },
    menuTitle: 'MAPA — Family temperament map',
    menuDescription: '[Placeholder] A one-page map of each child’s temperament (EN + ES)',
    downloadName: {
      en: 'MAPA-Family-temperament-map-EN-placeholder.pdf',
      es: 'MAPA-Mapa-de-temperamentos-ES-placeholder.pdf'
    },
    files: {
      en: 'mapa-en-placeholder.pdf',
      es: 'mapa-es-placeholder.pdf'
    }
  }
}

export const sheetList = Object.values(sheets)

export function isSheet(id) {
  return Boolean(sheets[id])
}

export function isLang(lang) {
  return LANGS.includes(lang)
}
