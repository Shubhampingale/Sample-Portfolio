import React, { useState, useEffect } from 'react';

// Projects component
const Projects = () => {
  // State variables
  const [projectsData, setProjectsData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [techStackOptions, setTechStackOptions] = useState([]);
  const [techStackFilters, setTechStackFilters] = useState([]);

  // Fetch projects data and set tech stack options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const data = await response.json();
        setProjectsData(data.user.projects);

        // Extract tech stack options
        const techStacks = data.user.projects.reduce((stacks, project) => {
          project.techStack.forEach(stack => {
            if (!stacks.includes(stack)) {
              stacks.push(stack);
            }
          });
          return stacks;
        }, []);
        setTechStackOptions(techStacks);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Toggle description visibility
  const toggleDescription = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Open modal to display project details
  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle tech stack filter change
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTechStackFilters([...techStackFilters, value]);
    } else {
      setTechStackFilters(techStackFilters.filter(stack => stack !== value));
    }
  };

  // Filter projects based on tech stack filters
  const filteredProjects = projectsData.filter(project =>
    techStackFilters.every(filter => project.techStack.includes(filter))
  );

  // JSX rendering
  return (
    <section id='projects' className="bg-dark-primary py-20 px-4 relative">
      <h1 className='text-center mt-0 mb-14 text-5xl font-bold text-white uppercase'>
        Projects
      </h1>
      {/* Tech stack filter options */}
      <div className="flex justify-center mb-4 flex-wrap">
        {techStackOptions.map((techStack, index) => (
          <label key={index} className="inline-flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              value={techStack}
              checked={techStackFilters.includes(techStack)}
              onChange={handleFilterChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-white">{techStack}</span>
          </label>
        ))}
      </div>
      {/* Display filtered projects */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={project._id} className={`text-left flex flex-col items-start p-2 relative transition-transform transform hover:scale-105 glow ${showModal && selectedProject === project ? 'bg-black' : ''}`}>
              <img src={project.image.url} alt={project.title} className="w-full h-40 object-cover mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
              <div className={`${showModal && selectedProject === project ? 'block' : 'hidden'}`}>
                <p className="text-lg text-gray-300 opacity-80 mb-2">Tech Stack: {project.techStack.join(', ')}</p>
                {project.liveurl && (
                  <a
                    href={project.liveurl}
                    className="text-lg text-blue-400"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                  >
                    Live URL
                  </a>
                )}
                {project.githuburl && (
                  <a
                    href={project.githuburl}
                    className="text-lg text-blue-400 ml-4"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                  >
                    GitHub URL
                  </a>
                )}
              </div>
              <div className={`${showModal && selectedProject === project ? 'block' : 'hidden'}`}>
                <p className={`text-lg text-gray-300 opacity-80 ${expandedIndex === index ? 'block' : 'line-clamp-2 overflow-hidden'}`}>
                  {project.description}
                </p>
                {project.description.length > 100 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-blue-500 text-sm underline mt-2"
                  >
                    {expandedIndex === index ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
              <button onClick={() => openModal(project)} style={{ color: 'violet' }} className="text-lg mr-4 cursor-pointer">View Details</button>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No projects found.</p>
        )}
      </div>
      {/* Modal for displaying project details */}
      {showModal && selectedProject && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black p-8 rounded-lg max-w-md w-full">
            <h2 className="text-white text-3xl font-bold mb-4">{selectedProject.title}</h2>
            <img src={selectedProject.image.url} alt={selectedProject.title} className="w-full h-auto mb-4" />
            <p className="text-lg text-white">{selectedProject.description}</p>
            <p className="text-lg text-gray-300 opacity-80 mt-2">Tech Stack: {selectedProject.techStack.join(', ')}</p>
            {selectedProject.liveurl && (
              <a
                href={selectedProject.liveurl}
                style={{ color: 'violet' }}
                className="text-lg"
                rel="noopener noreferrer"
                onClick={closeModal}
              >
                Live URL
              </a>
            )}
            {selectedProject.githuburl && (
              <a
                href={selectedProject.githuburl}
                style={{ color: 'violet' }}
                className="text-lg ml-4"
                rel="noopener noreferrer"
                onClick={closeModal}
              >
                GitHub URL
              </a>
            )}
            <button onClick={closeModal} style={{ color: 'violet' }} className="text-lg ml-10 mt-4 underline">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
