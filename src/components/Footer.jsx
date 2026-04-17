import React from 'react'
import logo2 from "../assets/img/logo2.png"
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const quickLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'Experiences' },
  { href: '/portfolio', label: 'Projets' },
  { href: '/blog', label: 'Blog' },
  { href: '/skills', label: 'Competences' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  { href: 'mailto:sufyaneramseyn@gmail.com', label: 'Email', icon: FaEnvelope },
  { href: 'https://github.com/Ramseyn77', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/sufyane-ramseyn-5a5285282', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://wa.me/229484759044?text=Bonjour%2C%20je%20viens%20de%20votre%20portfolio%20et%20j%E2%80%99aimerais%20%C3%A9changer%20avec%20vous.', label: 'WhatsApp', icon: FaWhatsapp },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full mt-8 border-t border-gray-200 dark:border-[#1B263B] bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img src={logo2} alt="logo" className="w-9 h-9 rounded-full flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0D1B2A] dark:text-[#E0E1DD] truncate">Sufyane MOUFOUTAOU</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">FullStack Web/Mobile • UX/UI • IA</p>
          </div>
        </div>

        <nav className="flex items-center gap-4 flex-wrap text-xs text-gray-500 dark:text-gray-400">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-indigo-500 dark:hover:text-blue-400 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition"
            >
              <Icon className="text-[#1B263B] dark:text-gray-400 text-sm" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#1B263B]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">© {year} Sufyane MOUFOUTAOU</p>
          <a href="#top" className="text-[11px] text-indigo-500 dark:text-blue-400 hover:underline">
            Revenir en haut
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
