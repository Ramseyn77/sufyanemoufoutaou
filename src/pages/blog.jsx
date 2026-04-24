import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import data from '../utils/data.json'
import { GoArrowUpRight } from 'react-icons/go'

const Blog = () => {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[var(--color-light-surface)] dark:bg-[var(--color-dark)]">
        <Seo
          title={selected.titre}
          description={selected.description}
          type="article"
          keywords="blog développement, SEO, stack moderne, déploiement, IA"
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: selected.titre,
            description: selected.description,
            datePublished: selected.date,
            author: {
              '@type': 'Person',
              name: 'Sufyane MOUFOUTAOU',
            },
          }}
        />
        <Navbar />

        <div className="px-4 py-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 w-full">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-accent)] hover:underline self-start"
            >
              <span>Retour aux articles</span>
            </button>

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-[var(--color-dark-surface)] p-6 md:p-8 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.08),transparent_30%,rgba(59,130,246,0.06)_100%)]" />

              <div className="relative flex flex-col gap-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white dark:bg-white dark:text-[#0D1B2A]">
                    {selected.date}
                  </span>
                  <span className="h-px flex-1 min-w-20 bg-gradient-to-r from-slate-300 via-slate-200 to-transparent dark:from-slate-600 dark:via-slate-700 dark:to-transparent" />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-warm)] font-semibold">
                    Article
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] leading-tight max-w-3xl">
                    {selected.titre}
                  </h1>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    {selected.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-[#1B263B] p-5 sm:p-6 md:p-8 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.3)]">
              <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-7 sm:leading-8 break-words">
                {selected.contenu}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--color-light-surface)] dark:bg-[var(--color-dark)]">
      <Seo
        title="Blog"
        description="Articles sur le développement web, le SEO, le design produit, le choix de stack et l'intégration de l'IA."
        keywords="blog développeur, articles SEO, blog web, IA, déploiement, stack moderne"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog de Sufyane MOUFOUTAOU',
          description: "Articles sur le développement web, le SEO, le design produit et l'IA.",
        }}
      />
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-[var(--color-dark-surface)] px-6 py-8 md:px-8 md:py-10 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.03),transparent_35%,rgba(59,130,246,0.05)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_35%,rgba(59,130,246,0.08)_100%)]" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-warm)] font-semibold">
                  Journal
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">
                  Blog
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Reflexions sur le developpement, le design et l'IA, avec une approche pratique et orientee produit.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="h-px w-10 bg-slate-300 dark:bg-slate-600" />
                <span>{data.blogs.length} articles</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.blogs.map((article, index) => (
              <button
                key={index}
                onClick={() => setSelected(article)}
                className="group relative overflow-hidden flex min-h-[260px] flex-col rounded-[24px] border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-[var(--color-dark-surface)] p-5 text-left shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-[0_24px_50px_-35px_rgba(15,23,42,0.4)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-warm)] via-[#FDBA3B] to-[var(--color-accent)] opacity-80" />
                <span className="absolute -right-3 top-3 text-6xl font-black tracking-tight text-slate-100 dark:text-white/5 select-none">
                  0{index + 1}
                </span>

                <div className="relative flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-slate-100 dark:bg-[#0D1B2A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-200">
                      {article.date}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-warm)] font-semibold">
                      Article
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    <h2 className="text-base md:text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD] leading-snug pr-8">
                      {article.titre}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Lire l'article
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                      Ouvrir
                      <GoArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog
