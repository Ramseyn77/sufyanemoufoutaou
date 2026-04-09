import React from 'react'
import Navbar from '../components/Navbar'
import Project from '../components/Project'
import Footer from '../components/Footer'

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 text-[#1B263B] dark:text-[#E0E1DD]">
        <Project />
      </div>
      <Footer />
    </>
  )
}

export default Portfolio
