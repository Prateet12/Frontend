import React, { useState } from "react";
import "./LoginSignup.css";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import logo from "../Components/Assets/dummy-logo.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL, HEADER_DATA } from "../utils/baseUrl";

import useSignIn from "react-auth-kit/hooks/useSignIn";

const LoginSignup = (props) => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  // Local state
  const [action, setAction] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const getRolePermissions = async (
    roleId,
    setLoggedIn,
    setUser,
    user
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/v1/role/${roleId}`, {
        headers: HEADER_DATA,
      });
      const data = await response.json();
      localStorage.setItem("role", JSON.stringify(data));
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Didnt find role but logged in for now:", error);
    }
  };

  const logIn = async () => {
    const response = await fetch(`${BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      window.alert("An error occurred: " + data.error);
      return;
    }

    const data = await response.json();

    if (data.user) {
      if (
        signIn({
          auth: {
            token: data.tokens.access,
            type: "Bearer",
          },
          refresh: data.tokens.refresh,
          userState: data.user,
        })
      ) {
        console.log("Logged in successfully");
        localStorage.setItem("user", JSON.stringify({ user: data.user }));
        getRolePermissions(
          data.user.role,
          props.setLoggedIn,
          props.setUser,
          data.user
        );
      } else {
        // throw an error
        console.error("Error");
        window.alert("An error occurred. Please try again later.");
      }
    } else {
      window.alert("Invalid email or password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    logIn();
  };

  const handleToggle = () => {
    setAction((prevAction) => (prevAction === "Login" ? "Register" : "Login"));
    navigate(action === "Login" ? "/registration" : "/");
  };

  return (
    <div className="container landingpage">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="app-logo">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="heading">Welcome to Urb-Clinder</h1>
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
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 bg-teal border-radius-1">
          <div className="registration-container">
            <h1>{action}</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">
                  <MDBIcon fas icon="envelope" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input_field"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <label className="errorLabel">{emailError}</label>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <MDBIcon fas icon="lock" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input_field"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <label className="errorLabel">{passwordError}</label>
              </div>
              {action === "Login" && (
                <div className="form-group forgot-password">
                  Forgot Password? <span id="clickLink">Click here!</span>
                </div>
              )}
              <div className="submit-container">
                <MDBBtn className="me-1 submit">Login</MDBBtn>
                <MDBBtn className="me-1 submit" onClick={handleToggle}>
                  Register
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
