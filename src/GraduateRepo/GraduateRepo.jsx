import "./GraduateRepo.css";
import React,  { useEffect, useState } from "react";
import GraduateTable from "./GraduateTable";
import {
  MDBContainer,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const GraduateRepo = () => {

  const [title] = useState("Members");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

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
    <MDBContainer>
      <section className="m-4">
        <h2 className="mb-4">Members</h2>
        <p>Explore a diverse array of skilled job seekers and eager employers, all
          poised to embark on their professional journeys. Whether you're seeking
          fresh talent or new career avenues, our repository is your gateway to a
          dynamic marketplace of possibilities.
        </p>
      </section>
      <div className="graduate_repo">
        <div className="controls m-4">
          <form onSubmit={handleSearchSubmit} className="search_form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search here"
              className="search_input"
            />
            <MDBBtn className=''>
              <MDBIcon fas icon="search"/>
              Search
            </MDBBtn>
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
        <div className="grad-table">
          <GraduateTable onEmailClick={handleEmailClick} />
        </div>
      </div>
    </MDBContainer>
  );
};

export default GraduateRepo;
