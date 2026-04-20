import React from 'react'
import hero from "../assets/img/hero.jpg" 
import data from '../utils/data.json'
import { FaWhatsapp } from 'react-icons/fa'

const Hero = () => {
  return (
  <>
    <div id="presentation" className="flex flex-col-reverse md:flex-row justify-center items-center py-8 px-2 w-full bg-[var(--color-light-panel)] dark:bg-[var(--color-dark-surface)] rounded-2xl">
      <div className="flex flex-col gap-4 px-2 py-1 w-full md:w-[70%] items-center md:items-start text-center md:text-left">
        <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
          {data.hero.name} {data.hero.surname} 
        </div>
        <div className="text-xs text-[var(--color-accent)] font-semibold">
          {data.hero.role}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
          {data.hero.message}
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 md:mb-0 md:ml-6 relative">
        <img
          src={hero}
          alt="hero"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[var(--color-accent)] object-cover"
        />
        <a
              href="https://wa.me/22954209334"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 -right-1 bg-[var(--color-success)] hover:bg-[#16A34A] transition p-2 rounded-full shadow-lg"
            >
              <FaWhatsapp className="text-white text-base" />
            </a>
      </div>
    </div>
  </>
  )
}

export default Hero
