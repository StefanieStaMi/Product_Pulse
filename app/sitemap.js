export default function sitemap() {
  const base = 'https://www.productpulseconsulting.com'
  const pages = ['', 'about', 'contact', 'cubic-art', 'oneclimate', 'potentialu', 'leapsome']
  return pages.map((path) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: new Date()
  }))
}
