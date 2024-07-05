import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { getAllInstitutes } from "../utils/apiUtils";

const Institute = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortedBy, setSortedBy] = useState(null);
  const [institutes, setInstitutes] = useState([]); // Initialize as an empty array

  const [registeredInstitutes, setRegisteredInstitutes] = useState(
    JSON.parse(localStorage.getItem("institutes")) || []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const redirectToRegister = () => {
    navigate("/registration");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const sortInstitutes = (institutes, criteria) => {
    return institutes.sort((a, b) => {
      let x = (a[criteria] || "").toLowerCase();
      let y = (b[criteria] || "").toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const data = await getAllInstitutes(setRegisteredInstitutes);
        setInstitutes(data || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchInstitutes();
  }, []);

  useEffect(() => {
    if (selectedFilter) {
      setInstitutes((prevInstitutes) => sortInstitutes([...prevInstitutes], selectedFilter));
    }
  }, [selectedFilter]);

  const handleSort = (criteria) => {
    setSortedBy(criteria);
    setInstitutes((prevInstitutes) => sortInstitutes([...prevInstitutes], criteria));
  };

  const filteredInstitutes = searchTerm
    ? institutes.filter((institute) =>
        institute.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : institutes;

  return (
    <div className="academia_container">
      <MDBContainer>
        <section className="m-4">
          <h2 className="mb-4">Institutes</h2>
          <p>
            Welcome to our Institutes Section! Here, all our affiliated
            institutions are seamlessly connected, showcasing their scholarly
            achievements. Explore the diverse research contributions from each
            institute and stay updated on their latest academic endeavors. Join
            us in celebrating the excellence and innovation within our academic
            network.
          </p>
        </section>
        <div className="container_academic">
          <div className="controls m-4 justify-content-between">
            <form onSubmit={handleSearchSubmit} className="search_form">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by institution..."
                className="search_input"
              />
              <MDBBtn className="">
                <MDBIcon fas icon="search" />
                Search
              </MDBBtn>
            </form>
            <MDBBtn className="upload_button" onClick={redirectToRegister}>
              Login-Signup
            </MDBBtn>
          </div>
        </div>
        <section className="mt-5">
          <div className="rounded-2 overflow-hidden">
            <table className="table table-striped">
              <thead>
                <tr>
                <th  style={{ width: "100px" }}>S No.</th> 
                  <th onClick={() => handleSort("institution")}>Institution</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstitutes && filteredInstitutes.length === 0 ? (
                  <tr>
                    <td colSpan={1} align="center">
                      No institutions found
                    </td>
                  </tr>
                ) : (
                  filteredInstitutes && filteredInstitutes.map((institution, index) => (
                    <React.Fragment key={index}>
                      <tr >
                      <td>{index + 1}</td> {/* Serial number column */}
                        <td>
                          <p className="fw-normal mb-1">{institution}</p>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </MDBContainer>
    </div>
  );
};

export default Institute;
