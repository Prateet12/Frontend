import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import logo from "../Components/Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL, HEADER_DATA } from "../utils/baseUrl";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { getAllInstitutes } from "../utils/apiUtils";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS here

const LoginSignup = (props) => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [registeredInstitutes, setRegisteredInstitutes] = useState(
    JSON.parse(localStorage.getItem("institutes")) || []
  );

  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!registeredInstitutes || registeredInstitutes.length <= 1) {
      getAllInstitutes(setRegisteredInstitutes);
    }
  }, []);

  const getRolePermissions = async (roleId, setLoggedIn, setUser, user) => {
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
      console.error("Didn't find role but logged in for now:", error);
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
        getRolePermissions(data.user.role, props.setLoggedIn, props.setUser, data.user);
      } else {
        console.error("Error");
        window.alert("An error occurred. Please try again later.");
      }
    } else {
      window.alert("Invalid email or password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    logIn();
  };

  const handleToggle = () => {
    setAction((prevAction) => (prevAction === "Login" ? "Register" : "Login"));
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  const handleForgotPasswordClick = () => {
    setShowModal(true);
    setForgotPasswordEmail("");
  };

  const handleForgotPasswordSubmit = async () => {
    setForgotPasswordError("");
    
    if (forgotPasswordEmail === "") {
      setForgotPasswordError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgotPasswordEmail)) {
      setForgotPasswordError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    try {
      // Make API call to send verification link (add your API call logic here)
      await fetch(`${BASE_URL}/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      // Close modal after submission
      setShowModal(false);
      window.alert("Verification link has been sent to your email.");
    } catch (error) {
      setForgotPasswordError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container landingpage login">
      <div className="registration-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header_main">
          <div className="text">LOGIN</div>
        </div>
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
            <div className="form-group forgot-password-group">
              <span>Forgot Password?</span> <span id="clickLink" onClick={handleForgotPasswordClick} >Click here!</span>
            </div>
          )}
          <div className="submit-container">
            <MDBBtn className="me-1 submit" type="submit">Login</MDBBtn>
            <MDBBtn className="me-1 submit" onClick={handleRegisterClick}>
              Sign Up
            </MDBBtn>
          </div>
        </form>
      </div>

      <Modal id="forgot-password-modal" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>FORGOT PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="forgotPasswordEmail">Enter your email</label>
            <input
              type="email"
              id="forgotPasswordEmail"
              name="forgotPasswordEmail"
              className="form-control"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            {forgotPasswordError && <label className="errorLabel">{forgotPasswordError}</label>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" disabled={isSubmitting} onClick={handleForgotPasswordSubmit}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginSignup;
