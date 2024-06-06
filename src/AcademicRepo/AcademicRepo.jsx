import "./AcademicRepo.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademicTable from "./AcademicTable";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

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
    <MDBContainer>
      <section className="m-4">
        <h2 className="mb-4">Academic Repository</h2>
        <p>
          Welcome to our Academic Repository! We invite you to contribute to our
          growing collection by uploading your theses, research papers, and
          scholarly documents. Join us in expanding access to knowledge and
          fostering academic collaboration.
        </p>
        <hr></hr>
        <p>
          You can share your insights and discoveries with the global academic
          community by uploading your research materials today. Join us in
          advancing knowledge dissemination and empowering others with your
          research contributions.
        </p>
      </section>
      <div className="container_academic">
        <div className="controls m-4 justify-content-between">
          <div className="d-flex justify-content-between align-content-center">
            <form onSubmit={handleSearchSubmit} className="search_form">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for various thesis and research papers..."
                className="search_input"
              />
              <MDBBtn className="">
                <MDBIcon fas icon="search" />
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
                <option value="Year">Year</option>
                <option value="Author Name">Author Name</option>
                <option value="Institute">Institute</option>
                <option value="Keywords">Keywords</option>
                <option value="specialization">Specialization</option>
                <option value="cities">Cities</option>
              </select>
            </div>
          </div>
          {JSON.parse(localStorage.getItem("role")).permissions.includes(
            "uploadThesis"
          ) && (
            <MDBBtn
              className="upload_button"
              onClick={() => redirectToUpload()}
            >
              Upload your research
            </MDBBtn>
          )}
        </div>
        <div className="grad-table">
          <AcademicTable />
        </div>
      </div>
    </MDBContainer>
  );
};

export default AcademicRepo;
