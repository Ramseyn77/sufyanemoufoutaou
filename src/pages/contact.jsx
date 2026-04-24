import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const ContactPage = () => {
  return (
    <>
      <Seo
        title="Contact"
        description="Contactez Sufyane MOUFOUTAOU pour discuter d'un site web, d'une application mobile, d'un design UX/UI ou d'un projet IA."
        keywords="contact développeur, devis site web, freelance mobile, UX UI, projet IA"
      />
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default ContactPage
