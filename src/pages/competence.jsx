import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import data from '../utils/data.json'
import { LucideLaptop, Server, Cpu, Award } from 'lucide-react'

import jsImg from '../assets/img/JavaScript-logo.png'
import reactImg from '../assets/react.svg'
import vueImg from '../assets/img/vue-js-logo-png_seeklogo-274070.png'
import angularImg from '../assets/img/angular.jpeg'
import adonisImg from '../assets/img/adonis.png'
import tsImg from '../assets/img/ts.png'
import nextImg from '../assets/img/next.png'
import phpImg from '../assets/img/Php_logo.svg.png'
import laravelImg from '../assets/img/laravel-framework-logo-png_seeklogo-311758.png'
import nodeImg from '../assets/img/Node.js_logo.svg.png'
import dartImg from '../assets/img/Dart-logo-icon.svg.png'
import mysqlImg from '../assets/img/MySQL_textlogo.svg.png'
import pythonImg from '../assets/img/Python_logo_and_wordmark.svg.png'
import tensorflowImg from '../assets/img/TensorFlow_logo.svg.png'
import sklearnImg from '../assets/img/Scikit_learn_logo_small.svg.png'
import figmaImg from '../assets/img/Figma-logo.svg.png'
import canvaImg from '../assets/img/Canva_Logo.svg.png'
import postmanImg from '../assets/img/Postman_(software).png'
import insomniaImg from '../assets/img/insomnia.jpeg'
import reactNativeImg from '../assets/img/react-native-logo.png'

const imageMap = {
  js: jsImg, react: reactImg, vue: vueImg, angular: angularImg,
  adonis: adonisImg, ts: tsImg, next: nextImg, php: phpImg,
  laravel: laravelImg, node: nodeImg, dart: dartImg, mysql: mysqlImg,
  python: pythonImg, tensorflow: tensorflowImg, sklearn: sklearnImg,
  figma: figmaImg, canva: canvaImg, postman: postmanImg,
  insomnia: insomniaImg, reactnative: reactNativeImg,
}

const iconMap = {
  laptop: <LucideLaptop className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
}

const catStyle = {
  blue: { color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent-soft)]', border: 'border-[rgba(66,133,244,0.3)]', bar: 'from-[#2F6FD1] to-[var(--color-accent)]' },
  green: { color: 'text-[var(--color-success)]', bg: 'bg-[var(--color-success-soft)]', border: 'border-[rgba(34,197,94,0.3)]', bar: 'from-[#16A34A] to-[var(--color-success)]' },
  purple: { color: 'text-[var(--color-warm)]', bg: 'bg-[var(--color-warm-soft)]', border: 'border-[rgba(249,158,11,0.3)]', bar: 'from-[#EA9309] to-[var(--color-warm)]' },
}

const levelLabel = (n, levels) => (
  n >= 85 ? levels.expert : n >= 70 ? levels.advanced : n >= 55 ? levels.intermediate : levels.beginner
)
const levelColor = (n) => n >= 85 ? 'text-[var(--color-success)]' : n >= 70 ? 'text-[var(--color-accent)]' : n >= 55 ? 'text-[var(--color-warm)]' : 'text-gray-400'

const Competence = () => {
  const [active, setActive] = useState(0)
  const { competencePage, skills, certifs } = data
  const current = skills[active]
  const style = catStyle[current.couleur]

  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[var(--color-dark)]">
      <Seo
        title="Compétences"
        description="Compétences techniques de Sufyane MOUFOUTAOU en front-end, back-end, outils de design et technologies IA."
        keywords="compétences développeur, React, Node.js, Laravel, Python, TensorFlow, UX UI"
      />
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{competencePage.titre}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{competencePage.sousTitre}</p>
        </div>

        <div className="flex flex-row gap-3 flex-wrap">
          {skills.map((cat, i) => {
            const s = catStyle[cat.couleur]
            const isActive = active === i

            return (
              <button
                key={cat.categorie}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition ${
                  isActive
                    ? `${s.bg} ${s.color} ${s.border} border`
                    : 'bg-[#f3f4f6] dark:bg-[var(--color-dark-surface)] text-gray-500 dark:text-slate-300 border-transparent hover:border-gray-300 dark:hover:border-[var(--color-dark-border)]'
                }`}
              >
                {iconMap[cat.icone]}
                {cat.categorie}
              </button>
            )
          })}
        </div>

        <div className={`rounded-2xl border p-6 ${style.bg} ${style.border}`}>
          <div className={`flex items-center gap-2 mb-5 font-bold ${style.color}`}>
            {iconMap[current.icone]}
            <span className="text-lg">{current.categorie}</span>
            <span className="ml-auto text-xs opacity-60 font-normal">
              {current.techs.length} {competencePage.technologiesLabel}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {current.techs.map((tech) => (
              <div key={tech.nom} className="flex flex-col gap-2 bg-white dark:bg-[var(--color-dark)] rounded-xl p-3 hover:scale-[1.03] transition">
                <div className="flex flex-row items-center gap-3">
                  <img src={imageMap[tech.img]} alt={tech.nom} className="w-8 h-8 object-contain rounded-md flex-shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] truncate">{tech.nom}</span>
                      <span className={`text-[10px] font-semibold ml-2 flex-shrink-0 ${levelColor(tech.niveau)}`}>
                        {levelLabel(tech.niveau, competencePage.levels)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-[var(--color-dark-surface)] rounded-full h-1.5 mt-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${style.bar} transition-all duration-700`}
                        style={{ width: `${tech.niveau}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((cat, i) => {
            const s = catStyle[cat.couleur]

            return (
              <button
                key={cat.categorie}
                onClick={() => setActive(i)}
                className={`flex flex-col gap-4 rounded-2xl border p-5 text-left transition hover:scale-[1.01] ${s.bg} ${s.border}`}
              >
                <div className={`flex items-center gap-2 font-bold ${s.color}`}>
                  {iconMap[cat.icone]}
                  <span>{cat.categorie}</span>
                  <span className="ml-auto text-xs opacity-60 font-normal">{cat.techs.length} {competencePage.techsLabel}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <div key={tech.nom} className="flex items-center gap-1 bg-white/60 dark:bg-black/20 rounded-lg px-2 py-1">
                      <img src={imageMap[tech.img]} alt={tech.nom} className="w-4 h-4 object-contain" />
                      <span className="text-[11px] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-medium">{tech.nom}</span>
                    </div>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--color-warm)]" />
            <h2 className="text-lg font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{competencePage.certificationsTitre}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifs.map((certif, i) => (
              <div key={i} className="flex flex-col gap-2 bg-[#f3f4f6] dark:bg-[var(--color-dark-surface)] rounded-2xl p-4 border border-[rgba(249,158,11,0.2)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-warm)] uppercase tracking-wide">{certif.organisation}</span>
                  <span className="text-xs text-gray-400">{certif.date}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] leading-snug">{certif.titre}</h3>
                {certif.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{certif.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Competence
