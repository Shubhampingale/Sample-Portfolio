import React, { useState, useEffect } from 'react';

// Skills component
const Skills = () => {
  // State variables
  const [skillsData, setSkillsData] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Effect to fetch skills data
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch skills data');
        }
        const data = await response.json();
        // Filter out disabled skills
        setSkillsData(data.user.skills.filter(skill => skill.enabled));
      } catch (error) {
        setError(error.message);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle mouse enter event
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // JSX rendering
  return (
    <section id='skills' className="bg-dark-secondary py-10 px-4 md:py-16 md:px-0 relative">
      <h1 className='text-center mt-0 mb-8 text-5xl md:text-8xl font-bold text-white opacity-20 uppercase'>
        <span className="outlined-text">My Skills</span>
      </h1>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center">
        {skillsData.map((skill, index) => (
          <div key={skill._id} 
               className={`flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4`}
               onMouseEnter={() => handleMouseEnter(index)}
               onMouseLeave={handleMouseLeave}>
            <div className={`relative ${hoveredIndex === index ? 'glow-circle' : ''} ${hoveredIndex === index ? 'zoom-in' : ''}`}>
              <svg className="w-16 h-16 mx-auto" viewBox="0 0 36 36">
                <circle className="circle-bg" cx="18" cy="18" r="15.91549430918954" fill="transparent" strokeWidth="3" />
                <circle className="circle" cx="18" cy="18" r="15.91549430918954" fill="transparent" strokeWidth="3"
                        strokeDasharray={`${skill.percentage}, 100`} stroke="orange" />
                <image xlinkHref={hoveredIndex === index ? '' : skill.image.url} x="9" y="9" height="18" width="18" />
                {hoveredIndex === index && (
                  <text x="18" y="22" textAnchor="middle" fill="white" fontSize="10">{skill.percentage}%</text>
                )}
              </svg>
            </div>
            <div className={`flex items-center justify-center md:justify-start ${hoveredIndex === index ? 'zoom-in' : ''}`}>
              <span className="text-xl font-bold mb-2 text-white">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
