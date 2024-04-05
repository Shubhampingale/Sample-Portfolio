import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaAward } from 'react-icons/fa';
import { gsap } from 'gsap';

const About = () => {
  // State variables for user data and error
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Ref for quote animation
  const quoteRef = useRef(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data.user.about);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Effect for animations
  useEffect(() => {
    // Animation for underline and icon rotation
    const underlineAnimation = gsap.fromTo('.underline', { opacity: 0 }, { opacity: 1, repeat: -1, yoyo: true, duration: 1 });
    const iconAnimation = gsap.fromTo('.doodle-icon', { rotation: -5 }, { rotation: 5, repeat: -1, yoyo: true, duration: 0.1 });

    // Animation for quote movement
    const animateQuote = () => {
      if (quoteRef.current) {
        const quoteWidth = quoteRef.current.offsetWidth;
        gsap.fromTo(quoteRef.current,
          { xPercent: -100 },
          { xPercent: 100, duration: 15, repeat: -1, ease: 'linear' });
      }
    };

    animateQuote();

    // Resize listener to handle resizing
    const handleResize = () => {
      animateQuote();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup animations on unmount
    return () => {
      underlineAnimation.kill();
      iconAnimation.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render About section
  return (
    <section id='about' className="bg-dark-secondary py-28 px-4 relative" style={{ overflow: 'hidden' }}>
      {/* Section heading */}
      <h2 className='text-center mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white'>
        <span className='text-gradient'>JoDo's</span> Story
      </h2>
      {/* User information */}
      <div className="max-w-4xl mx-auto text-center border border-white p-4 flex flex-wrap justify-between items-center relative">
        <div className="text-left w-full md:w-1/2 mb-4">
          {/* User details */}
          <div className="flex items-center mb-2">
            <FaUser className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white" />
            <p className="text-base md:text-lg lg:text-xl text-gray-300 opacity-80">{userData && userData.title}</p>
          </div>
          {/* More user details */}
          <div className="flex items-center mb-2">
            <FaAward className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white" />
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-0">{userData && userData.title}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white" />
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-0">{userData && userData.phoneNumber}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white" />
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-0">{userData && userData.contactEmail}</p>
          </div>
        </div>
        {/* User description */}
        <div className="text-right w-full md:w-1/2 mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-heading mb-2">
            <span className="changing-color text-2xl md:text-3xl lg:text-4xl underline">Creative</span> Developer
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 opacity-80">{userData && userData.description}</p>
        </div>
      </div>
      {/* Quote animation */}
      <div ref={quoteRef} className="absolute left-0 right-0 bottom-0 text-center text-white text-2xl md:text-5xl lg:text-6xl opacity-25 font-bold uppercase whitespace-nowrap mt-2">
        {userData && userData.quote}
      </div>
    </section>
  );
};

export default About;
