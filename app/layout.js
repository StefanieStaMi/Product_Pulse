import './globals.css'

export const metadata = {
  title: 'Product Pulse — Fractional Product Leadership',
  description: 'Fractional product leadership for HRTech and digital products that need clarity, momentum and stronger execution.',
  metadataBase: new URL('https://www.productpulseconsulting.com')
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
