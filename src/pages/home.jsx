import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaCode, FaMobileAlt, FaBrain, FaGlobe, FaPaintBrush } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'
import lydia from '../assets/img/lydia.jpg'
import alain from '../assets/img/Alain1.png'

const skills = [
  { label: 'Front-End', icon: <FaCode className="text-2xl text-orange-400" /> },
  { label: 'Back-End', icon: <FaCode className="text-2xl text-orange-400" /> },
  { label: 'IA & Design', icon: <FaBrain className="text-2xl text-orange-400" /> },
]

const services = [
  {
    icon: <FaGlobe className="text-3xl text-[var(--color-accent)]" />,
    title: 'Développement Web Full-Stack',
    description: 'Conception et développement d\'applications web performantes de bout en bout, du design à la mise en production.',
  },
  {
    icon: <FaMobileAlt className="text-3xl text-[var(--color-accent)]" />,
    title: 'Développement Mobile',
    description: 'Création d\'applications mobiles cross-platform avec React Native, adaptées à vos besoins métier.',
  },
  {
    icon: <FaPaintBrush className="text-3xl text-[var(--color-accent)]" />,
    title: 'Design UX/UI',
    description: 'Conception d\'interfaces élégantes et accessibles centrées sur l\'expérience utilisateur avec Figma.',
  },
]

const recentProjects = [
  {
    nom: 'Lydia',
    description: 'Plateforme de gestion des établissements scolaires.',
    image: lydia,
    logo: lydia,
    url: 'https://www.lydia-edu.com',
  },
  {
    nom: 'Alain Portfolio',
    description: 'Développement frontend pour un portfolio d\'agent de santé.',
    image: alain,
    logo: alain,
    url: 'https://alain-assobga.vercel.app/',
  },
]

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[var(--color-dark)]">
      <Navbar />

      {/* Hero */}
      <div className="flex flex-col items-start w-full px-4 py-6 gap-4 md:flex-row md:items-center md:justify-between">
        <div className="italic font-mono font-bold text-[#0D1B2A] dark:text-white text-2xl sm:text-3xl md:text-4xl flex-1">
          Sufyane MOUFOUTAOU
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link to="/contact">
            <span className="inline-flex justify-center bg-[var(--color-warm)] hover:bg-[#EA9309] transition px-4 py-2 text-sm text-white rounded-md font-medium min-w-[110px]">
              Contact
            </span>
          </Link>
          <Link to="/services">
            <span className="inline-flex justify-center bg-[var(--color-warm)] hover:bg-[#EA9309] transition px-4 py-2 text-sm text-white rounded-md font-medium min-w-[110px]">
              Services
            </span>
          </Link>
          <Link to="/portfolio">
            <span className="inline-flex justify-center bg-[var(--color-warm)] hover:bg-[#EA9309] transition px-4 py-2 text-sm text-white rounded-md font-medium min-w-[110px]">
              Portfolio
            </span>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 pb-10 w-full">

        {/* Colonne gauche */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Compétences clées */}
          <div className="rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Compétences clées</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {skills.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-xl p-4 hover:scale-[1.02] transition cursor-default"
                >
                  <div className="bg-white dark:bg-[#0D1B2A] rounded-xl p-4">
                    {icon}
                  </div>
                  <span className="text-sm font-semibold text-[#0D1B2A] dark:text-[#E0E1DD] text-center">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/skills" className="text-xs text-[var(--color-accent)] hover:underline self-end flex items-center gap-1">
              Voir toutes <GoArrowUpRight />
            </Link>
          </div>

          {/* Aperçu des services */}
          <div className="rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Aperçu de mes services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-xl p-4 hover:scale-105 transition cursor-default"
                >
                  <div className="bg-white dark:bg-[#0D1B2A] rounded-xl p-3 w-fit">
                    {icon}
                  </div>
                  <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">{title}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
            <Link to="/services" className="text-xs text-[var(--color-accent)] hover:underline self-end flex items-center gap-1">
              Voir tous <GoArrowUpRight />
            </Link>
          </div>
        </div>

        {/* Colonne droite — Projets récents */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          <div className="rounded-xl p-5 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Projet récents</h2>
            <div className="flex flex-col gap-8">
              {recentProjects.map(({ nom, description, image, logo, url }) => (
                <a
                  key={nom}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl bg-[#f3f4f6] dark:bg-[#1B263B] overflow-hidden hover:scale-[1.02] transition"
                >
                  <div className="w-full h-36 overflow-hidden">
                    <img src={image} alt={nom} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-row items-start gap-3 p-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-[#0D1B2A] overflow-hidden flex items-center justify-center shadow">
                      <img src={logo} alt={nom} className="w-6 h-6 rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">{nom}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <Link to="/portfolio" className="text-xs text-[var(--color-accent)] hover:underline self-end flex items-center gap-1">
              Voir tous <GoArrowUpRight />
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Home
