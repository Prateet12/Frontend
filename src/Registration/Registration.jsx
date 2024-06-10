import "./Registration.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GraduateRegistration from "./graduate-register";
import ResearcherRegistration from "./researcher-register";
import PractitionerRegistration from "./practitioners";
import InstitutesRegistration from "./institute";
import ResearchAssistantRegistration from "./researchAssistants";
import ProfessorRegistration from "./professors";
import Button from "@mui/material/Button";
import { BASE_URL } from "../utils/baseUrl";
import logo from "../Components/Assets/logo.png";
import { getAllRoles, getAllInstitutes } from "../utils/apiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Registration = ({ setLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState(
    JSON.parse(localStorage.getItem("roles")) || []
  );
  const [institutes, setInstitutes] = useState(
    JSON.parse(localStorage.getItem("institutes")) || []
  );

  const navigate = useNavigate();
  const [tellAboutYourself, setTellAboutYourself] = useState("");
  const [error, setError] = useState("");

  const handleAboutYourselfChange = (e) => {
    const text = e.target.value;
    // Split the text by spaces to count words
    const words = text.trim().split(/\s+/);
    // Limit the text to 30 words
    if (words.length <= 30) {
      setTellAboutYourself(text);
      setError("");
    } else {
      setError("Please limit your response to 30 words.");
    }
  };

  const redirectToLoginSignup = () => {
    navigate("/login-signup");
  };

  useEffect(() => {
    if (!roles || roles.length <= 1) {
      getAllRoles(setRoles);
    }
  }, []);

  useEffect(() => {
    getAllInstitutes(setInstitutes); 
  }, []);
  

  

  let roleNames = roles.map((role) => role.role);

  const register = async (formDetails) => {
    if (
      !formDetails.name ||
      !formDetails.email ||
      !formDetails.password ||
      !formDetails.role
    ) {
      alert("All fields are required");
      return;
    }
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
        // Assume registration was successful and log in the user
        //setLoggedIn(true);
        //sessionStorage.setItem("loggedIn", JSON.stringify(true));
        
        window.alert(
          "Registration successful, please wait for an email to be verified"
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const registerCallback = (fields) => {
    const registrationForm = {
      name: name,
      email: email,
      password: password,
      role: roles.find((role) => role.role === selectedRole).id,
      ...fields,
    };

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

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setShowGraduateOptions(role === "graduate");
    setShowResearcherOptions(role === "researcher");
    setShowPractitionerOptions(role === "practitioner");
    setShowInstituteOptions(role === "institution admin");
    setShowAssistantOptions(role === "research assistant");
    setShowProfessorOptions(role === "professor");
  };

  let registrationOptions;
  switch (selectedRole) {
    case "graduate":
      registrationOptions = (
        <GraduateRegistration
          registerCallback={registerCallback}
          institutes={institutes}
        />
      );
      break;
    case "researcher":
      registrationOptions = (
        <ResearcherRegistration
          registerCallback={registerCallback}
          institutes={institutes}
        />
      );
      break;
    case "practitioner":
      registrationOptions = (
        <PractitionerRegistration registerCallback={registerCallback} />
      );
      break;
    case "institution admin":
      registrationOptions = (
        <InstitutesRegistration registerCallback={registerCallback} />
      );
      break;
    case "research assistant":
      registrationOptions = (
        <ResearchAssistantRegistration registerCallback={registerCallback} />
      );
      break;
    case "professor":
      registrationOptions = (
        <ProfessorRegistration
          registerCallback={registerCallback}
          institutes={institutes}
        />
      );
      break;
    default:
      registrationOptions = null;
  }
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
    <div className="container landingpage">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="heading">Welcome to UDAY</h1>
          <p className="welcometext">
            Your comprehensive digital repository for urban research and
            knowledge. Just like Shodhganga, Urb Clinder serves as a one-stop
            portal for accessing, sharing, and preserving scholarly works and
            publications focused on urban studies.
          </p>
          <p className="welcometext">
            Explore a vast collection of theses, dissertations, and research
            papers, and contribute to advancing our understanding of urban
            environments. Join us in fostering a vibrant academic community
            dedicated to the study of cities and their dynamics.
          </p>
          <div className="app-stats">
            <div className="stats-data">
              <span className="stat-title">Thesis: </span>
              <span>145</span>
            </div>
            <div className="stats-data">
              <span className="stat-title">Synopsis: </span>
              <span>345</span>
            </div>
            <div className="stats-data">
              <span className="stat-title">Reports: </span>
              <span>35</span>
            </div>
            <div className="stats-data">
              <span className="stat-title">Members: </span>
              <span>45</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 bg-teal">
          <div className="registration-container">
            <div className="header_main">
              <div className="text">REGISTER</div>
            </div>
            <Button
              variant="text"
              color="primary"
              onClick={redirectToLoginSignup}
            >
              Already a user?
            </Button>

            <div className="form">
              <div className="form-group">
                <div
                  className={`dropdown-container ${
                    showDropdown ? "dropdown-open" : ""
                  }`}
                >
                  <div
                    className="dropdown-toggle click-dropdown"
                    onClick={handleDropdownToggle}
                  >
                    {selectedRole
                      ? selectedRole.toUpperCase()
                      : "Select your role"}
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu dropdown-bordered">
                      <ul>
                        {roleNames.map(
                          (roleName, index) =>
                            roleName !== "admin" && (
                              <li key={index}>
                                <a
                                  href="#"
                                  onClick={() => {
                                    handleRoleChange(roleName);
                                    setShowDropdown(false);
                                  }}
                                >
                                  {roleName.toUpperCase()}{" "}
                                  <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    className=" Info"
                                  />
                                </a>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Name">Enter your full name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                  className="input_field"
                  required
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Enter your password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input_field"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tellAboutYourself">
                  Tell me about yourself (max 30 words):
                </label>
                <textarea
                  id="tellAboutYourself"
                  value={tellAboutYourself}
                  onChange={handleAboutYourselfChange}
                  className="input_field"
                  required
                />
                {error && (
                  <p className="error" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
              </div>

              {showGraduateOptions && (
                <GraduateRegistration
                  registerCallback={registerCallback}
                  institutes={institutes}
                />
              )}

              {showResearcherOptions && (
                <ResearcherRegistration
                  registerCallback={registerCallback}
                  institutes={institutes}
                />
              )}

              {showPractitionerOptions && (
                <PractitionerRegistration registerCallback={registerCallback} />
              )}

              {showInstituteOptions && (
                <InstitutesRegistration registerCallback={registerCallback} />
              )}

              {showAssistantOptions && (
                <ResearchAssistantRegistration
                  registerCallback={registerCallback}
                />
              )}

              {showProfessorOptions && (
                <ProfessorRegistration
                  registerCallback={registerCallback}
                  institutes={institutes}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
