import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import "./Registration.css";
import Modal from "@mui/material/Modal";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

  const [emailError, setEmailError] = useState("");

  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const [tellAboutYourself, setTellAboutYourself] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // const [showModal, setShowModal] = useState(false);
  // const [modalContent, setModalContent] = useState("");

  const handleAboutYourselfChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
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
        window.alert(
          "Registration successful, please wait for an email to be verified"
        );
        navigate("/login-signup");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };
  const registerCallback = (fields) => {
    if (formValid) {
      const registrationForm = {
        name: name,
        email: email,
        password: password,
        role: roles.find((role) => role.role === selectedRole).id,
        ...fields,
      };

      register(registrationForm);
    } else {
      alert("Please enter a correct Email ID"); // Inform user to correct form errors
    }
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

  const validateEmail = (email) => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      // setEmailError("Please enter a valid email");
      setFormValid(false); // Set formValid to false if email is invalid
    } else {
      setEmailError(""); // Clear error if email is valid
      setFormValid(true); // Set formValid to true if email is valid
    }
  };

  // const handleRoleChange = (role) => {
  //   setSelectedRole(role);
  //   setShowGraduateOptions(role === "graduate");
  //   setShowResearcherOptions(role === "researcher");
  //   setShowPractitionerOptions(role === "practitioner");
  //   setShowInstituteOptions(role === "institution admin");
  //   setShowAssistantOptions(role === "research assistant");
  //   setShowProfessorOptions(role === "professor");
  // };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setShowGraduateOptions(role === "graduate");
    setShowResearcherOptions(role === "researcher");
    setShowPractitionerOptions(role === "practitioner");
    setShowInstituteOptions(role === "institution admin");
    setShowAssistantOptions(role === "research assistant");
    setShowProfessorOptions(role === "professor");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const roleDescriptions = {
    "institution admin":
      "Institution Administrator: Government, semi-government, private, autonomous, and deemed universities.",
    graduate:
      "Graduate: This category encompasses individuals holding postgraduate degrees such as Master of Science (M.Sc.), Master of Arts (M.A.), Master of Technology (M.Tech.), Doctor of Philosophy (Ph.D.), and postdoctoral researchers.",
    practitioner:
      "Practitioner: This category includes all employees of governmental bodies, non-governmental organizations (NGOs), semi-government organizations, self-help groups (SHGs), and cooperatives.",
    researcher:
      "Researcher: This category comprises research fellows, research associates, and research scientists.",
    professor:
      "Professor: This category consists of individuals engaged in teaching and research activities, including teachers, assistant professors, ad-hoc professors, and full professors.",
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="container landingpage" id="registration">
      <div className="registration-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header_main">
          <div className="text">REGISTER</div>
        </div>
        <Button
          variant="text"
          color="primary"
          onClick={redirectToLoginSignup}
          id="user-btn"
        >
          Already a user?
        </Button>

        <div className="form">
          <div className="form-group">
            <div
              className={`dropdown-container ${
                showDropdown ? "dropdown-open" : ""
              }`}
              ref={dropdownRef}
            >
              <div
                className="dropdown-toggle click-dropdown"
                onClick={handleDropdownToggle}
              >
                {selectedRole ? selectedRole.toUpperCase() : "Select your role"}
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
                              onClick={(e) => {
                                e.preventDefault();
                                handleRoleChange(roleName);
                                //setShowDropdown(false);
                              }}
                            >
                              {roleName.toUpperCase()}{" "}
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="Info"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRole(roleName);
                                }}
                              />
                            </a>
                            {selectedRole === roleName && (
                              <p>{roleDescriptions[roleName]}</p>
                            )}
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
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); // Call validateEmail on change
              }}
              onBlur={(e) => validateEmail(e.target.value)} // Call validateEmail on blur
              className="input_field"
              required
            />
            {emailError && (
              <p className="error" style={{ color: "red" }}>
                {emailError}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Enter your password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_field"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handlePasswordVisibilityToggle}
                className="password-toggle-icon"
              />
            </div>
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
  );
};

export default Registration;
