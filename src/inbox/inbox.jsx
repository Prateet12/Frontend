import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalTable from "./inboxTable";
import "./inbox.css"; 

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
    <div className="approval">
      <div className="container_approval">
        <div className="header_approval">
          <h1>INBOX</h1>
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
        </div>
      </div>

      <div className="approval-table">
        <ApprovalTable />
      </div>
    </div>
  );
};

export default Approval;
