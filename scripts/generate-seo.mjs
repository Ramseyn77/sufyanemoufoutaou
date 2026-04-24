import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://sufyanemoufoutaou.vercel.app'

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { path: '/skills', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
]

const publicDir = path.join(process.cwd(), 'public')
const today = new Date().toISOString().slice(0, 10)

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8')

console.log('SEO files generated for', SITE_URL)
