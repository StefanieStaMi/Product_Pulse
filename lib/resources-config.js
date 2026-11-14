// Resource catalog for /resources.
// Titles, descriptions and filenames for PAZ and MAPA live here.
// Components and the nav dropdown read from this file.

export const LANGS = ['en', 'es']

export const copy = {
  en: {
    kicker: 'Layers · Resources',
    title: 'A calm home, on purpose. Start with one page.',
    lead: 'I help women carrying a big career and a young family far from their village build a calm, values-filled home on purpose: with systems, a freedom-based career, and grace, not by doing more. These free resources are a place to begin.',
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
    consent: 'I agree that Layers may email me the resource I requested, and may store my name, email and which file I asked for, as described in the',
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
    title: 'Un hogar en calma, a propósito. Empieza con una página.',
    lead: 'Acompaño a mujeres que llevan una carrera grande y una familia chica, lejos de su gente, a construir un hogar en calma y con valores, a propósito: con sistemas, un trabajo con libertad, y gracia, no haciendo más. Estos recursos gratis son un buen lugar para empezar.',
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
    consent: 'Acepto que Layers me envíe por correo el recurso que pedí, y que guarde mi nombre, correo y qué archivo pedí, como se describe en el',
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
    es: 'Convierte la experiencia que ya tienes en 2–3 opciones de trabajo que encaje con tu hogar, y una forma pequeña de probar cada una. Cinco minutos, gratis.'
  },
  menuTitle: 'Freedom-of-Work Fit Check',
  menuDescription: 'Find work that fits your home — in 5 minutes, free'
}

// Gated downloads.
export const sheets = {
  paz: {
    id: 'paz',
    badge: 'Free',
    title: {
      en: 'Peace by design: a calm week, on purpose',
      es: 'Paz por diseño: una semana tranquila, a propósito'
    },
    description: {
      en: 'A two-page Sunday-night planner to design a calm week, with room for the chaos, the 3 pm switch and a little inner work.',
      es: 'Tu hoja de dos páginas para armar el domingo una semana tranquila, con colchón para el caos, el cambio de chip de las 3 y un ratito para ti.'
    },
    menuTitle: 'PAZ — Peace by design',
    menuDescription: 'A two-page Sunday-night planner to design a calm week (EN + ES)',
    thumbs: {
      en: '/resource-thumbs/paz-en.jpg',
      es: '/resource-thumbs/paz-es.jpg'
    },
    files: {
      en: 'paz-en.pdf',
      es: 'paz-es.pdf'
    },
    downloadName: {
      en: 'PAZ-Peace-by-design-EN.pdf',
      es: 'PAZ-Paz-por-diseno-ES.pdf'
    }
  },
  mapa: {
    id: 'mapa',
    badge: 'Free',
    title: {
      en: 'Family temperament map: same rules, different doorways',
      es: 'Mapa de temperamentos en familia: mismas reglas, distintas puertas'
    },
    description: {
      en: "A two-page map for parents of more than one: keep the rule and its family value, and find each child's doorway in.",
      es: 'Un mapa de dos páginas para las que tienen más de un hijo: la regla y su valor no se mueven, lo que cambia es la puerta de cada uno.'
    },
    menuTitle: 'MAPA — Family temperament map',
    menuDescription: "A two-page map for parents of more than one: same rules, different doorways (EN + ES)",
    thumbs: {
      en: '/resource-thumbs/mapa-en.jpg',
      es: '/resource-thumbs/mapa-es.jpg'
    },
    files: {
      en: 'mapa-en.pdf',
      es: 'mapa-es.pdf'
    },
    downloadName: {
      en: 'MAPA-Family-temperament-map-EN.pdf',
      es: 'MAPA-Mapa-de-temperamentos-en-familia-ES.pdf'
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
