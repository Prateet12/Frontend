import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalTable from "./ApprovalTable";
import "./Approval.css";

const Approval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [registrationRequests, setRegistrationRequests] = useState([]);

  const getUserRegistrationRequests = async (institutionName) => {
    const response = await fetch(
      "http://localhost:3001/v1/admin/registrationRequests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ institution: institutionName }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const requests = data.requests.map((request) => ({
      id: request.id,
      user: request.user,
      createdAt: new Date(request.created_at).toLocaleDateString(),
    }));

    setRegistrationRequests(requests);
  };

  useEffect(() => {
    // Replace 'Your Institution Name' with the actual institution name
    getUserRegistrationRequests("Your Institution Name").catch((error) => {
      console.error("Failed to fetch registration requests:", error);
    });
  }, []);

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
          <h1>APPROVAL PAGE</h1>
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
                <option value="job_seeker">Document Approval</option>
                <option value="employer">User Approval</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="approval-table">
        <ApprovalTable registrationRequests={registrationRequests}/>
      </div>
    </div>
  );
};

export default Approval;
