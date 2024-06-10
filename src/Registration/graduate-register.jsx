import React, { useState } from "react";
import "./graduate-register.css";
import Select from "react-select";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";

const GraduateRegistration = ({ registerCallback, institutes }) => {
  const [degreeProgram, setDegreeProgram] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      highest_degree_earned: degreeProgram,
      field_of_study: fieldOfStudy.value,
      graduation_date: graduationYear,
      institution_name: selectedInstitute,
    };
    
    registerCallback(fieldDetails);
  };

  const handleChange = (selectedField) => {
    setFieldOfStudy(selectedField);
  };

  const options = [
    { value: "environmental_science", label: "Environmental Science" },
    { value: "meteorology", label: "metereology" },
    { value: "air_pollution_science", label: "Air Pollution Science" },
    { value: "Architecture", label: "Architecture" },
    { value: "building_engineering ", label: "Building engineering " },
    { value: "urban_geography", label: "Urban Geography" },
    { value: "urban_planning_and_design", label: "Urban planning and Design" },
    { value: "cimate_science", label: "Climate Science" },
    { value: "remote_sensing", label: "Remote Sensing" },
    {
      value: "geographic_information_system",
      label: "Geographic Information System",
    },
    {
      value: "energy_efficiency_and_urban_sustainibility",
      label: "Energy efficiency and Urban Sustainability",
    },
    {
      value: "urban_transportation_and_mobility",
      label: "Urban Transportation and Mobility",
    },
    {
      value: "urban_data_science_and_modelling",
      label: "Urban Data Science and Modelling ",
    },
    {
      value: "urban_disaster_risk_reduction",
      label: "Urban disaster Risk Reduction",
    },
    {
      value: "urban_climate_adaption_planning ",
      label: "Urban climate Adaption Planning ",
    },
    {
      value: "urban_carbon_footprint_assessment ",
      label: "Urban Carbon Footprint Assessment",
    },
    { value: "others  ", label: "Others" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="form-group">
          <label htmlFor="institute">Institute:</label>
          <select
            id="institute"
            className="upload_input"
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            required
          >
            <option value="">Select an institute</option>
            {institutes.map((institute, index) => (
              <option value={institute} key={institute}>{institute}</option>
            ))}
          </select>
        </div>
        <label htmlFor="degreeProgram">Degree/Program:</label>
        <select
          id="degreeProgram"
          className="upload_input"
          value={degreeProgram}
          onChange={(e) => setDegreeProgram(e.target.value)}
          required
        >
          <option value="">Select a degree program</option>
          <option value="PhD">PhD</option>
          <option value="Masters">Master's</option>
          <option value="Bachelors">Bachelor's</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fieldOfStudy">Field of Study:</label>
        
        <Select
          options={options} 
         className="select"
          value={fieldOfStudy}
          onChange={(selectedFieldOfStudy) => {
            handleChange(selectedFieldOfStudy) ;
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="graduationYear">Graduation Year:</label>
        <div className="graduation-date-input">
          <input
            type="month"
            id="graduationYear"
            value={graduationYear}
            onChange={(e) => {
              setGraduationYear(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="submit-container">
          <MDBBtn className="me-1 submit">Register</MDBBtn>
        </div>
      </div>
    </form>
  );
};

export default GraduateRegistration;
