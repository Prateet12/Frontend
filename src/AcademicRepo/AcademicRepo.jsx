import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademicTable from "./AcademicTable";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import './AcademicRepo.css';

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
    // Handle search submit if needed
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="academia_container">
      <MDBContainer>
        <section className="m-4">
          <h2 className="mb-4">Academic Repository</h2>
          <p>
            Welcome to our Academic Repository! We invite you to contribute to
            our growing collection by uploading your theses, research papers,
            and scholarly documents. Join us in expanding access to knowledge
            and fostering academic collaboration.
          </p>
          <hr />
          <p>
            You can share your insights and discoveries with the global academic
            community by uploading your research materials today. Join us in
            advancing knowledge dissemination and empowering others with your
            research contributions.
          </p>
        </section>
        <div className="container_academic">
          <div className="controls m-4 justify-content-between">
           
              <form onSubmit={handleSearchSubmit} className="search_form">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by title..."
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
                  <option value="author">Author Name</option>
                  <option value="institution">Institute</option>
                </select>
              </div>
          
            <MDBBtn
              className="upload_button"
              onClick={() => redirectToUpload()}
            >
              Upload your research
            </MDBBtn>
          </div>
          <div className="grad-table">
            <AcademicTable searchTerm={searchTerm} selectedFilter={selectedFilter} />
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default AcademicRepo;
