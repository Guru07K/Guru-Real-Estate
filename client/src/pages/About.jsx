import React from 'react';
import { FaHome, FaSearch, FaEnvelope, FaCodeBranch, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiRedux } from 'react-icons/si';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10 bg-white text-white">
      <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">About This Project</h1>
      
      <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-900">
        This Real Estate platform is a comprehensive application developed using the MERN stack. 
        It aims to connect buyers and sellers efficiently, providing an intuitive user experience and powerful features.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Project Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaHome className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
          <p className="text-gray-300">
            Effortlessly browse through listings with an intuitive design that enhances user experience.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaSearch className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">Advanced Search Filters</h3>
          <p className="text-gray-300">
            Use filters to find the perfect property that fits your needs quickly and efficiently.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaEnvelope className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">Direct Email Communication</h3>
          <p className="text-gray-300">
            Users can directly send emails to property owners for inquiries and negotiations.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaCodeBranch className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">User Property Listings</h3>
          <p className="text-gray-300">
            Anyone can easily add their properties for sale, making it accessible for all users.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaCodeBranch className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">View Your Added Listings</h3>
          <p className="text-gray-300">
            Users can view their own listings, enabling easy management and tracking of their properties.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <FaCodeBranch className="text-white text-4xl mb-2" />
          <h3 className="text-xl font-semibold mb-2">Edit and Delete Your Properties</h3>
          <p className="text-gray-300">
            Users can edit or delete their property listings as needed, providing full control over their submissions.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-6 mt-16 text-gray-900">Technologies Used</h2>
      <div className="flex justify-center space-x-10 mb-10">
        <div className="flex items-center space-x-2">
          <SiMongodb className="text-green-600 text-6xl" />
          <span className="text-gray-900 text-xl">MongoDB</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiExpress className="text-gray-600 text-6xl" />
          <span className="text-gray-900 text-xl">Express.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiReact className="text-blue-600 text-6xl" />
          <span className="text-gray-900 text-xl">React.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiNodedotjs className="text-green-800 text-6xl" />
          <span className="text-gray-900 text-xl">Node.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiTailwindcss className="text-teal-600 text-6xl" />
          <span className="text-gray-900 text-xl">Tailwind CSS</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiRedux className="text-purple-600 text-6xl" />
          <span className="text-gray-900 text-xl">Redux</span>
        </div>
      </div>

      <h2 className="text-3xl mt-20 font-semibold text-center mb-6 mt-10 text-gray-900">Contact Me</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <a 
          href="https://github.com/Guru07K" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-transparent text-gray-700 hover:bg-gray-200 py-2 px-2 rounded-full transition duration-200 flex items-center"
        >
          <FaGithub className="text-gray-700 text-4xl hover:scale-150" />
        </a>
        <a 
          href="https://www.linkedin.com/in/gnanaguruk/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-transparent text-gray-700 hover:bg-gray-200 py-2 px-2 rounded-full transition duration-200 flex items-center"
        >
          <FaLinkedin className="text-gray-700 text-4xl hover:scale-150" />
        </a>
        <a 
          href="mailto:gnanaguru704@gmail.com" 
          className="bg-transparent text-gray-700 hover:bg-gray-200 py-2 px-2 rounded-full transition duration-200 flex items-center"
        >
          <FaEnvelope className="text-gray-700 text-4xl hover:scale-150" />
        </a>
      </div>
    </div>
  );
};

export default About;
