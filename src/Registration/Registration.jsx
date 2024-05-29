import "./Registration.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GraduateRegistration from "./graduate-register";
import ResearcherRegistration from "./researcher-register";
import PractitionerRegistration from "./practitioners";
import InstitutesRegistration from "./institute";
import ResearchAssistantRegistration from "./researchAssistants";
import ProfessorRegistration from "./professors";
import Button from "@mui/material/Button";
import { BASE_URL } from "../utils/baseUrl";

const Registration = ({ setCurrRole, setUser, setLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState(
    () => JSON.parse(localStorage.getItem("roles")) || []
  );

  let roleNames = roles.map((role) => role.role);
  console.log("Role names: ", roleNames);

  // getAllRoles from API and set it in the state for user to use
  const getAllRoles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/role`);

      if (!response || !response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("roles from api in app.js are" + data);
      setRoles(data);
      localStorage.setItem("roles", JSON.stringify(roles));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Pre fetch all the roles and store it in the local storage
    console.log("Roles from local storage", roles);
    if (!roles || roles.length <= 1) {
      // TODO(team): check, this is re rendering on reload
      console.log("Fetching roles from API");
      getAllRoles();
    }
  }, []);

  const register = async (formDetails) => {
    try {
      console.log("Registering user with details:", formDetails);
      const response = await fetch(`${BASE_URL}/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      }).catch((error) => {
        console.error("Registration Error:", error);
        throw new Error("Registration failed");
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const new_user = await response.json();
      if (new_user) {
        console.log("New user:", new_user);
        window.alert("Registration successful, please wait for an email to be verified");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const registerCallback = (fields) => {
    console.log("Registering user with fields:", fields);
    const registrationForm = {
      name: name,
      email: email,
      password: password,
      role: roles.find((role) => role.role === selectedRole).id,
      ...fields,
    };

    console.log("Registration form:", registrationForm);
    register(registrationForm);
  };

  const [showGraduateOptions, setShowGraduateOptions] = useState(false);
  const [showResearcherOptions, setShowResearcherOptions] = useState(false);
  const [showPractitionerOptions, setShowPractitionerOptions] = useState(false);
  const [showInstituteOptions, setShowInstituteOptions] = useState(false);
  const [showAssistantOptions, setShowAssistantOptions] = useState(false);
  const [showProfessorOptions, setShowProfessorOptions] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);

    setShowAdminOptions(value === "admin");
    setShowGraduateOptions(value === "graduate");
    setShowResearcherOptions(value === "researcher");
    setShowPractitionerOptions(value === "practitioner");
    setShowInstituteOptions(value === "institution admin");
    setShowAssistantOptions(value === "research assistant");
    setShowProfessorOptions(value === "professor");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="registration-container">
      <div className="header_main">
        <div className="text">REGISTER</div>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="text" color="primary">
          Already a user?
        </Button>
      </Link>
      <div className="form">
        <div className="form-group">
          <label htmlFor="Name">Enter your full name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="input_main"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Email">Enter your Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="input_main"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter your password </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="input_main"
          />
        </div>

        <div className="form-group">
          <select
            id="dropdown-menu"
            value={selectedRole}
            onChange={handleRoleChange}
            className="input_main"
          >
            <option value="">Select your Role</option>

            {/* <option value="Practitioners">Practitioners</option>
            <option value="Researchers">Researchers</option>
            <option value="Recent Graduates">Recent Graduates</option>
            <option value="Research Assistants">Research Assistants</option>
            <option value="Professor">Professor</option>
            <option value="Institution level Admins">
              Institution level Admins
            </option> */}

            {roleNames.map((roleName, index) => (
              <option key={index} value={roleName}>
                {roleName?.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        {showAdminOptions && (
          // Just show register button and add callback
          <form
            onSubmit={(event) => {
              event.preventDefault();
              registerCallback({});
            }}
          >
            <div className="form-group">
              <div className="submit-container">
                <button className="submit " type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        )}

        {showGraduateOptions && (
          <GraduateRegistration registerCallback={registerCallback} />
        )}

        {showResearcherOptions && (
          <ResearcherRegistration registerCallback={registerCallback} />
        )}

        {showPractitionerOptions && (
          <PractitionerRegistration registerCallback={registerCallback} />
        )}

        {showInstituteOptions && (
          <InstitutesRegistration registerCallback={registerCallback} />
        )}

        {showAssistantOptions && (
          <ResearchAssistantRegistration registerCallback={registerCallback} />
        )}

        {showProfessorOptions && (
          <ProfessorRegistration registerCallback={registerCallback} />
        )}
      </div>
    </div>
  );
};

export default Registration;
