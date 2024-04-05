import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Timeline component
const Timeline = () => {
  // State variables
  const [timelineData, setTimelineData] = useState([]);
  const [error, setError] = useState(null);
  const timelineRef = useRef(null);

  // Effect to fetch timeline data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch timeline data');
        }
        const data = await response.json();
        // Filter out disabled entries
        setTimelineData(data.user.timeline.filter(entry => entry.enabled));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Effect to animate timeline entries
  useEffect(() => {
    if (!timelineRef.current) return;
  
    const timelineSection = timelineRef.current;
    const timelineEntries = timelineSection.querySelectorAll('.timeline-entry');
  
    timelineEntries.forEach((entry, index) => {
      gsap.fromTo(
        entry,
        { opacity: 0, y: '100%' },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          // Add ScrollTrigger animation
          scrollTrigger: {
            trigger: entry,
            start: 'top bottom-=100', // Adjust start position as needed
            toggleActions: 'play none none reverse', // Define toggle actions
          },
        }
      );
    });
  }, [timelineData]); // Run the animation whenever timelineData changes

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Separate education and experience entries
  const educationEntries = timelineData.filter(entry => entry.forEducation);
  const experienceEntries = timelineData.filter(entry => !entry.forEducation);

  // Concatenate education and experience entries
  const timelineEntries = [...educationEntries, ...experienceEntries];

  // JSX rendering
  return (
    <section id='timeline' className="bg-dark-secondary py-10 px-4 relative" ref={timelineRef}>
      <h1 className='text-center mt-0 mb-8 md:mb-20 text-4xl md:text-8xl font-bold text-white opacity-20 uppercase outlined-text'>Timeline</h1>
      <div className="max-w-4xl mx-auto">
        <div className="timeline-section">
          {timelineEntries.map((entry, index) => (
            <div key={entry._id} className={`timeline-entry p-10 border border-white mb-4 `}>
              <h3 className={`text-3xl font-bold ${entry.forEducation ? 'gradient-education' : 'gradient-experience'}`}>{entry.forEducation ? 'Education' : 'Experience'}</h3>
              <h3 className="text-2xl font-semibold text-white">{entry.jobTitle} at {entry.company_name}</h3>
              <div className="text-base text-gray-300 opacity-80 mb-4">
                <p>{entry.jobLocation}</p>
                <p>{new Date(entry.startDate).toLocaleDateString()} - {new Date(entry.endDate).toLocaleDateString()}</p>
                <p>{entry.summary}</p>
                <ul className="list-disc list-inside">
                  {entry.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
