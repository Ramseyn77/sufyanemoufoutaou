import { ContactIcon } from 'lucide-react'
import React from 'react'
import logo2 from "../assets/img/logo2.png"
import { FaWhatsapp, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'

const Contact = () => {
    // Définition des couleurs pour chaque réseau
    const iconColors = {
        whatsapp: "#25D366",
        linkedin: "#0077B5",
        facebook: "#1877F3",
        instagram: "#E4405F",
        email: "#EA4335" // Rouge Gmail
    }

    const contacts = [
        {
            logo: FaWhatsapp,
            color: iconColors.whatsapp,
            img: logo2,
            name: "Sufyane Ramseyn",
            followers: '222 contacts',
            link: 'https://wa.me/229484759044?text=Bonjour%2C%20je%20viens%20de%20votre%20portfolio%20et%20j’aimerais%20échanger%20avec%20vous.'
        },
        {
            logo: FaLinkedin,
            color: iconColors.linkedin,
            img: logo2,
            name: "Sufyane Ramseyn",
            followers: '148 relations',
            link: 'https://linkedin.com/in/sufyane-ramseyn-5a5285282'
        },
        {
            logo: FaFacebook,
            color: iconColors.facebook,
            img: logo2,
            name: "Sufyane Ramseyn",
            followers: '1,1k followers',
            link: 'https://www.facebook.com/sufyane.ramseyn'
        },
        {
            logo: FaInstagram,
            color: iconColors.instagram,
            img: logo2,
            name: "Sufyane Ramseyn",
            followers: '16 followers',
            link: 'https://www.instagram.com/sufyaneramseyn?igsh=bmR1dWpxb2EwZDJh '
        },
        {
            logo: FaEnvelope,
            color: iconColors.email,
            img: logo2,
            name: "Sufyane Ramseyn",
            followers: '',
            link: 'mailto:sufyaneramseyn@gmail.com'
        }
    ]

    return (
        <>
            <div id='contact' className='flex flex-col justify-center items-center w-full py-2 bg-white dark:bg-[#0D1B2A] gap-12'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <span className='flex flex-row gap-x-2 text-sm text-indigo-500 font-medium dark:text-blue-500 items-center'>
                        <ContactIcon /> Contact
                    </span>
                    <p className='text-3xl text-[#0D1B2A] font-bold dark:text-[#E0E1DD]'>
                        J’aimerais travailler avec vous
                    </p>
                </div>

                {/* 
                    Desktop : boutons sur une ligne (flex-row)
                    Mobile : grille 2x2 max (grid grid-cols-2), sinon colonne si peu d'éléments
                */}
                <div className=" w-full flex-row flex-wrap gap-4 items-center hidden md:flex justify-center  ">
                    {contacts.map((item, index) => {
                        const Logo = item.logo
                        return (
                            <div key={index} className='relative flex flex-row gap-2 px-3 py-3 w-[30%] min-w-[220px] max-w-[300px] bg-gray-50 rounded-lg hover:scale-105 transition-all duration-300 dark:bg-[#1B263B] shadow-sm hover:shadow-md items-center'>
                                {/* Image avec badge logo en bas à droite */}
                                <div className='relative flex-shrink-0'>
                                    <img src={item.img} alt="logoEntreprise" className='h-10 w-10 rounded-full object-cover'/>
                                    <span  className="  absolute bottom-0 right-0  translate-x-1/4  translate-y-1/4  bg-white dark:bg-[#2A3A4A] rounded-full p-1shadow border border-gray-200 dark:border-[#1B263B] flex items-center justify-center"  >
                                        <Logo className="w-4 h-4" style={{ color: item.color }} />
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2 w-full min-w-0'>
                                    <div className='flex flex-col items-start justify-center text-[#0D1B2A] font-bold text-sm dark:text-[#E0E1DD]'>
                                        {item.name}
                                    </div>
                                    <div className='flex flex-row justify-between items-center w-full text-xs text-gray-600 font-semibold dark:text-gray-400'>
                                        <span>{item.followers}</span>
                                        <a href={item.link}>
                                            <GoArrowUpRight className='h-4 w-8 hover:scale-130 transition-all duration-300 text-gray-600 font-semibold dark:text-gray-400' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Mobile : grille 2x2 max */}
                <div className=" w-full grid grid-cols-1 xs:grid-cols-2 gap-4 items-center md:hidden px-2 "  >
                    {contacts.map((item, index) => {
                        const Logo = item.logo
                        return (
                            <div key={index} className='relative flex flex-row gap-2 px-3 py-3 w-full bg-gray-50 rounded-lg hover:scale-105 transition-all duration-300 dark:bg-[#1B263B] shadow-sm hover:shadow-md items-center'  >
                                {/* Image avec badge logo en bas à droite */}
                                <div className='relative flex-shrink-0'>
                                    <img
                                        src={item.img}
                                        alt="logoEntreprise"
                                        className='h-14 w-14 rounded-full object-cover'
                                    />
                                    <span className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white dark:bg-[#2A3A4A] rounded-full p-1 shadow border border-gray-200 dark:border-[#1B263B] flex items-center justify-center " >
                                        <Logo className="w-4 h-4" style={{ color: item.color }} />
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2 w-full min-w-0'>
                                    <div className='flex flex-col items-start justify-center text-[#0D1B2A] font-bold text-sm dark:text-[#E0E1DD]'>
                                        {item.name}
                                    </div>
                                    <div className='flex flex-row justify-between items-center w-full text-xs text-gray-600 font-semibold dark:text-gray-400'>
                                        <span>{item.followers}</span>
                                        <a href={item.link}>
                                            <GoArrowUpRight className='h-6 w-6 hover:scale-130 transition-all duration-300 text-gray-600 font-semibold dark:text-gray-400' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Contact