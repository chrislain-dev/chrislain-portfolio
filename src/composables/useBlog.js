/**
 * Blog local : les articles sont de simples fichiers Markdown rangés dans
 * src/content/blog/. Pas de base de données, pas d'API — Vite les embarque
 * au build, donc le blog fonctionne aussi en production.
 *
 * Pour publier un article : créer un fichier .md dans src/content/blog/
 * avec un en-tête comme celui-ci, puis redéployer.
 *
 *   ---
 *   title: Titre de l'article
 *   description: Une ou deux phrases de résumé
 *   date: 2026-09-10
 *   tags: [Laravel, API]
 *   cover: /assets/images/mon-image.png
 *   lang: fr
 *   ---
 */
import { computed } from 'vue'
import { marked } from 'marked'

const files = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' })

/** Parse l'en-tête YAML simplifié placé en tête de fichier. */
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim())
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) continue

    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      value = value.replace(/^["']|["']$/g, '')
    }

    data[key] = value
  }

  return { data, content: match[2] }
}

/** Environ 200 mots par minute, arrondi au supérieur. */
function readingTime(content) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = data.slug || path.split('/').pop().replace(/\.md$/, '')

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      cover: data.cover || '',
      lang: data.lang || 'fr',
      readingTime: readingTime(content),
      content,
      html: marked.parse(content),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function useBlog() {
  const allPosts = computed(() => posts)

  const tags = computed(() => {
    const counts = new Map()
    posts.forEach((post) => {
      post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1))
    })
    return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  })

  const getPost = (slug) => posts.find((post) => post.slug === slug) || null

  const getRelatedPosts = (slug, limit = 3) => {
    const current = getPost(slug)
    if (!current) return []

    return posts
      .filter((post) => post.slug !== slug)
      .map((post) => ({
        post,
        score: post.tags.filter((tag) => current.tags.includes(tag)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post)
  }

  const formatDate = (value, locale = 'fr') => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return { allPosts, tags, getPost, getRelatedPosts, formatDate }
}

export default useBlog
