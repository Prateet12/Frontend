import React, { useState } from "react";
import InboxTable from "./inboxTable";
import "./inbox.css"; 
import {
  MDBContainer, 
  MDBTable, 
  MDBTableHead, 
  MDBTableBody, 
  MDBBadge, 
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBIcon,
  MDBCardFooter 
} from 'mdb-react-ui-kit';

const Approval = () => {
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

  return (
    <MDBContainer>
      <section className="m-4">
        <h2 className="mb-4">My Documents</h2>
      </section>
      <div className="approval">
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
              <option >Admin Approved </option>
              <option >Pending</option>
              <option>Rejected</option>
              <option >Super Admin Approved </option>
              <option >Fully Approved </option>
            </select>
          </div>
        </div>

        <div className="approval-table">
          <InboxTable />
        </div>
      </div>
    </MDBContainer>
  );
};

export default Approval;
