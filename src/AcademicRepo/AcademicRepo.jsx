import "./AcademicRepo.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademicTable from "./AcademicTable"; 

const AcademicRepo = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const redirectToUpload = () => {
    navigate("/upload-document");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="container_academic">
      <div className="header_academic">
        <h1>ACADEMIC REPOSITORY</h1>
        <div className="controls">
          <form onSubmit={handleSearchSubmit} className="search_form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for various thesis and research papers..."
              className="search_input"
            />
            <button type="submit" className="search_button">
              Search
            </button>
          </form>
          <div className="sort_by">
            <label htmlFor="filter" className="filter_label">
              Sort By:
            </label>
            <select
              id="filter"
              className="filter-dropdown"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Year">Year</option>
              <option value="Author Name">Author Name</option>
              <option value="Institute">Institute</option>
              <option value="Keywords">Keywords</option>
            </select>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="column about">
          <h2>About</h2>
          <p>
            Welcome to our Academic Repository! We invite you to contribute to
            our growing collection by uploading your theses, research papers,
            and scholarly documents. Join us in expanding access to knowledge
            and fostering academic collaboration.
          </p>
        </div>
        <div className="column upload">
          <h2>Upload Your Documents</h2>
          <p>
            Share your insights and discoveries with the global academic
            community by uploading your research materials today. Join us in
            advancing knowledge dissemination and empowering others with your
            research contributions.
          </p>
          <button className="upload_button" onClick={() => redirectToUpload()}>
            Upload
          </button>
        </div>
      </div>
      
{/* 
      <div className="sidebar">
        <div className="google-scholar">
          <div className="scholar">
            Can't find what you're looking for? Dive into the scholarly depths
            with Google Scholar!
          </div>
          <div className="link">
            <a href=" https://scholar.google.com/ "> Google Scholar </a>
          </div>
        </div>
      </div> */}

<AcademicTable />


    </div>
  );
};

export default AcademicRepo;
