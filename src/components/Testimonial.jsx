import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Testimonials component
const Testimonials = () => {
  // State variables
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect to fetch testimonials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials data');
        }
        const data = await response.json();
        setTestimonialsData(data.user.testimonials);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Effect to handle autoplay of slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonialsData.length);
    }, 5000); // Change the interval time (in milliseconds) as per your requirement

    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <div className="slick-arrow"><i className="fas fa-chevron-right fa-2x"></i></div>,
    prevArrow: <div className="slick-arrow"><i className="fas fa-chevron-left fa-2x"></i></div>,
    afterChange: setCurrentSlide
  };

  // JSX rendering
  return (
    <section id='testimonials' className="bg-dark-primary py-10 sm:py-20 px-4 relative">
      <h1 className='text-center mt-0 mb-12 sm:mb-24 text-4xl sm:text-5xl font-bold text-white uppercase opacity-60'>
        Testimonials
      </h1>
      <div className="max-w-4xl mx-auto">
        <Slider {...settings} className="testimonial-slider">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial._id} className="testimonial-slide mb-8">
              <div className="testimonial-content mt-10" style={{ textAlign: 'center' }}>
                <img src={testimonial.image.url} alt={testimonial.name} className="w-20 h-20 mb-4 rounded-full mx-auto" />
                <h2 className="text-2xl font-bold text-white mb-2">{testimonial.name}</h2>
                <p className="text-lg font-bold text-gray-300 opacity-80 mb-2">{testimonial.position}</p>
                <p className="text-lg text-gray-300 opacity-80 mb-4">
                  <span className="quotation-mark">&ldquo;</span>
                  {testimonial.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
