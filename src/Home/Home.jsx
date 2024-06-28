import React from "react";
import "./Home.css"; // Importing CSS for styling
import dummyVideo from "./dummy_video.mp4"; // Importing the video file
import logo1 from "./logo1.png";
import logo2 from "./idfcLogo.png";
import { useNavigate } from "react-router-dom";
import twitter from "./twitter.png";
import facebook from "./facebook.png";
import youtube from "./youtube.png";
import instagram from "./instagram.png";

const Home = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login-signup");
  };

  return (
    <div>
      <div className="main" id="home">
        <div className="video-container">
          <video autoPlay muted loop>
            <source src={dummyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="top-section">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <img src={logo1} alt="logo" className="logo1" />
                <div className="right">
                  <img src={logo2} alt="logo2" className="logo2" />
                  {/* <button className="login-btn" onClick={redirectToLogin}>
                    Login/Signup
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="main-text">
            <h1>WELCOME TO UDAY</h1>
            <h4>A one-stop destination for thesis and synopsis.</h4>
            <button className="login-btn" onClick={redirectToLogin}>
                   <span> Login  /  </span><span> Signup </span>
                  </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-home" id="about">
        <div className="container-fluid">
          <div className="row align-items-center ">
            <div className="left-section col-lg-6">
              <div className="education-header text-left">
                <h2 className="about_heading">ABOUT US</h2>
              </div>
              <div className="about-text">
                <p>
                At the Urban Development Alliance for the Youth (UDAY) platform, we unite the strengths of the quadruple helix: academia, industry, government, and civil society to combat climate change impacts in cities. Our goal is for the youth to inherit a sustainable, robust, and resilient urban India. We recognize that solutions for climate challenges often exist within academia and industry but fail to reach where needed due to communication gaps, lack of collaboration, and inadequate knowledge dissemination. UDAY bridges this gap by aggregating demand and supply, facilitating the flow of innovative solutions to urban environments. By fostering collaboration among diverse stakeholders, we drive impactful climate action and sustainable urban development.
                </p>
              </div>
            </div>

            <div className="right-section col-lg-6">
              <div className="about-img">
                <div className="box box1">Thesis: 33</div>
                <div className="box box2">Synopsis: 45</div>
              </div>
              <div className="about-img">
                <div className="box box3">Institutes: 15</div>
                <div className="box box4">Members: 60</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo1} alt="Uday Logo" />
            </div>
            <div className="footer-info">
              <div className="footer-contact">
                <h4>Contact Us</h4>
                <p>Email: information@uday.com</p>
                <p>Phone: +1 (123) 456-7890</p>
              </div>
              <div className="footer-follow">
                <h4>Follow Us</h4>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <img src={facebook} alt="Facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={twitter} alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={youtube} alt="YouTube" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={instagram} alt="Instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="container">
            <p>&copy; 2024 Uday. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
