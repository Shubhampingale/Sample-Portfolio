import React, { useState, useEffect } from 'react';

// Services component
const Services = () => {
  // State variables
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  // Effect to fetch services data
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const data = await response.json();
        // Filter out disabled services
        const enabledServices = data.user.services.filter(service => service.enabled);
        setServicesData(enabledServices);
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

  // JSX rendering
  return (
    <section id='services' className="bg-dark-primary py-10 sm:py-20 px-4 relative overflow-hidden">
      <h1 className='text-3xl sm:text-5xl font-bold text-white text-center relative mb-10 uppercase'>
        Services
      </h1>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center">
        {servicesData.map(service => (
          <div key={service._id} className="service-item flex flex-col items-center justify-center p-4 m-4 sm:w-1/4 hover:transform hover:scale-105 transition-transform duration-300 border border-white glow">
            <img src={service.image.url} alt={service.name} className="w-full mb-4 rounded-full" style={{ maxHeight: '150px', maxWidth: '150px', borderRadius: '50%' }} />
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{service.name}</h2>
            <p className="text-sm text-gray-300 opacity-80">{service.desc}</p>
            <p style={{color: 'yellow'}}className="text-xl font-bold mt-auto">{service.charge}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
