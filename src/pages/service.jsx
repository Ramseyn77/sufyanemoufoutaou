import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import data from '../utils/data.json'
import { GoArrowUpRight } from 'react-icons/go'
import { CheckCircle2 } from 'lucide-react'

const { services } = data

const Service = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[#0D1B2A]">
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-8">

        {/* Hero */}
        <div className="flex flex-col items-center gap-5 bg-[#0D1B2A] dark:bg-[#1B263B] rounded-2xl px-6 py-10 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white max-w-2xl leading-snug">
            {services.hero.titre}
          </h1>
          <p className="text-sm text-indigo-400 max-w-xl leading-relaxed">
            {services.hero.sousTitre}
          </p>
          <div className="flex flex-row gap-4 flex-wrap justify-center mt-2">
            <Link
              to="/portfolio"
              className="px-7 py-3 bg-green-500 hover:bg-green-600 transition text-white font-semibold rounded-xl text-sm"
            >
              <div className='text-white text-sm'>
                Voir les réalisations
              </div>
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 bg-amber-400 hover:bg-amber-500 transition text-white font-semibold rounded-xl text-sm"
            >
              <div className='text-white text-sm'>
                Discuter de votre projet
              </div>
            </Link>
          </div>
        </div>

        {/* Cas */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] text-center">
            Vous êtes dans l'un de ces cas&nbsp;??
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
            {services.cas.map((cas, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-[#0D1B2A] dark:text-[#E0E1DD]">{cas}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-indigo-500 dark:text-blue-400 font-medium mt-1">
            Je vous accompagne jusqu'au déploiement
          </p>
        </div>

        {/* Process */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] text-center">
            Mon process de travail
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.process.map((step, i) => (
              <div
                key={i}
                className="relative overflow-hidden flex flex-col gap-4 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-5 border border-amber-400/20"
              >
                <span className="absolute -top-4 -right-1 text-6xl font-black text-amber-400/15 select-none">
                  {step.numero}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-base font-extrabold leading-none">{step.numero}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-bold">
                    Etape {step.numero}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD] leading-snug">
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
              className="px-8 py-3 bg-green-500 hover:bg-green-600 transition rounded-xl "
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
