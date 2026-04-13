import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import data from '../utils/data.json'
import { GoArrowUpRight } from 'react-icons/go'
import { FaEye } from 'react-icons/fa'

import lydiaImg from '../assets/img/lydia.jpg'
import alainImg from '../assets/img/Alain1.png'
import logo1Img from '../assets/img/logo1.png'

const imageMap = {
  lydia: lydiaImg,
  alain: alainImg,
  logo1: logo1Img,
}

const categories = ['Tous', 'Web', 'Design', 'IA & ML', 'Autre']

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = activeCategory === 'Tous'
    ? data.projects
    : data.projects.filter((p) => p.categorie === activeCategory)

  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[#0D1B2A]">
      <Navbar />

      <div className="px-4 py-6 flex flex-col gap-6">

        {/* Filtres */}
        <div className="flex flex-row flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                activeCategory === cat
                  ? 'bg-amber-400 text-white'
                  : 'bg-[#f3f4f6] dark:bg-[#1B263B] text-[#1B263B] dark:text-[#8CA5C4] hover:bg-amber-100 dark:hover:bg-[#253450]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liste projets */}
        <div className="flex flex-col gap-4">
          {filtered.map((project, index) => {
            const img = imageMap[project.image] || logo1Img
            return (
              <div
                key={index}
                className="flex flex-row gap-5 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-4 items-center"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden bg-blue-400">
                  <img src={img} alt={project.nom} className="w-full h-full object-cover" />
                </div>

                {/* Contenu */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h2 className="text-base font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">
                    {project.nom.toUpperCase()}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-row flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#0D1B2A] dark:text-[#8CA5C4]">
                      Technologies :
                    </span>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-white dark:bg-[#0D1B2A] text-[#1B263B] dark:text-[#8CA5C4] px-2 py-0.5 rounded-md border border-gray-200 dark:border-[#253450]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {project.online && project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-amber-400 hover:bg-amber-500 transition rounded-lg"
                    >
                      <div className='flex text-white text-xs font-semibold px-4 py-2 items-center gap-1'>
                        Voir le site <GoArrowUpRight />
                      </div>
                    </a>
                  ) : project.visualisation ? (
                    <a
                      href={project.visualisation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center  bg-indigo-500 hover:bg-indigo-600 transition text-white text-xs font-semibold px-4 py-2 rounded-lg"
                    >
                      <div className='flex text-white gap-1 items-center'>
                        Visualisation <FaEye />
                      </div>
                    </a>
                  ) : null}
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 transition text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    <div className='text-white text-xs font-semibold'>
                      Contact
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Portfolio
