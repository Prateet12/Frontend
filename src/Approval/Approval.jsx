import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalTable from "./ApprovalTable";
import "./Approval.css";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { BASE_URL } from "../utils/baseUrl";

const Approval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [uploadRequests, setUploadRequests] = useState([]);

  const getUserRegistrationRequests = async (instituteName) => {
    const response = await fetch(
      `${BASE_URL}/v1/admin/registrationRequests/${instituteName}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const requests = data.requests.map((request) => ({
      id: request.id,
      user: request.user,
      createdAt: new Date(request.created_at).toLocaleDateString(),
      userDetails: request.userDetails,
    }));

    console.log("Registration requests:", requests);

    setRegistrationRequests(requests);
  };

  const getUserDocumentRequests = async (instituteName) => {
    const response = await fetch(
      `${BASE_URL}/v1/admin/uploadRequests/${instituteName}`
    );
    console.log("response",response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("data",data);

    console.log("Upload requests:", data);
    setUploadRequests(data);
  };

  useEffect(() => {
    // Replace 'Your Institution Name' with the actual institution name
    const user = JSON.parse(localStorage.getItem("user")).user;
    const instituteName = user.institution;
    getUserRegistrationRequests(instituteName).catch((error) => {
      console.error("Failed to fetch registration requests:", error);
    });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")).user;
    const instituteName = user.institution;
    getUserDocumentRequests(instituteName).catch((error) => {
      console.error("Failed to fetch document requests:", error);
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
    <div className="approval container_approval">
       <MDBContainer>
      <section className="m-4 approval">
        <h2 className="mb-4">Approve Requests</h2>
      </section>
      {/* <div className="container_approval">
        <div className="controls m-4">
          <form onSubmit={handleSearchSubmit} className="search_form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search here"
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
            </label> */}
            {/* <select
              id="filter"
              className="filter-dropdown"
              value={selectedFilter}
              onChange={handleFilterChange}
            > */}
              {/* <option value="">All</option>
              <option value="job_seeker">Date Of Request</option>
              <option value="employer">User Type</option> */}
            {/* </select>
          </div>
        </div> */}
        <div className="approval-table">
          <ApprovalTable
            registrationRequests={registrationRequests}
            setRegistrationRequests={setRegistrationRequests}
            uploadRequests={uploadRequests}
            setUploadRequests={setUploadRequests}
          />
        </div>
      {/* </div> */}
    </MDBContainer>
    </div>
   
  );
};

export default Approval;
