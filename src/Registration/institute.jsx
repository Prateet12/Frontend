import React, { useState } from "react";
import "./Registration.css";
import Select from "react-select";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const InstitutesRegistration = ({ registerCallback }) => {
  const [instituteName, setInstituteName] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldDetails = {
      instituteName: instituteName,
      instituteType: instituteType,
      instituteAddress: instituteAddress,
    };

    console.log("Field details: ", fieldDetails);
    registerCallback(fieldDetails);
  };

  const handleInstituteNameChange = (e) => {
    setInstituteName(e.target.value);
  }

  const handleInstituteTypeChange = (selectedOption) => {
    setInstituteType(selectedOption.value);
    setSelectedOption(selectedOption);
  };

  const handleInstituteAddressChange = (e) => {
    setInstituteAddress(e.target.value);
  };

  const InstituteOptions = [
    { value: "Government", label: "Government" },
    { value: "Autonomous Institute", label: "Autonomous Institute" },
    { value: "Private", label: "Private" },
    { value: "NGO", label: "NGO" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="InstituteType">Institute Type:</label>
        <Select
          options={InstituteOptions}
          value={selectedOption}
          onChange={handleInstituteTypeChange}
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
          className="input_field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="instituteAddress">Institute Address:</label>
        <textarea
          id="instituteAddress"
          value={instituteAddress}
          className="input_field"
          onChange={handleInstituteAddressChange}
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

export default InstitutesRegistration;
