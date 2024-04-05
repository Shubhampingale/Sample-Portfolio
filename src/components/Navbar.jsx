import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSticky) {
      setIsFalling(true);
      setTimeout(() => {
        setIsFalling(false);
      }, 300); // Adjust as needed to match the transition duration
    }
  }, [isSticky]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      gsap.to('.logo-text', {
        x: 40,
        opacity: 1,
        duration: 2,
        ease: 'bounce.in', 
        delay: 0.5
      });
    }
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50, 
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false); 
    }
  };

  return (
    <nav className={`py-2 px-4 flex justify-between items-center ${isSticky ? 'bg-dark-tertiary' : 'bg-dark-primary'} fixed top-0 left-0 right-0 z-10 transition-colors duration-500 ${isFalling ? 'transform -translate-y-100' : ''}`} style={{ backgroundColor: 'black'}}>
      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <button onClick={() => handleNavLinkClick('home')}>
          <span className="px-10 text-gradient text-4xl md:text-6xl font-bold logo-text" style={{ opacity: 0 }}>JoDo<span className='float'>.</span></span>
        </button>
      </div>
      <ul className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 ${isMobileMenuOpen ? 'absolute w-full top-full left-0 bg-black md:relative md:w-auto md:bg-transparent' : 'hidden md:flex'}`} >
        <li>
          <button onClick={() => handleNavLinkClick('home')} className={`text-base md:text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Welcome</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('about')} className={`text-base md:text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}><span className={'text-gradient font-bold'}>JoDo's</span> Story</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('services')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Services</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('skills')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Skills</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('projects')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Projects</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('timeline')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Timeline</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('testimonials')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Client Stories</button>
        </li>
        <li>
          <button onClick={() => handleNavLinkClick('contact')} className={`text-lg inline-block px-4 py-2 ${isSticky ? 'text-white bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-gray-300' : 'text-dark-text bg-transparent hover:border-gray-300 hover:border-b-2 hover:text-white'} transition-colors duration-300 focus:outline-none`}>Connect</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
