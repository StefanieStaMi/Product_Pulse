/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/resources': ['./content/resources/**'],
    '/api/resources/download/[token]': ['./content/resources/**']
  }
}
export default nextConfig
