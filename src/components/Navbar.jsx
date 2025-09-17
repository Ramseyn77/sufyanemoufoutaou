import React, { useState } from 'react'
// import logo1 from "../assets/img/logo1.png" 
import logo2 from "../assets/img/logo2.png" 
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-row justify-between items-center py-1 px-2 w-full bg-white dark:bg-[#0D1B2A] mb-5 top-2">
        {/* Logo à gauche */}
        <div className='flex items-center'>
          <img src={logo2} alt="logo" className='w-10 h-10 rounded-full' />
        </div>
        {/* Nom au centre */}
        <div className='flex items-center text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]'>
          Sufyane MOUFOUTAOU
        </div>
        {/* Réseaux à droite */}
        <div className='flex items-center gap-4 justify-between text-md'>
          <a href="mailto:sufyaneramseyn@gmail.com"><FaEnvelope  className="text-[#1B263B] dark:text-[#8CA5C4] hover:text-indigo-500 dark:hover:text-blue-500 hover:scale-110 transition" /></a>
          <a href="https://github.com/Ramseyn77"> <FaGithub  className="text-[#1B263B] dark:text-[#8CA5C4] hover:text-indigo-500 dark:hover:text-blue-500 hover:scale-110 transition" /></a>
          <a href="https://linkedin.com/in/sufyane-ramseyn-5a5285282"> <FaLinkedin className="text-[#1B263B] dark:text-[#8CA5C4] hover:text-indigo-500 dark:hover:text-blue-500 hover:scale-110 transition"  /></a>
          <a href="https://wa.me/22954209334?text=Bonjour%2C%20je%20viens%20de%20votre%20portfolio%20et%20j’aimerais%20échanger%20avec%20vous."> <FaWhatsapp className="text-[#1B263B] dark:text-[#8CA5C4] hover:text-indigo-500 dark:hover:text-blue-500 hover:scale-110 transition"  /></a>
          <a href="https://www.facebook.com/sufyane.ramseyn"> <FaFacebook  className="text-[#1B263B] dark:text-[#8CA5C4] hover:text-indigo-500 dark:hover:text-blue-500 hover:scale-110 transition" /></a>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full bg-white dark:bg-[#0D1B2A] mb-5 px-2 py-1 flex flex-col mt-2">
        {/* Header mobile : logo + nom centrés */}
        <div className="flex flex-row items-center justify-center relative">
          {/* Bouton menu hamburger à gauche */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 focus:outline-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <FaBars className="text-2xl text-[#1B263B] dark:text-[#8CA5C4]" />
          </button>
          {/* Logo et nom centrés */}
          <div className="flex flex-col items-center w-full">
            <img src={logo2} alt="logo" className='w-10 h-10 rounded-full mx-auto' />
            <span className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mt-1">Sufyane MOUFOUTAOU</span>
          </div>
        </div>
        {/* Réseaux sociaux sous forme d’icônes boutons circulaires */}
        <div className="flex flex-row justify-center gap-3 mt-2">
          <a href="mailto:sufyaneramseyn@gmail.com" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 flex items-center justify-center shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
            <FaEnvelope className="text-[#1B263B] dark:text-gray-400 text-lg" />
          </a>
          <a href="https://github.com/Ramseyn77" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 flex items-center justify-center shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
            <FaGithub className="text-[#1B263B] dark:text-gray-400 text-lg" />
          </a>
          <a href="https://linkedin.com/in/sufyane-ramseyn-5a5285282" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 flex items-center justify-center shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
            <FaLinkedin className="text-[#1B263B] dark:text-gray-400 text-lg" />
          </a>
          <a href="https://wa.me/22954209334?text=Bonjour%2C%20je%20viens%20de%20votre%20portfolio%20et%20j’aimerais%20échanger%20avec%20vous." className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 flex items-center justify-center shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
            <FaWhatsapp className="text-[#1B263B] dark:text-gray-400 text-lg" />
          </a>
          <a href="https://www.facebook.com/sufyane.ramseyn" className="rounded-full bg-[#E0E1DD] dark:bg-[#1B263B] p-2 flex items-center justify-center shadow hover:bg-indigo-100 dark:hover:bg-blue-900 transition">
            <FaFacebook className="text-[#1B263B] dark:text-gray-400 text-lg" />
          </a>
        </div>
        {/* Menu latéral/déroulant */}
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
              <div className="flex flex-col items-center gap-6">
                <img src={logo2} alt="logo" className='w-10 h-10 rounded-full mx-auto items-center' />
                <a href="#presentation" onClick={() => setMenuOpen(false)}><span className=' text-[#1B263B] hover:text-indigo-500 dark:text-[#8CA5C4] dark:hover:text-blue-500 '> Présentation </span></a>
                <a href="#experiences" onClick={() => setMenuOpen(false)}><span className=' text-[#1B263B] hover:text-indigo-500 dark:text-[#8CA5C4] dark:hover:text-blue-500 '> Expériences </span></a>
                <a href="#projets" onClick={() => setMenuOpen(false)}><span className=' text-[#1B263B] hover:text-indigo-500 dark:text-[#8CA5C4] dark:hover:text-blue-500 '> Projets </span></a>
                <a href="#competences" onClick={() => setMenuOpen(false)}><span className=' text-[#1B263B] hover:text-indigo-500 dark:text-[#8CA5C4] dark:hover:text-blue-500 '> Competences </span></a>
                <a href="#contact" onClick={() => setMenuOpen(false)}><span className=' text-[#1B263B] hover:text-indigo-500 dark:text-[#8CA5C4] dark:hover:text-blue-500 '> Contact </span></a>
              </div>
            </div>
            {/* Pour fermer le menu en cliquant à l'extérieur */}
            <div className="flex-1" onClick={() => setMenuOpen(false)}></div>
          </div>
        )}
      </div>
      {/* Petite animation pour le menu latéral */}
      <style>
        {`
          @keyframes slide-in-left {
            0% { transform: translateX(-100%);}
            100% { transform: translateX(0);}
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.3s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </>
  )
}

export default Navbar