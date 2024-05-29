import React, { useState } from 'react';
import "./researcher-register.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection

const ResearcherRegistration = ({ registerCallback }) => {
  const navigate = useNavigate(); 

  const [highestDegreeObtained, setHighestDegreeObtained] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [resume, setResume] = useState(null);
  const [instituteName, setInstituteName] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [instituteType, setInstituteType] = useState("");

  const InstituteOptions = [
    { value: "Government", label: "Government" },
    { value: "Local Body", label: "Local Body" },
    { value: "Private", label: "Private" },
    { value: "NGO", label: "NGO" },
  ];

  const handleInstituteNameChange = (e) => {
    setInstituteName(e.target.value);
  }

  const handleInstituteTypeChange = (selectedOption) => {
    console.log("Selected option: ", selectedOption);
    setInstituteType(selectedOption);
    // setSelectedOption(selectedOption);
  };

  const handleInstituteAddressChange = (e) => {
    setInstituteAddress(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Make an array of all the selected option values
    const areasOfStudy = selectedOptions.map((option) => option.value);
    const fieldDetails = {
      highest_degree_earned: highestDegreeObtained,
      institution_name: instituteName,
      institution_type: instituteType.value,
      institution_address: instituteAddress,
    };
    if (areasOfStudy.length > 0) {
      fieldDetails["areas_of_study"] = areasOfStudy;
    }

    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails)
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const options = [
    { value: "environmental_science", label: "Environmental Science" },
    { value: "meteorology", label: "Meteorology" },
    { value: "air_pollution_science", label: "Air Pollution Science" },
    { value: "architecture", label: "Architecture" },
    { value: "building_engineering", label: "Building Engineering" },
    { value: "urban_geography", label: "Urban Geography" },
    { value: "urban_planning_and_design", label: "Urban Planning and Design" },
    { value: "climate_science", label: "Climate Science" },
    { value: "remote_sensing", label: "Remote Sensing" },
    { value: "geographic_information_system", label: "Geographic Information System" },
    { value: "energy_efficiency_and_urban_sustainability", label: "Energy Efficiency and Urban Sustainability" },
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
      <div className="form-group">
        <label htmlFor="research-areas">Research Areas:</label>
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          isMulti={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="InstituteType">Institute Type:</label>
        <Select
          options={InstituteOptions}
          value={instituteType}
          onChange={handleInstituteTypeChange}
          isMulti={false}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Name">Institution Name</label>
        <input
          type="text"
          placeholder="Name of Institute"
          value={instituteName}
          onChange={handleInstituteNameChange}
          className="input_main"
        />
      </div>
      <div className="form-group">
        <label htmlFor="instituteAddress">Institute Address:</label>
        <textarea
          id="institute Address"
          value={instituteAddress}
          onChange={handleInstituteAddressChange}
          required
        />
      </div>
      <div className="form-group">
        <div className="submit-container">
          <button type="submit" className="submit">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default ResearcherRegistration;
