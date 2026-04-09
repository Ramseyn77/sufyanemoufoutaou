import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import data from '../utils/data.json'
import { GoArrowUpRight } from 'react-icons/go'

const Blog = () => {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div className="flex flex-col w-full min-h-screen dark:bg-[#0D1B2A]">
        <Navbar />
        <div className="px-4 py-6 flex flex-col gap-6 max-w-3xl mx-auto w-full">
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-indigo-500 dark:text-blue-400 hover:underline self-start"
          >
            ← Retour aux articles
          </button>
          <div className="flex flex-col gap-3">
            <span className="text-xs text-gray-400">{selected.date}</span>
            <h1 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">{selected.titre}</h1>
            <p className="text-sm text-indigo-500 dark:text-blue-400 font-medium">{selected.description}</p>
          </div>
          <div className="bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {selected.contenu}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-[#0D1B2A]">
      <Navbar />
      <div className="px-4 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Blog</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Réflexions sur le dev, le design et l'IA.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.blogs.map((article, index) => (
            <button
              key={index}
              onClick={() => setSelected(article)}
              className="flex flex-col gap-3 bg-[#f3f4f6] dark:bg-[#1B263B] rounded-2xl p-5 text-left hover:scale-[1.02] transition group"
            >
              <span className="text-xs text-gray-400">{article.date}</span>
              <h2 className="text-sm font-bold text-[#0D1B2A] dark:text-[#E0E1DD] leading-snug">
                {article.titre}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                {article.description}
              </p>
              <span className="flex items-center gap-1 text-xs text-indigo-500 dark:text-blue-400 font-medium group-hover:underline">
                Lire <GoArrowUpRight />
              </span>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Blog
