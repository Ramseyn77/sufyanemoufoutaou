import React from 'react'
import logo2 from "../assets/img/logo2.png"
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="w-full bg-white dark:bg-[#0D1B2A] border-t border-gray-200 dark:border-[#1B263B] mt-8">
        {/* Top */}
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={logo2} alt="logo" className="w-10 h-10 rounded-full" />
              <span className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Sufyane MOUFOUTAOU</span>
            </div>
            <p className="text-sm text-[#1B263B]/70 dark:text-gray-400">
              UX/UI Designer • FullStack Web/Mobile • IA Engineer
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-md font-semibold text-[#0D1B2A] dark:text-[#E0E1DD]">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="/" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Acceuil</a>
              <a href="/about" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Expériences</a>
              <a href="/portfolio" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Projets</a>
              <a href="/blog" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Blog</a>
              <a href="/skills" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Compétences</a>
              <a href="/services" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Services</a>
              <a href="/contact" className="text-[#1B263B] dark:text-gray-400 hover:text-indigo-500 dark:hover:text-blue-500 transition">Contact</a>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-md font-semibold text-[#0D1B2A] dark:text-[#E0E1DD]">Contact</h4>
            <ul className="text-sm flex flex-col gap-2 text-[#1B263B] dark:text-gray-400">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#1B263B] dark:text-[#8CA5C4]" />
                <a href="mailto:sufyaneramseyn@gmail.com" className="hover:text-indigo-500 dark:hover:text-blue-500 transition">sufyaneramseyn@gmail.com</a>
              </li>
              <li>Disponible pour missions et collaborations.</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-md font-semibold text-[#0D1B2A] dark:text-[#E0E1DD]">Réseaux</h4>
            <div className="flex items-center gap-3">
              <a href="mailto:sufyaneramseyn@gmail.com" aria-label="Email" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
                <FaEnvelope className="text-[#1B263B] dark:text-gray-400 text-lg" />
              </a>
              <a href="https://github.com/Ramseyn77" aria-label="GitHub" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
                <FaGithub className="text-[#1B263B] dark:text-gray-400 text-lg" />
              </a>
              <a href="https://linkedin.com/in/sufyane-ramseyn-5a5285282" aria-label="LinkedIn" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
                <FaLinkedin className="text-[#1B263B] dark:text-gray-400 text-lg" />
              </a>
              <a href="https://wa.me/229484759044?text=Bonjour%2C%20je%20viens%20de%20votre%20portfolio%20et%20j’aimerais%20échanger%20avec%20vous.
" aria-label="WhatsApp" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
                <FaWhatsapp className="text-[#1B263B] dark:text-gray-400 text-lg" />
              </a>
              <a href="https://www.facebook.com/sufyane.ramseyn" aria-label="Facebook" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
                <FaFacebook className="text-[#1B263B] dark:text-gray-400 text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-[#1B263B]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#1B263B] dark:text-gray-400">© {year} Sufyane MOUFOUTAOU. Tous droits réservés.</p>
            <a href="#top" className="text-xs text-indigo-500 dark:text-blue-500 hover:underline">Revenir en haut</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer