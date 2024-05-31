import React, { useState } from "react";
import Select from "react-select";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const ProfessorRegistration = ({ registerCallback }) => {
  const [institutionName, setInstitutionName] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      institution_name: institutionName,
      years_of_experience: teachingExperience,
    };
    if (selectedOptions.length > 0) {
      fieldDetails["field_of_study"] = selectedOptions[0].value;
    }
    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails)
  };

  const handleInstitutionNameChange = (e) => {
    setInstitutionName(e.target.value);
  };

  const handleTeachingExperienceChange = (e) => {
    setTeachingExperience(e.target.value);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

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
    { value: "urban_climate_adaption_planning", label: "Urban Climate Adaptation Planning" },
    { value: "urban_carbon_footprint_assessment", label: "Urban Carbon Footprint Assessment" },
    { value: "others", label: "Others" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="institutionName">Enter your institution's name:</label>
        <input
          type="text"
          id="institutionName"
          placeholder="Institution Name"
          value={institutionName}
          className="input_field"
          onChange={handleInstitutionNameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="fieldOfStudy">Field of Specialization:</label>
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          isMulti={true}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="teachingExperience">Enter your years of teaching experience:</label>
        <input
          type="number"
          id="teachingExperience"
          placeholder="Years of Teaching Experience"
          value={teachingExperience}
          className="input_field"
          onChange={handleTeachingExperienceChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="submit-container">
          <MDBBtn className='me-1 submit'>Register</MDBBtn>
        </div>
      </div>
    </form>
  );
};

export default ProfessorRegistration;
