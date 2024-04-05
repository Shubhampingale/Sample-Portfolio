import React, { useState, useEffect } from 'react';

// ScrollProgress component
const ScrollProgress = () => {
  // State variables
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Effect to calculate scroll percentage and handle window resize
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const percent = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(percent);
    };

    // Function to handle resize event
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    // Add event listeners for scroll and resize events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Call handleResize function initially
    handleResize();

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate stroke dash array based on scroll percentage
  const strokeDashArray = `${scrollPercentage}, 100`;

  // Render nothing if it's on a mobile device
  if (isMobile) {
    return null;
  }

  // JSX rendering
  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-center">
      <div className="h-20 w-20 relative">
        <svg className="absolute" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <circle className="circle" cx="18" cy="18" r="12" fill="transparent" strokeWidth="1" strokeDasharray={strokeDashArray} stroke="cyan" />
        </svg>
        <div className="progress-percentage absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm font-bold">{Math.round(scrollPercentage)}%</div>
      </div>
    </div>
  );
};

export default ScrollProgress;
