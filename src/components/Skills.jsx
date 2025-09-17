import React from 'react'
import { GiSkills } from 'react-icons/gi'
import { AirplayIcon, LucideLaptop, Server } from 'lucide-react'
import jsimg from '../assets/img/JavaScript-logo.png'
import react from '../assets/react.svg'
import vueIcone from "../assets/img/vue-js-logo-png_seeklogo-274070.png"
import angular from "../assets/img/angular.jpeg"
import adonisIcon from "../assets/img/adonis.png"
import ts from "../assets/img/ts.png"
import next from "../assets/img/next.png"
import php from "../assets/img/Php_logo.svg.png"
import laravel from "../assets/img/laravel-framework-logo-png_seeklogo-311758.png"
import node from "../assets/img/Node.js_logo.svg.png"
import dart from "../assets/img/Dart-logo-icon.svg.png"
import mysql from "../assets/img/MySQL_textlogo.svg.png"
import canva from "../assets/img/Canva_Logo.svg.png"
import pyhton from "../assets/img/Python_logo_and_wordmark.svg.png"
import postman from "../assets/img/Postman_(software).png"
import insomnia from "../assets/img/insomnia.jpeg"
import tensorflow from "../assets/img/TensorFlow_logo.svg.png"
import sklearn from "../assets/img/Scikit_learn_logo_small.svg.png"
import figma from "../assets/img/Figma-logo.svg.png"


const Skills = () => {

    const frontIcons = [jsimg,ts, angular, vueIcone,react,adonisIcon, next]

    const BackIcons = [php, laravel, node,dart,mysql]

    const Others = [pyhton,tensorflow,sklearn,figma, canva, postman, insomnia]

  return (
    <>
        <div id="competences" className="flex flex-col justify-center items-center w-full py-4 bg-white dark:bg-[#0D1B2A] gap-8">
            
            <div className="flex flex-col gap-1 justify-center items-center">
                <span className="flex flex-row gap-x-2 text-sm text-indigo-500 font-medium dark:text-blue-500 items-center">
                    <GiSkills /> Compétences
                </span>
                <p className="text-3xl text-[#0D1B2A] font-bold dark:text-[#E0E1DD]">Front-End / Back-End / Logiciels</p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Frontend */}
                <div className="flex flex-col justify-center items-center py-3 px-2 gap-3 bg-transparent">
                    <div className="flex flex-row gap-2 items-center">
                        <LucideLaptop />
                        <span className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Front-End</span>
                    </div>
                    <div className="w-full flex flex-wrap justify-center gap-4">
                        {frontIcons.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt="logoLangage"
                                className="h-10 w-10 hover:scale-110 transition hover:cursor-pointer m-1 rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Backend */}
                <div className="flex flex-col justify-center items-center py-3 px-2 gap-3 bg-transparent">
                    <div className="flex flex-row gap-2 items-center">
                        <Server />
                        <span className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Back-End</span>
                    </div>
                    <div className="w-full flex flex-wrap justify-center gap-4">
                        {BackIcons.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt="logoLangage"
                                className="h-10 w-10 hover:scale-110 transition hover:cursor-pointer m-1 rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Logiciels & IA */}
                <div className="flex flex-col justify-center items-center py-3 px-2 gap-3 bg-transparent">
                    <div className="flex flex-row gap-2 items-center">
                        <AirplayIcon />
                        <span className="text-lg font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Logiciels & IA</span>
                    </div>
                    <div className="w-full flex flex-wrap justify-center gap-4">
                        {Others.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt="logoLangage"
                                className="h-10 w-10 hover:scale-110 transition hover:cursor-pointer m-1 rounded-md"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Skills