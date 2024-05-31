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
import { useNavigate } from "react-router-dom";
import logo from '../Components/Assets/dummy-logo.png';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const Registration = ({ roles }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  let roleNames = roles.map((role) => role.role);

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
        navigate("/");
        window.alert(
          "Registration successful, please wait for an email to be verified"
        );
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);
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
    <div className="container landingpage">
      <div class="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="app-logo"><img src={logo} alt="logo" /></div>
          <h1 className="heading">Welcome to Urb Clinder</h1>
          <p className="welcometext">Your comprehensive digital repository for urban research and knowledge. Just like Shodhganga, Urb Clinder serves as a one-stop portal for accessing, sharing, and preserving scholarly works and publications focused on urban studies.</p>
          <p className="welcometext">Explore a vast collection of theses, dissertations, and research papers, and contribute to advancing our understanding of urban environments. Join us in fostering a vibrant academic community dedicated to the study of cities and their dynamics.</p>
          <div className="app-stats">
            <div className="stats-data"><span className="stat-title">Thesis: </span><span>145</span></div>
            <div className="stats-data"><span className="stat-title">Synopsis: </span><span>345</span></div>
            <div className="stats-data"><span className="stat-title">Reports: </span><span>35</span></div>
            <div className="stats-data"><span className="stat-title">Members: </span><span>45</span></div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 bg-teal">
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
                className="input_field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Email">Enter your Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="input_field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter your password </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="input_field"
              />
            </div>

            <div className="form-group">
              <select
                id="dropdown-menu"
                value={selectedRole}
                onChange={handleRoleChange}
                className="input_field"
              >
                <option value="">Select your Role</option>
                {roleNames.map(
                  (roleName, index) =>
                    roleName !== "admin" && (
                      <option key={index} value={roleName}>
                        {roleName?.toUpperCase()}
                      </option>
                    )
                )}
              </select>
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default Registration;
