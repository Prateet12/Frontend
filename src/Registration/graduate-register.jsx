import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./graduate-register.css";
import Select from "react-select";
import { set } from "react-hook-form";

const GraduateRegistration = ({ registerCallback }) => {

  const [degreeProgram, setDegreeProgram] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      "highest_degree_earned": degreeProgram,
      "field_of_study": fieldOfStudy.value,
      // TODO(aadijain): change this to create an actual file upload object
      "graduation_date": graduationYear,
    };

    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails);
    // TODO(team): navigate("/graduate-success"); - success page make
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
          value={fieldOfStudy}
          onChange={(selectedFieldOfStudy) => {
            handleChange(selectedFieldOfStudy);
          }}
        />
      </div>

      {/* <div className="form-group">
        <label htmlFor="resume">Resume:</label>
        <input
          className="upload_input"
          type="file"
          // {...("thesisDocument", { required: true })}
        />
      </div> */}
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
      {/* TODO(roshni):
       * Make each child component have the registration and login buttons instead of parent 
        and just call back to the parent registration page
      */}
      <div className="form-group">
          <div className="submit-container">
            <button className="submit " type="submit">
              Register
            </button>
          </div>
        </div>
    </form>
  );
};

export default GraduateRegistration;
