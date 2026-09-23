import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.productpulseconsulting.com'),
  title: {
    default: 'Fractional Product Leader for HRTech Startups | Product Pulse',
    template: '%s | Product Pulse'
  },
  description: 'Fractional product leadership and product operations for early-stage HRTech startups. Stefanie Stanislawski helps CEOs clarify product strategy, improve execution and build products that scale.',
  alternates: { canonical: 'https://www.productpulseconsulting.com/' },
  icons: { icon: '/icon.svg', shortcut: '/icon.svg' },
  openGraph: {
    title: 'Fractional Product Leader for HRTech Startups | Product Pulse',
    description: 'Senior product leadership for HRTech founders who need clarity, momentum and stronger execution — without another full-time executive.',
    url: 'https://www.productpulseconsulting.com/',
    siteName: 'Product Pulse',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Product Pulse — Fractional Product Leadership for HRTech Startups' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Product Leader for HRTech Startups | Product Pulse',
    description: 'Fractional product leadership and product operations for early-stage HRTech startups.',
    images: ['/opengraph-image']
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.productpulseconsulting.com/#organization',
      name: 'Product Pulse',
      url: 'https://www.productpulseconsulting.com/',
      description: 'Fractional product leadership and product operations for early-stage HRTech startups.',
      founder: { '@id': 'https://www.productpulseconsulting.com/#stefanie' },
      sameAs: ['https://www.linkedin.com/in/stefaniestanislawski/']
    },
    {
      '@type': 'Person',
      '@id': 'https://www.productpulseconsulting.com/#stefanie',
      name: 'Stefanie Stanislawski',
      jobTitle: 'Fractional Product Leader',
      url: 'https://www.productpulseconsulting.com/about',
      image: 'https://www.productpulseconsulting.com/Stef_Profile.jpeg',
      worksFor: { '@id': 'https://www.productpulseconsulting.com/#organization' },
      sameAs: ['https://www.linkedin.com/in/stefaniestanislawski/'],
      knowsAbout: ['HRTech', 'Product Strategy', 'Product Leadership', 'Product Operations', 'Product-Market Fit', 'UX Strategy', 'Startup Product Management']
    }
  ]
}

export default function RootLayout({ children }) {
  return <html lang="en">
    <body>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </body>
  </html>
}
