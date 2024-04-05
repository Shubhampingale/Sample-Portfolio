import React, { useState, useEffect } from 'react';
import { FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contactInfo, setContactInfo] = useState(null);
  const [socialHandles, setSocialHandles] = useState([]); // State to store social media handles

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }
        const data = await response.json();
        setContactInfo(data.user.about);
        setSocialHandles(data.user.social_handles.filter(handle => handle.enabled)); // Filter out disabled social handles
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend-url.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <section id='contact' className="bg-dark-secondary py-10 px-4 sm:py-20 sm:px-6 relative">
      <h1 className='text-center mt-0 mb-8 sm:mb-16 text-4xl sm:text-5xl font-bold text-white outlined-text uppercase '>
        Get In Touch
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center max-w-4xl mx-auto h-full">
        {/* Contact Info */}
        <div className="w-full sm:w-1/2 pr-0 sm:pr-8 mb-8 sm:mb-0">
          {contactInfo && (
            <div className="text-white">
              <div><h2 className="flex items-center"><FiUser className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white"/> <span className="text-xl md:text-xl lg:text-2xl font-bold text-dark-heading mb-0">{contactInfo.name}</span></h2></div>
              <div><h2 className="flex items-center"><FiMapPin className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white"/> <span className="text-xl md:text-xl lg:text-2xl font-bold text-dark-heading mb-0">{contactInfo.address}</span></h2></div>
              <div><h2 className="flex items-center"><FiPhone className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white"/> <span className="text-xl md:text-xl lg:text-2xl font-bold text-dark-heading mb-0">{contactInfo.phoneNumber}</span></h2></div>
              <div><h2 className="flex items-center"><FiMail className="text-xl md:text-2xl lg:text-3xl mr-2 doodle-icon icon-medium icon-white"/> <span className="text-xl md:text-xl lg:text-2xl font-bold text-dark-heading mb-0">{contactInfo.contactEmail}</span></h2></div>
            </div>
          )}
          {/* Social handles */}
          <div className="flex items-center mt-8">
            {socialHandles.map(handle => (
              <a key={handle._id} href={handle.url} rel="noopener noreferrer" className="mr-4">
                {handle.platform === 'Instagram' && <FaInstagram className="text-3xl text-white" />}
                {handle.platform === 'LinkedIn' && <FaLinkedin className="text-3xl text-white" />}
                {handle.platform === 'Twitter' && <FaTwitter className="text-3xl text-white" />}
                {handle.platform === 'Facebook' && <FaFacebook className="text-3xl text-white" />}
              </a>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
          <form onSubmit={handleSubmit} className="max-w-md w-full">
            <div className="mb-4">
              <label htmlFor="name" className="text-white text-lg sm:text-xl">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="block w-full mt-1 p-2 rounded-md bg-dark-secondary text-white border-b-2 border-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-lg sm:text-xl">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full mt-1 p-2 rounded-md bg-dark-secondary text-white border-b-2 border-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="text-white text-lg sm:text-xl">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" required className="block w-full mt-1 p-2 rounded-md bg-dark-secondary text-white border-b-2 border-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn">Submit</button>
            </div>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
