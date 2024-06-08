import React from 'react';
import './Home.css'; // Importing CSS for styling
import dummyVideo from './dummy_video.mp4'; // Importing the video file
import logo from './logo1.png';

const Home = () => {
  return (
    <div>
      <div className="main" id="home">
        <div className="video-container">
          <video autoPlay muted loop>
            <source src={dummyVideo} type="video/mp4" /> {/* Use the imported video */}
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container-fluid p">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className="main-content">
                <div className="main-text">
                  <h1>WELCOME TO </h1>
                  <h1>URB-CLINDER</h1>
                  <h4>A one-stop destination for thesis and synopsis.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about" id="about">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <div className="education-header text-left">
                  <h2> ABOUT US</h2>
                </div>
                <div className="about-text">
                  <p>
                    Urb-Clinder is a comprehensive digital repository for urban research and knowledge. Just like Shodhganga, we serve a one-stop portal for accessing, sharing, and preserving scholarly works and publications focused on urban studies. Explore a vast collection of theses, dissertations, and research papers, and contribute to advancing our understanding of urban environments. Join us in fostering a vibrant academic community dedicated to the study of cities and their dynamics. Urb-Clinder stands as a beacon for urban scholars, offering an inclusive platform where academia converges to drive innovation and progress in urban studies. Embrace the opportunity to connect with fellow researchers, collaborate on groundbreaking projects, and shape the future of urban discourse together.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
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
              <img src={logo} alt="Urb-Clinder Logo" />
            </div>
            <div className="footer-info">
              <div className="footer-contact">
                <h3>Contact Us</h3>
                <p>Email: info@urbclinder.com</p>
                <p>Phone: +1 (123) 456-7890</p>
              </div>
              <div className="footer-follow">
                <h3>Follow Us</h3>
                <ul className="social-icons">
                  <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="container">
            <p>&copy; 2024 Urb-Clinder. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
