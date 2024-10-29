import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInteriorProject = ({ isActive, onClick }) => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    projectType: '',
    siteAddress: '',
    gstNo: '',
    maheraNo: '',
    projectHead: '',
    rccDesignerName: '',
    Pan: '',
    Aadhar: '',
    Pin: '',
    email: '',
    Floor_Plan_1: '',
    Floor_Plan_2: '',
    Floor_Plan_3: '',
    Floor_Plan_4: '',
    Section_1: '',
    Section_2: '',
    Section_3: '',
    Section_4: '',
    All_Section: '',
    Elevation_1: '',
    Elevation_2: '',
    Elevation_3: '',
    Elevation_4: '',
    All_Elevation: '',
    ThreeD_Model_1: '',
    ThreeD_Model_2: '',
    ThreeD_Model_3: '',
    Detail_Working_Layout_1: '',
    Electrical_Layout_1: '',
    Electrical_Layout_2: '',
    Electrical_Layout_3: '',
    Celling_Layout_1: '',
    Celling_Layout_2: '',
    Flooring_Details_1: '',
    Flooring_Details_2: '',
    PlumbingDetails_1: '',
    PlumbingDetails_2: '',
    Furniture_Details_1: '',
    Furniture_Details_2: '',
    Furniture_Details_3: '',
    Furniture_Details_4: '',
    Furniture_Details_5: '',
    Laminator_Venner_1: '',
    Laminator_Venner_2: '',
    Handles_Hardware_1: '',
    Handles_Hardware_2: '',
    Curtains_1: '',
    Curtains_2: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    console.log(`File selected for ${e.target.name}:`, e.target.files[0]);
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/interior/interiors', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form data submitted:', data);
      toast.success('Interior project added successfully!'); // Show success message
      // Reset form or handle successful submission as needed
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form: ' + error.message); // Show error message
    }
  };

  const renderFormInput = (label, name, placeholder) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );

  const renderFileInput = (label, name) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  const renderSection = (title, fields) => (
    <>
      <h2 className="text-center pt-5 pb-4 font-bold uppercase">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((field, index) => renderFileInput(field.label, field.name))}
      </div>
    </>
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <ToastContainer /> {/* Add ToastContainer here */}
      <button
        className={`w-full text-left p-2 text-center mb-4 rounded ${
          isActive ? 'bg-blue-600 text-white' : 'bg-gray-100'
        }`}
        onClick={onClick}
      >
        Add Interior Project
      </button>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderFormInput('Title', 'title', 'Project Title')}
          {renderFormInput('Client Name', 'clientName', 'Client Name')}
          {renderFormInput('Project Type', 'projectType', 'Project Type')}
          {renderFormInput('Site Address', 'siteAddress', 'Site Address')}
          {renderFormInput('GST No', 'gstNo', 'GST No')}
          {renderFormInput('Mahera No', 'maheraNo', 'Mahera No')}
          {renderFormInput('Project Head', 'projectHead', 'Project Head')}
          {renderFormInput('RCC Designer Name', 'rccDesignerName', 'RCC Designer Name')}
          {renderFormInput('PAN', 'Pan', 'PAN')}
          {renderFormInput('Aadhar', 'Aadhar', 'Aadhar')}
          {renderFormInput('Pin', 'Pin', 'Pin')}
          {renderFormInput('Email', 'email', 'Email')}
        </div>

        {/* Floor Plans */}
        {renderSection('Presentation Drawing', [
          { label: 'Floor Plan 1', name: 'Floor_Plan_1' },
          { label: 'Floor Plan 2', name: 'Floor_Plan_2' },
          { label: 'Floor Plan 3', name: 'Floor_Plan_3' },
          { label: 'Floor Plan 4', name: 'Floor_Plan_4' }
        ])}

        {/* Sections */}
        {renderSection('Section', [
          { label: 'Section 1', name: 'Section_1' },
          { label: 'Section 2', name: 'Section_2' },
          { label: 'Section 3', name: 'Section_3' },
          { label: 'Section 4', name: 'Section_4' },
          { label: 'All Section', name: 'All_Section' }
        ])}

        {/* Elevations */}
        {renderSection('Elevations', [
          { label: 'Elevation 1', name: 'Elevation_1' },
          { label: 'Elevation 2', name: 'Elevation_2' },
          { label: 'Elevation 3', name: 'Elevation_3' },
          { label: 'Elevation 4', name: 'Elevation_4' },
          { label: 'All Elevation', name: 'All_Elevation' }
        ])}

        {/* 3D Models */}
        {renderSection('3D Model', [
          { label: 'ThreeD Model 1', name: 'ThreeD_Model_1' },
          { label: 'ThreeD Model 2', name: 'ThreeD_Model_2' },
          { label: 'ThreeD Model 3', name: 'ThreeD_Model_3' }
        ])}

        {/* Working Drawings */}
        {renderSection('Detail Working Drawings', [
          { label: 'Electrical Layout 1', name: 'Electrical_Layout_1' },
          { label: 'Electrical Layout 2', name: 'Electrical_Layout_2' },
          { label: 'Electrical Layout 3', name: 'Electrical_Layout_3' },
          { label: 'Celling Layout 1', name: 'Celling_Layout_1' },
          { label: 'Celling Layout 2', name: 'Celling_Layout_2' },
          { label: 'Flooring Details 1', name: 'Flooring_Details_1' },
          { label: 'Flooring Details 2', name: 'Flooring_Details_2' },
          { label: 'Plumbing Details 1', name: 'PlumbingDetails_1' },
          { label: 'Plumbing Details 2', name: 'PlumbingDetails_2' }
        ])}

        {/* Furniture Details */}
        {renderSection('Furniture Details', [
          { label: 'Furniture Detail 1', name: 'Furniture_Details_1' },
          { label: 'Furniture Detail 2', name: 'Furniture_Details_2' },
          { label: 'Furniture Detail 3', name: 'Furniture_Details_3' },
          { label: 'Furniture Detail 4', name: 'Furniture_Details_4' },
          { label: 'Furniture Detail 5', name: 'Furniture_Details_5' }
        ])}

        {/* Laminator, Handles and Curtains */}
        {renderSection('Laminator, Handles and Curtains', [
          { label: 'Laminator/Venner 1', name: 'Laminator_Venner_1' },
          { label: 'Laminator/Venner 2', name: 'Laminator_Venner_2' },
          { label: 'Handles/Hardware 1', name: 'Handles_Hardware_1' },
          { label: 'Handles/Hardware 2', name: 'Handles_Hardware_2' },
          { label: 'Curtains 1', name: 'Curtains_1' },
          { label: 'Curtains 2', name: 'Curtains_2' }
        ])}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInteriorProject;
