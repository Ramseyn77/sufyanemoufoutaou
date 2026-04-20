import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Competence from "./pages/competence";
import Service from "./pages/service";
import Blog from "./pages/blog";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen flex flex-col items-center bg-[var(--color-light-surface)] dark:bg-[var(--color-dark)]">
        <div className="md:w-[85%] w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/skills" element={<Competence />} />
            <Route path="/services" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
