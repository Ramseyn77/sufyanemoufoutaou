import React, { useState } from 'react'
import logo2 from "../assets/img/logo2.png"
import { FaWhatsapp, FaLinkedin, FaFacebook } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'
import data from '../utils/data.json'

const MailIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mailIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="35%" stopColor="#34A853" />
        <stop offset="68%" stopColor="#FBBC05" />
        <stop offset="100%" stopColor="#EA4335" />
      </linearGradient>
    </defs>
    <path
      d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z"
      stroke="url(#mailIconGradient)"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m4 8 8 5.5L20 8"
      stroke="url(#mailIconGradient)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const iconMap = {
  FaWhatsapp: FaWhatsapp,
  FaEnvelope: MailIcon,
  FaLinkedin: FaLinkedin,
  FaFacebook: FaFacebook,
}

const iconColors = {
  FaWhatsapp: '#25D366',
  FaLinkedin: '#0077B5',
  FaFacebook: '#1877F3',
}

const contacts = data.contacts.map((c) => ({ ...c, img: logo2 }))

const Contact = () => {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', description: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(form.sujet || 'Contact depuis portfolio')
    const body = encodeURIComponent(
      `Nom: ${form.nom}\nEmail: ${form.email}\n\n${form.description}`
    )
    window.open(`mailto:sufyaneramseyn@gmail.com?subject=${subject}&body=${body}`)
  }

  return (
    <div id="contact" className="w-full py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Gauche — Parlons en */}
        <div className="lg:w-[40%] bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-[#0D1B2A] rounded-full p-2">
              <MailIcon className="w-[18px] h-[18px]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Parlons en ...</h2>
          </div>

          <div className="flex flex-col gap-8">
            {contacts.map(({ logo, img, name, followers, link }) => {
              const Icon = iconMap[logo]
              const color = iconColors[logo]
              const isMail = logo === 'FaEnvelope'
              return (
                <a
                  key={logo + name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-3 bg-white dark:bg-[#0D1B2A] rounded-xl px-4 py-3 hover:scale-[1.02] transition group"
                >
                  <div className="relative flex-shrink-0">
                    <img src={img} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                    <span className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1B263B] rounded-full p-0.5 border border-gray-200 dark:border-[#253450] flex items-center justify-center">
                      {isMail ? <Icon className="w-3 h-3" /> : <Icon className="w-3 h-3" style={{ color }} />}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[#0D1B2A] dark:text-[#E0E1DD] truncate">{name}</span>
                    {followers && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">{followers}</span>
                    )}
                  </div>
                  <GoArrowUpRight className="text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-blue-400 transition text-lg flex-shrink-0" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Droite — Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 rounded-2xl p-6 flex flex-col gap-4 lg:w-[50%]"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nom</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="bg-[#f3f4f6] dark:bg-[#1B263B] rounded-lg px-4 py-2.5 text-sm text-[#0D1B2A] dark:text-[#E0E1DD] border border-gray-200 dark:border-[#253450] focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="bg-[#f3f4f6] dark:bg-[#1B263B] rounded-lg px-4 py-2.5 text-sm text-[#0D1B2A] dark:text-[#E0E1DD] border border-gray-200 dark:border-[#253450] focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Sujet du projet</label>
            <input
              name="sujet"
              value={form.sujet}
              onChange={handleChange}
              placeholder="Ex: Site e-commerce, App mobile..."
              className="bg-[#f3f4f6] dark:bg-[#1B263B] rounded-lg px-4 py-2.5 text-sm text-[#0D1B2A] dark:text-[#E0E1DD] border border-gray-200 dark:border-[#253450] focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Décrivez votre projet..."
              className="bg-[#f3f4f6] dark:bg-[#1B263B] rounded-lg px-4 py-2.5 text-sm text-[#0D1B2A] dark:text-[#E0E1DD] focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-gray-400 resize-none flex-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: '#22c55e' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
              className="flex items-center gap-2 transition text-white font-semibold text-sm px-6 py-2.5 rounded-lg"
            >
              Envoyer <GoArrowUpRight className="text-lg" />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Contact
