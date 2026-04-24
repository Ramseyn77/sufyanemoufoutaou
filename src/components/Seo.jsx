import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Sufyane MOUFOUTAOU'
const DEFAULT_TITLE = 'Développeur Full-Stack, UX/UI & IA'
const DEFAULT_DESCRIPTION = "Portfolio de Sufyane MOUFOUTAOU, développeur web/mobile, designer UX/UI et ingénieur IA. Création de sites, applications et solutions digitales modernes."
const DEFAULT_IMAGE = '/vite.svg'
const PROD_URL = 'https://sufyanemoufoutaou.vercel.app'

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const ensureLink = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const buildAbsoluteUrl = (origin, value) => {
  if (!value) return origin
  if (/^https?:\/\//i.test(value)) return value
  return `${origin}${value.startsWith('/') ? value : `/${value}`}`
}

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema,
  keywords,
}) => {
  const location = useLocation()

  useEffect(() => {
    const origin = window.location.origin || PROD_URL
    const canonicalUrl = `${origin}${location.pathname}`
    const absoluteImage = buildAbsoluteUrl(origin, image)
    const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${DEFAULT_TITLE}`

    document.documentElement.lang = 'fr'
    document.title = pageTitle

    ensureMeta('meta[name="description"]', { name: 'description', content: description })
    ensureMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' })
    ensureMeta('meta[name="author"]', { name: 'author', content: SITE_NAME })
    ensureMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#0F172A' })

    if (keywords) {
      ensureMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    }

    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'fr_FR' })
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage })

    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage })

    ensureLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })

    const previousSchema = document.head.querySelector('script[data-seo-schema="true"]')
    if (previousSchema) previousSchema.remove()

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      name: title || SITE_NAME,
      description,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: PROD_URL,
      },
    }

    const schemaScript = document.createElement('script')
    schemaScript.type = 'application/ld+json'
    schemaScript.dataset.seoSchema = 'true'
    schemaScript.textContent = JSON.stringify(schema || baseSchema)
    document.head.appendChild(schemaScript)

    return () => {
      const activeSchema = document.head.querySelector('script[data-seo-schema="true"]')
      if (activeSchema) activeSchema.remove()
    }
  }, [description, image, keywords, location.pathname, schema, title, type])

  return null
}

export default Seo
