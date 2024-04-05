import React, { useState, useEffect } from 'react';
import NeonCursor from './components/NeonCursor';
import Navbar from './components/Navbar';
import Hero from './Hero/Hero';
import About from './components/About'; 
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  return (
    <div className="bg-dark-primary py-8 px-0">
      <NeonCursor />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Timeline />
      <Testimonial />
      <ContactForm />
      <ScrollProgress />
      <Footer />
    </div>
  );
}

export default App;
