import React, { useState } from "react";
import "./Registration.css";
import Select from "react-select";

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
    { value: "Local Body", label: "Local Body" },
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
          className="input_main"
        />
      </div>
      <div className="form-group">
        <label htmlFor="instituteAddress">Institute Address:</label>
        <textarea
          id="instituteAddress"
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
};

export default InstitutesRegistration;
