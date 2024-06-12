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

const Inbox = () => {
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
    <div className="inbox_container">
 <MDBContainer>
      <section className="m-4">
        <h2 className="mb-4">My Documents</h2>
      </section>
      <div className="Inbox_status">
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
              <option value="status">Status </option>
              <option value="uploadDate">Date of Request</option>
          
            </select>
          </div>
        </div>

        <div className="Inbox-table">
          <InboxTable searchTerm={searchTerm} selectedFilter={selectedFilter}/>
        </div>
      </div>
    </MDBContainer>
    </div>
   
  );
};

export default Inbox;
