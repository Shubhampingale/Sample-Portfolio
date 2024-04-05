import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const HeroBackgroundAnimation = () => {
  // State variable to track desktop view
  const [isDesktop, setIsDesktop] = useState(false);

  // Refs for SVG lines and animation
  const linesRef = useRef(null);
  const animationRef = useRef(null);

  // Effect to handle animation based on desktop view
  useEffect(() => {
    const lines = linesRef.current;

    // Start animation only on desktop
    if (isDesktop) {
      animationRef.current = gsap.to(lines, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    } else {
      // Kill animation if not on desktop
      if (animationRef.current) {
        animationRef.current.kill();
      }
    }

    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isDesktop]);

  // Effect to handle media query change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    // Set initial desktop view state
    setIsDesktop(mediaQuery.matches);

    // Function to handle media query change
    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    // Listen for media query changes
    mediaQuery.addListener(handleMediaChange);

    // Clean up media query listener on unmount
    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  // Render null if not on desktop
  if (!isDesktop) {
    return null;
  }

  // Render SVG lines for desktop view
  return (
    <svg
      ref={linesRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
    >
      {/* Horizontal line */}
      <line x1="-50" y1="49" x2="90" y2="49" stroke="lightgray" strokeWidth="0.5" />
      {/* Vertical line */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="lightgray" strokeWidth="0.5" />
    </svg>
  );
};

export default HeroBackgroundAnimation;
