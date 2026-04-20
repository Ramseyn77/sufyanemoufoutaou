import React from 'react'
import logo1 from "../assets/img/logo2.png"
import lydia from "../assets/img/lydia.jpg"
import { GoProjectRoadmap } from 'react-icons/go'

const Project = () => {
  const projects = [
    { nom: 'Lydia', description: 'Plateforme de gestion des etablissements', logo: lydia, url: "https://www.lydia-edu.com" },
    { nom: 'Portfolio', description: "Realisation d'un template de portfolio pour les jeunes freelance", logo: logo1, url: "https://github.com/Ramseyn77/Portfolio" },
    { nom: 'CDN (en cours)', description: "Conception d'une maquette pour le site du code du numerique du ministere du numerique et de la digitalisation", logo: logo1, url: "https://www.figma.com/design/eEwQmnqc86ie638XxY1aGG/CDN?node-id=5-6&t=cHYwoG7oLB9YMWYs-1" },
    { nom: 'HeartPrediction', description: "Creation d'un modele machine learning capable de predire une maladie cardiaque", logo: logo1, url: "https://github.com/Ramseyn77/Heart" },
    { nom: 'CryptoFarm', description: "Fonctions d'encodage et de decodage par algorithmes de Cesar, Vigenere et Affine", logo: logo1, url: "https://github.com/Ramseyn77/Cryptographie" },
    { nom: 'Houssing', description: "Modele d'apprentissage capable de predire le prix d'une maison en Californie", logo: logo1, url: "https://github.com/Ramseyn77/Houssing" },
  ]

  const handleClick = (item) => window.open(item.url, '_blank')

  return (
    <div id='projets' className='flex flex-col justify-center items-center w-full py-2 bg-white dark:bg-[var(--color-dark)] gap-12'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <span className='flex flex-row gap-x-2 text-sm text-[var(--color-accent)] font-medium'>
          <GoProjectRoadmap className='h-6 w-6' /> Projets
        </span>
        <p className='text-3xl text-[var(--color-text-dark)] font-bold dark:text-[var(--color-text-light)]'>Mes projets recents</p>
      </div>

      <div className='flex flex-wrap gap-4 justify-center items-center w-full max-w-6xl mx-auto px-4'>
        {projects.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)} className='flex flex-row gap-2 px-3 py-3 w-[calc(50%-0.5rem)] min-w-[300px] max-w-[400px] bg-gray-50 rounded-lg hover:scale-105 transition-all duration-300 dark:bg-[var(--color-dark-surface)] shadow-sm hover:shadow-md hover:cursor-pointer'>
            <div className='rounded-full bg-white dark:bg-[var(--color-dark-border)] p-3 flex items-center justify-center shadow-xs flex-shrink-0'>
              <img src={item.logo} alt="logoProjet" className='h-8 w-8 rounded-full object-cover' />
            </div>
            <div className='flex flex-col gap-2 w-full min-w-0'>
              <div className='flex flex-col items-start justify-center text-[var(--color-text-dark)] font-bold text-sm dark:text-[var(--color-text-light)]'>{item.nom}</div>
              <div className='flex flex-row justify-between items-center w-full text-xs text-gray-600 font-semibold dark:text-gray-400'>
                <span>{item.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project
