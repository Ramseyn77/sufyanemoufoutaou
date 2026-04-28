import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import data from '../utils/data.json'
import { GoArrowUpRight } from 'react-icons/go'
import { CheckCircle2, Globe, Brain, BarChart2, Zap } from 'lucide-react'

const { services } = data

const iconeMap = {
  Globe:     <Globe    className="w-5 h-5" />,
  Brain:     <Brain    className="w-5 h-5" />,
  BarChart2: <BarChart2 className="w-5 h-5" />,
  Zap:       <Zap      className="w-5 h-5" />,
}

const couleurMap = {
  blue:   { header: 'text-blue-500',                    bg: 'bg-blue-50 dark:bg-blue-900/20',   badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',   icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-500' },
  purple: { header: 'text-purple-500',                  bg: 'bg-purple-50 dark:bg-purple-900/20', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300', icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-500' },
  green:  { header: 'text-[var(--color-success)]',      bg: 'bg-green-50 dark:bg-green-900/20', badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',   icon: 'bg-green-100 dark:bg-green-900/40 text-[var(--color-success)]' },
  orange: { header: 'text-[var(--color-warm)]',         bg: 'bg-orange-50 dark:bg-orange-900/20', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', icon: 'bg-orange-100 dark:bg-orange-900/40 text-[var(--color-warm)]' },
}

const Service = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[var(--color-dark)]">
      <Seo
        title="Services"
        description="Services de développement web/mobile, design UX/UI et intégration IA pour accompagner vos projets digitaux."
        keywords="services web, développement mobile, UX UI, intégration IA, freelance développeur"
      />
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-8">

        {/* Hero */}
        <div className="flex flex-col items-center gap-5 bg-[var(--color-dark)] dark:bg-[var(--color-dark-surface)] rounded-2xl px-6 py-10 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white max-w-2xl leading-snug">
            {services.hero.titre}
          </h1>
          <p className="text-sm text-[var(--color-accent)] max-w-xl leading-relaxed">
            {services.hero.sousTitre}
          </p>
          <div className="flex flex-row gap-4 flex-wrap justify-center mt-2">
            <Link
              to="/portfolio"
              className="px-7 py-3 bg-[var(--color-success)] hover:bg-[#16A34A] transition text-white font-semibold rounded-xl text-sm"
            >
              <div className='text-white text-sm'>
                Voir les réalisations
              </div>
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 bg-[var(--color-warm)] hover:bg-[#EA9309] transition text-white font-semibold rounded-xl text-sm"
            >
              <div className='text-white text-sm'>
                Discuter de votre projet
              </div>
            </Link>
          </div>
        </div>

        {/* Catalogue des services */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-center">
            Mes services
          </h2>
          <div className="flex flex-col gap-8">
            {services.catalogue.map((cat, ci) => {
              const c = couleurMap[cat.couleur]
              return (
                <div key={ci} className="flex flex-col gap-4">
                  <div className={`flex items-center gap-2 ${c.header}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${c.icon}`}>
                      {iconeMap[cat.icone]}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">{cat.categorie}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.items.map((item, ii) => (
                      <div
                        key={ii}
                        className={`relative flex flex-col gap-2 rounded-2xl px-4 py-4 ${c.bg} border border-transparent hover:border-current hover:border-opacity-20 transition`}
                      >
                        {item.badge && (
                          <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                            ⭐ {item.badge}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {item.titre}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cas */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-center">
            Vous êtes dans l'un de ces cas&nbsp;??
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
            {services.cas.map((cas, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#f3f4f6] dark:bg-[var(--color-dark-surface)] rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" />
                <span className="text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{cas}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-accent)] font-medium mt-1">
            Je vous accompagne jusqu'au déploiement
          </p>
        </div>

        {/* Process */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-center">
            Mon process de travail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.process.map((step, i) => (
              <div
                key={i}
                className="relative overflow-hidden flex flex-col gap-4 bg-[#f3f4f6] dark:bg-[var(--color-dark-surface)] rounded-2xl p-5 border border-[rgba(249,158,11,0.2)]"
              >
                <span className="absolute -top-4 -right-1 text-6xl font-black text-[rgba(249,158,11,0.15)] select-none">
                  {step.numero}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-warm)] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-base font-extrabold leading-none">{step.numero}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-warm)] font-bold">
                    Etape {step.numero}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] leading-snug">
                  {step.titre}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3 bg-[var(--color-success)] hover:bg-[#16A34A] transition rounded-xl text-center"
            >
              <div className='flex items-center text-white gap-2 text-sm font-semibold '>
                Lancer mon projet <GoArrowUpRight />
              </div>
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Service
