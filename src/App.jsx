import { React } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <div id="top" className="w-screen h-full flex flex-col items-center dark:bg-[#0D1B2A] py-4'">
        <div className="md:w-[60%] h-full gap-6 flex flex-col ">
          <Navbar />
          <Hero />
          <Experience />
          <Project />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
