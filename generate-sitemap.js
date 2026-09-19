/**
 * Génération du sitemap.
 * Lancé après le build : `npm run build && npm run build:sitemap`
 * Les articles de blog et les projets sont lus directement depuis les sources,
 * il n'y a donc pas de liste à tenir à jour à la main.
 */
import { writeFileSync, readdirSync, readFileSync, existsSync } from 'fs'

const BASE_URL = 'https://chrislain-portfolio.vercel.app'
const today = new Date().toISOString().split('T')[0]

/** Pages fixes, avec leur priorité. */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/works', priority: '0.9', changefreq: 'monthly' },
  { path: '/resume', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
]

/** Articles de blog : un fichier .md = une URL. */
function getBlogRoutes() {
  const dir = './src/content/blog'
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(`${dir}/${file}`, 'utf-8')
      const dateMatch = /^date:\s*(.+)$/m.exec(raw)
      return {
        path: `/blog/${file.replace(/\.md$/, '')}`,
        priority: '0.7',
        changefreq: 'yearly',
        lastmod: dateMatch ? dateMatch[1].trim() : today,
      }
    })
}

/** Pages de détail des réalisations. */
function getProjectRoutes() {
  const file = './src/data/projects.js'
  if (!existsSync(file)) return []

  const raw = readFileSync(file, 'utf-8')
  const slugs = [...raw.matchAll(/slug: '([^']+)'/g)].map((match) => match[1])

  return [...new Set(slugs)].map((slug) => ({
    path: `/work/${slug}`,
    priority: '0.6',
    changefreq: 'yearly',
  }))
}

function generateSitemap() {
  const routes = [...staticRoutes, ...getBlogRoutes(), ...getProjectRoutes()]

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  writeFileSync('./dist/sitemap.xml', sitemap)
  writeFileSync(
    './dist/robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`,
  )

  console.log(`Sitemap généré : ${routes.length} URLs.`)
}

generateSitemap()
