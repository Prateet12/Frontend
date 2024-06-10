import React, { useState } from "react";
import "./Registration.css";
import Select from "react-select";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const PractitionersRegistration = ({ registerCallback }) => {
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [selectedOrganizationOption, setSelectedOrganizationOption] = useState(null);
  const [selectedSectorOption, setSelectedSectorOption] = useState(null);
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      years_of_experience: yearsOfExperience,
      company: organizationName,
      industry_sector: selectedSectorOption ? selectedSectorOption.value : null,
      institution_type: selectedOrganizationOption ? selectedOrganizationOption.value : null,
    };

    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails)
  };

  const handleOrgNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setYearsOfExperience(e.target.value);
  };

  const handleOrganizationTypeChange = (selectedOption) => {
    setSelectedOrganizationOption(selectedOption);
  };

  const handleSectorChange = (selectedOption) => {
    setSelectedSectorOption(selectedOption);
  };

  const organizationOptions = [
    { value: "Government", label: "Government" },
    { value: "Autonomous Institute", label: "Autonomous Institute" },
    { value: "Private", label: "Private" },
    { value: "NGO", label: "NGO" },
  ];

  const industrySectorOptions = [
    { value: "Energy", label: "Energy" },
    { value: "Buildings and Construction", label: "Buildings and Construction" },
    { value: "Waste Management", label: "Waste Management" },
    { value: "Water and Wastewater Management", label: "Water and Wastewater Management" },
    { value: "Transportation", label: "Transportation" },
    { value: "Urban Agriculture", label: "Urban Agriculture" },
    { value: "Industry and Manufacturing", label: "Industry and Manufacturing" },
    { value: "Information Technology", label: "Information Technology" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="yearsOfExperience">Years of Experience:</label>
        <input
          type="number"
          id="yearsOfExperience"
          value={yearsOfExperience}
          onChange={handleExperienceChange}
          className="input_field"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="organizationType">Organization Type:</label>
        <Select
          options={organizationOptions}
          className="select"
          value={selectedOrganizationOption}
          onChange={handleOrganizationTypeChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="industry-sector">Industry Sector:</label>
        <Select
          options={industrySectorOptions}
          className="select"
          value={selectedSectorOption}
          onChange={handleSectorChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Name"> Associated Organization Name</label>
        <input
          type="text"
          placeholder="Organization Name"
          value={organizationName}
          onChange={handleOrgNameChange}
          className="input_field"
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

export default PractitionersRegistration;
