import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Footer from '../components/Footer'
const About = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 text-[#1B263B] dark:text-[#E0E1DD]">
        <Hero />
        <Experience />
      </div>
      <Footer />
    </>
  )
}

export default About
