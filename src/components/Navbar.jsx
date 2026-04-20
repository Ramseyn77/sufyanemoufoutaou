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
      ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] shadow-sm dark:bg-[rgba(66,133,244,0.16)] dark:text-[var(--color-accent)]'
      : 'text-[var(--color-text-dark)] dark:text-slate-300 hover:bg-slate-100 hover:text-[var(--color-accent)] dark:hover:bg-[var(--color-dark-surface)] dark:hover:text-[var(--color-accent)]'
  }`

const mobileLinkClass = ({ isActive }) =>
  `rounded-xl border-l-2 px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] dark:border-[var(--color-accent)] dark:bg-[rgba(66,133,244,0.16)] dark:text-[var(--color-accent)]'
      : 'border-transparent text-[var(--color-text-dark)] dark:text-slate-300 hover:bg-slate-100 hover:text-[var(--color-accent)] dark:hover:bg-[var(--color-dark-surface)] dark:hover:text-[var(--color-accent)]'
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex flex-row justify-between items-center w-full bg-white dark:bg-[var(--color-dark)] mb-5 py-3 px-4">
        {/* Logo + nom */}
        <NavLink to="/" className="flex flex-row items-center gap-3">
          <img src={logo2} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
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
      <nav className="md:hidden w-full bg-white dark:bg-[var(--color-dark)] mb-5 px-3 py-2">
        <div className="flex flex-row items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="p-2 focus:outline-none"
          >
            <FaBars className="text-2xl text-slate-800 dark:text-slate-300" />
          </button>
          <NavLink to="/" className="flex flex-row items-center gap-2">
            <img src={logo2} alt="logo" className="w-9 h-9 rounded-full" />
            <span className="text-sm font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
              Sufyane MOUFOUTAOU
            </span>
          </NavLink>
        </div>

        {/* Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
            <div className="bg-white dark:bg-[var(--color-dark)] w-2/3 max-w-xs h-full p-6 flex flex-col shadow-lg animate-slide-in-left">
              <button
                className="self-end mb-6 text-2xl text-slate-800 dark:text-slate-300 focus:outline-none"
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
