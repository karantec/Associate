import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewInteriorProject = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/interior';

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjectData(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);

  const renderLoading = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const renderError = () => (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      Error: {error}
    </div>
  );

  // Filter projects by search term
  const filteredProjects = projectData.filter((project) =>
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleShowMore = (projectId) => {
    if (projectId) {
      navigate(`/show/${projectId}`); // Ensure projectId is defined here
    } else {
      console.error('Project ID is undefined.'); // Log error if ID is missing
    }
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Interior Projects</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Client Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {loading && renderLoading()}
      {error && renderError()}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <ProjectCard 
            key={project._id} 
            project={project} 
            handleShowMore={handleShowMore} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPages={totalPages} 
        />
      )}
    </div>
  );
};

const ProjectCard = ({ project, handleShowMore }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
    <div className="p-6 flex-grow">
      <h3 className="text-lg font-bold mb-4 text-center">Title: {project.title}</h3>
      <div className="space-y-2 text-gray-600 text-center">
        <p><span className="font-medium">Client:</span> {project.clientName}</p>
        <p><span className="font-medium">Type:</span> {project.projectType}</p>
        <p><span className="font-medium">Address:</span> {project.siteAddress}</p>
        <p><span className="font-medium">GST No:</span> {project.gstNo}</p>
      </div>
    </div>

    <div className="p-4 border-t flex justify-center">
      <button 
        onClick={() => handleShowMore(project._id)}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Show More
      </button>
    </div>
  </div>
);

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  <div className="flex justify-between items-center mt-6">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default ViewInteriorProject;
