import React from 'react'
import omnitrade from "../assets/img/omnitrade.jpg"
import sobapas from "../assets/img/sobaps.jpeg"
import edout from "../assets/img/edoutech.png"
import { Package } from 'lucide-react'

const Experience = () => {
  const experiences = [
    { entreprise: 'OMNITRADE', poste: 'Developpeur Frontend', periode: 'Juin 2025 - Aout 2025', logo: omnitrade },
    { entreprise: 'SoBAPS SA', poste: 'Developpeur Full Stack', periode: 'Juin 2024 - Sep 2024', logo: sobapas },
    { entreprise: 'Edoutech', poste: 'Stagiaire Developpeur', periode: 'Juin 2023 - Aout 2023', logo: edout },
  ]

  return (
    <div id='experiences' className='flex flex-col justify-center items-center w-full py-2 bg-white dark:bg-[var(--color-dark)] gap-12'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <span className='flex flex-row gap-x-2 text-sm text-[var(--color-accent)] font-medium'>
          <Package /> Experiences
        </span>
        <p className='text-3xl text-[var(--color-text-dark)] font-bold dark:text-[var(--color-text-light)]'>Mon parcours professionnel</p>
      </div>

      <div className='flex flex-wrap gap-4 justify-center items-center w-full max-w-6xl mx-auto px-4'>
        {experiences.map((experience, index) => (
          <div key={index} className='flex flex-row gap-2 px-3 py-3 w-[calc(50%-0.5rem)] min-w-[300px] max-w-[400px] bg-gray-50 rounded-lg hover:scale-105 transition-all duration-300 dark:bg-[var(--color-dark-surface)] shadow-sm hover:shadow-md'>
            <div className='rounded-full bg-white dark:bg-[var(--color-dark-border)] p-3 flex items-center justify-center shadow-xs flex-shrink-0'>
              <img src={experience.logo} alt="logoEntreprise" className='h-8 w-8 rounded-full object-cover' />
            </div>
            <div className='flex flex-col gap-2 w-full min-w-0'>
              <div className='flex flex-col items-start justify-center text-[var(--color-text-dark)] font-bold text-sm dark:text-[var(--color-text-light)]'>
                {experience.entreprise}
              </div>
              <div className='flex flex-row justify-between items-center w-full text-xs text-gray-600 font-semibold dark:text-gray-400'>
                <span>{experience.poste}</span>
                <span>{experience.periode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
