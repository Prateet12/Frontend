import React, { useState } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const ResearchAssistantRegistration = ({ registerCallback }) => {
  const navigate = useNavigate();

  const [highestDegreeObtained, setHighestDegreeObtained] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      "highestDegreeObtained": highestDegreeObtained,
      "researchAreas": selectedOptions.map(option => option.value),
      "resume": resume,
    };

    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails)
      .then(() => {
        // Redirect to the dashboard page upon successful registration
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  }

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  }

  const options = [
    { value: "environmental_science", label: "Environmental Science" },
    { value: "meteorology", label: "Meteorology" },
    { value: "air_pollution_science", label: "Air Pollution Science" },
    { value: "Architecture", label: "Architecture" },
    { value: "building_engineering", label: "Building Engineering" },
    { value: "urban_geography", label: "Urban Geography" },
    { value: "urban_planning_and_design", label: "Urban Planning and Design" },
    { value: "climate_science", label: "Climate Science" },
    { value: "remote_sensing", label: "Remote Sensing" },
    { value: "geographic_information_system", label: "Geographic Information System" },
    { value: "energy_efficiency_and_urban_sustainibility", label: "Energy Efficiency and Urban Sustainability" },
    { value: "urban_transportation_and_mobility", label: "Urban Transportation and Mobility" },
    { value: "urban_data_science_and_modelling", label: "Urban Data Science and Modelling" },
    { value: "urban_disaster_risk_reduction", label: "Urban Disaster Risk Reduction" },
    { value: "urban_climate_adaptation_planning", label: "Urban Climate Adaptation Planning" },
    { value: "urban_carbon_footprint_assessment", label: "Urban Carbon Footprint Assessment" },
    { value: "others", label: "Others" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="highestDegreeObtained">Highest Degree Obtained:</label>
        <select
          id="highestDegreeObtained"
          className="upload_input"
          value={highestDegreeObtained}
          onChange={(e) => setHighestDegreeObtained(e.target.value)}
          required
        >
          <option value="">Select a degree program</option>
          <option value="PhD">PhD</option>
          <option value="Masters">Master's</option>
          <option value="Bachelors">Bachelor's</option>
        </select>
      </div>

      <div className="form-group" style={{ maxWidth: "200px" }}>
        <label htmlFor="research-areas">Research Areas:</label>
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          isMulti={true}
        />
      </div>

      {/* <div className="form-group">
        <label htmlFor="resume">Resume:</label>
        <input
          className="upload_input"
          type="file"
          onChange={handleFileChange}
          required
        />
      </div> */}

      <div className="form-group">
        <div className="submit-container">
          <MDBBtn className='me-1 submit'>Register</MDBBtn>
        </div>
      </div>
    </form>
  );
}

export default ResearchAssistantRegistration;
