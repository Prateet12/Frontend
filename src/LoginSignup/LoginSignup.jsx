import React, { useState } from "react";
import "./LoginSignup.css";
import email_icon from "../Components/Assets/email.png";
import password_icon from "../Components/Assets/password.png";
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
    setCurrRole,
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
      setCurrRole(data);
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Didnt find role but logged in for now:", error);
      // TODO(aadijain): clean this up once only users with roles are allowed
      // ALSO remember to make role a required field in user.model
      setLoggedIn(true);
      setUser(user);
      navigate("/dashboard");
    }
  };

  const logIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.user) {
        console.log("logging in through api and data is" + data);
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
          console.log(data);
          localStorage.setItem("user", JSON.stringify({ user: data.user }));
          getRolePermissions(
            data.user.role,
            props.setLoggedIn,
            props.setUser,
            props.setCurrRole,
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
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred. Please try again later.");
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

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
    logIn();
  };

  const handleToggle = () => {
    setAction((prevAction) => (prevAction === "Login" ? "Register" : "Login"));
    navigate(action === "Login" ? "/registration" : "/");
  };

  return (
    <div className="registration-container">
      <h1>{action}</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">
            <img src={email_icon} alt="email icon" className="input_img" />
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
            <img
              src={password_icon}
              alt="password icon"
              className="input_img"
            />
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
          <button
            type="submit"
            className="submit"
            // disabled={isLoading}
          >
            Login
          </button>
          <button type="button" className="submit" onClick={handleToggle}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
