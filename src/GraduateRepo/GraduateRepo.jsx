import "./GraduateRepo.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GraduateTable from "./GraduateTable";
import { FaEnvelope } from 'react-icons/fa'; // Import the email icon component

const GraduateRepo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="graduate_repo">
      <div className="container_graduate">
        <div className="header_graduate">
          <h1>MEMBERS</h1>
          <div className="controls">
            <form onSubmit={handleSearchSubmit} className="search_form">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search here"
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
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <h3>
          Welcome to our Graduate Repository, where talent meets opportunity!
        </h3>{" "}
        Explore a diverse array of skilled job seekers and eager employers, all
        poised to embark on their professional journeys. Whether you're seeking
        fresh talent or new career avenues, our repository is your gateway to a
        dynamic marketplace of possibilities.
      </div>
      <div className="grad-table">
        <GraduateTable onEmailClick={handleEmailClick} />
      </div>
    </div>
  );
};

export default GraduateRepo;
