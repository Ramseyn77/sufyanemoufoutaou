import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import data from '../utils/data.json'
import omnitradeImg from '../assets/img/omnitrade.jpg'
import sobapsImg from '../assets/img/sobaps.jpeg'
import edoutechImg from '../assets/img/edoutech.png'
import { GoArrowUpRight } from 'react-icons/go'
import { TrendingUp, Users, RefreshCw } from 'lucide-react'

const valeurIconMap = {
  TrendingUp: <TrendingUp className="w-5 h-5 text-indigo-500 dark:text-blue-400" />,
  Users:      <Users      className="w-5 h-5 text-indigo-500 dark:text-blue-400" />,
  RefreshCw:  <RefreshCw  className="w-5 h-5 text-indigo-500 dark:text-blue-400" />,
}

const logoMap = {
  '../assets/img/omnitrade.jpg': omnitradeImg,
  '../assets/img/sobaps.jpeg': sobapsImg,
  '../assets/img/edoutech.png': edoutechImg,
}

const About = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[#0D1B2A]">
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-8">

        {/* Hero */}
        <Hero />

        {/* Expériences + Certifications */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Expériences clés */}
          <div className="flex-1 flex flex-col gap-4 rounded-2xl border-2 border-blue-500/40 p-5">
            <h2 className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Expériences clés</h2>
            <div className="flex flex-col gap-3">
              {data.experiences.map((exp, i) => (
                <div
                  key={i}
                  className="flex flex-row gap-3 items-center bg-[#f3f4f6] dark:bg-[#0D1B2A] rounded-xl px-4 py-3"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white dark:bg-[#1B263B] overflow-hidden flex items-center justify-center shadow">
                    <img
                      src={logoMap[exp.logo]}
                      alt={exp.entreprise}
                      className="w-7 h-7 object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD] truncate">
                      {exp.entreprise}
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{exp.poste}</span>
                      <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">{exp.periode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations & certifications */}
          <div className="lg:w-[40%] flex flex-col gap-4 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-5">
            <h2 className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Formations et certifications</h2>
            <div className="flex flex-col gap-3">
              {data.certifs.map((certif, i) => (
                <div key={i} className="flex flex-row items-center gap-4 bg-white dark:bg-[#0D1B2A] rounded-xl px-4 py-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD] truncate">
                      {certif.titre}
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{certif.organisation}</span>
                      <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">{certif.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mon approche & valeurs */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Mon approche & valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.valeurs.map((valeur, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-blue-500/10 flex items-center justify-center">
                  {valeurIconMap[valeur.icone]}
                </div>
                <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">{valeur.titre}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5 py-4">
          <p className="text-sm text-indigo-500 dark:text-blue-400 font-medium text-center">
            Prêt à discuter de votre projet ou besoin de plus d'informations ?
          </p>
          <div className="flex flex-row gap-4">
            <Link
              to="/portfolio"
              className="px-8 py-3 bg-amber-400 hover:bg-amber-500 transition text-white font-semibold rounded-xl text-sm"
            >
               <div className='text-white font-semibold flex items-center gap-2'>
                  Voir mes projets
              </div>
            </Link>
            <Link
              to="/contact"
              className=" px-8 py-3 bg-green-500 hover:bg-green-600 transition rounded-xl text-sm"
            >
              <div className='text-white font-semibold flex items-center gap-2'>
                Me contacter <GoArrowUpRight />
              </div>
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default About
