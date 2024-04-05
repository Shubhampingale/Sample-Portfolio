import React, { useState, useEffect } from 'react';

// NeonCursor component
const NeonCursor = () => {
  // State variables
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect to handle mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render the neon cursor if not on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className="neon-cursor"
      style={{ left: cursorPosition.x, top: cursorPosition.y }}
    ></div>
  );
};

export default NeonCursor;
