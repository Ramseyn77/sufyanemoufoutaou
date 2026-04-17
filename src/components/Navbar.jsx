import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo2 from "../assets/img/logo2.png"
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/skills', label: 'Compétences' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const desktopLinkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-[#1B263B] dark:text-blue-400'
      : 'text-[#1B263B] dark:text-[#8CA5C4] hover:bg-gray-100 hover:text-indigo-500 dark:hover:bg-[#1B263B] dark:hover:text-blue-400'
  }`

const mobileLinkClass = ({ isActive }) =>
  `rounded-xl border-l-2 px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-blue-400 dark:bg-[#1B263B] dark:text-blue-400'
      : 'border-transparent text-[#1B263B] dark:text-[#8CA5C4] hover:bg-gray-100 hover:text-indigo-500 dark:hover:bg-[#1B263B] dark:hover:text-blue-400'
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex flex-row justify-between items-center w-full bg-white dark:bg-[#0D1B2A] mb-5 py-3 px-4">
        {/* Logo + nom */}
        <NavLink to="/" className="flex flex-row items-center gap-3">
          <img src={logo2} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">
            Sufyane MOUFOUTAOU
          </span>
        </NavLink>
        {/* Liens de navigation */}
        <div className="flex flex-row items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={desktopLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile */}
      <nav className="md:hidden w-full bg-white dark:bg-[#0D1B2A] mb-5 px-3 py-2">
        <div className="flex flex-row items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="p-2 focus:outline-none"
          >
            <FaBars className="text-2xl text-[#1B263B] dark:text-[#8CA5C4]" />
          </button>
          <NavLink to="/" className="flex flex-row items-center gap-2">
            <img src={logo2} alt="logo" className="w-9 h-9 rounded-full" />
            <span className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">
              Sufyane MOUFOUTAOU
            </span>
          </NavLink>
        </div>

        {/* Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
            <div className="bg-white dark:bg-[#0D1B2A] w-2/3 max-w-xs h-full p-6 flex flex-col shadow-lg animate-slide-in-left">
              <button
                className="self-end mb-6 text-2xl text-[#1B263B] dark:text-[#8CA5C4] focus:outline-none"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <FaTimes />
              </button>
              <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex flex-col items-center mb-6">
                <img src={logo2} alt="logo" className="w-12 h-12 rounded-full" />
              </NavLink>
              <div className="flex flex-col gap-5">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={mobileLinkClass}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slide-in-left {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  )
}

export default Navbar
