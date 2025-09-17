import React from 'react'
import hero from "../assets/img/hero.jpg" 
// import logo2 from "../assets/img/logo2.png" 

const Hero = () => {
  return (
  <>
    <div id="presentation" className="flex flex-col-reverse md:flex-row justify-center items-center py-4 px-2 w-full bg-white dark:bg-[#0D1B2A]">
      <div className="flex flex-col gap-4 px-2 py-1 w-full md:w-[70%] items-center md:items-start text-center md:text-left">
        <div className="text-3xl md:text-4xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">
          Sufyane MOUFOUTAOU
        </div>
        <div className="text-sm text-indigo-500 font-medium dark:text-blue-500">
          UX/UI Designer - FullStack Web/Mobile - IA Engineer
        </div>
        <div className="text-sm text-[#1B263B] dark:text-gray-400">
          Passionné par la conception d’expériences simples et impactantes, je conçois et
          développe des produits web et mobiles de bout en bout. Mon expertise couvre le
          design UX/UI, le développement Full‑Stack et l’intégration de fonctionnalités IA
          pour gagner en performance et en valeur métier. J’aime transformer des idées en
          interfaces élégantes, accessibles et performantes, avec une attention particulière
          aux détails et à la qualité du code. Ouvert aux missions et collaborations —
          parlons de votre projet.
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 md:mb-0 md:ml-6">
        <img
          src={hero}
          alt="hero"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-indigo-500 dark:border-blue-500 object-cover"
        />
      </div>
    </div>
  </>
  )
}

export default Hero