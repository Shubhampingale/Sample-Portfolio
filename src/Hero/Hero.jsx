import React, { useState, useEffect, useRef } from 'react';
import HeroBackgroundAnimation from './HeroBackgroundAnimation';
import { gsap } from 'gsap';

const Hero = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const avatarRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');

    if (userData && mediaQuery.matches) {
      gsap.fromTo('.text-gradient', {
        opacity: 0,
        y: '-50px'
      }, {
        opacity: 1,
        y: '0px',
        stagger: 0.2,
        duration: 2,
        ease: 'power1.out',
        delay: 1
      });

      gsap.to(nameRef.current, {
        y: '-=12',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });

      gsap.to(avatarRef.current, {
        x: '+=15',
        y: '+=15',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    } else if (userData) {
      gsap.fromTo('.text-gradient', {
        opacity: 0,
        y: '-20px'
      }, {
        opacity: 1,
        y: '0px',
        stagger: 0.2,
        duration: 2,
        ease: 'power1.out',
        delay: 1
      });

      gsap.to(nameRef.current, {
        y: '-=10',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });

      gsap.to(avatarRef.current, {
        x: '+=10',
        y: '+=10',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }
  }, [userData]);

  if (loading) {
    return <div className="bg-dark-primary py-20 px-4 text-center h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-dark-primary py-20 px-4 text-center h-screen flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div id='home' className="bg-dark-primary py-20 px-4 text-center h-screen flex items-center justify-center">
      <HeroBackgroundAnimation />
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-start">
          <h1 ref={nameRef} className={`text-9xl font-bold ${window.innerWidth <= 768 ? 'text-6xl' : ''}`}>
            <span className="text-gradient">Jo</span>
            <span className="text-white">{userData.about.name.slice(2, -3)}</span>
            <span className="text-gradient">Do</span>
            <span className="text-white">e</span>
            <span className="text-gradient">.</span>
          </h1>
          <p ref={descriptionRef} className={`subtitle text-2xl text-white mt-2 `}>{userData.about.subTitle}</p>
        </div>
        <img
          ref={avatarRef}
          src={userData.about.avatar.url}
          alt="User Avatar"
          className="avatar"
          style={{ width: '50%', maxWidth: '500px', height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default Hero;
