import * as React from "react";
import { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import avatar1 from "../Components/Assets/avatars/1.jpg";
import { getAllRoles, fetchAllUsers } from "../utils/apiUtils";

const handleMailClick = (email) => {
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink);
};

const getUserOrganization = (user) => user.institution_name || user.company || "N/A";
const getUserPosition = (user, roles) => roles?.find((r) => r.id === user.role)?.role || "N/A";
const getUserSpecialization = (user) => user.field_of_study || user.areas_of_study || "N/A";
const getUserJoinDate = (user) => user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A";

// Example backup rows (replace with your actual data)
const backup_rows = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    institution_name: "University of Example",
    role: 1,
    field_of_study: "Quantum Computing",
    joinDate: "2024-01-01"
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    company: "Example Corp",
    role: 2,
    areas_of_study: "Deep Learning",
    joinDate: "2023-12-15"
  }
];

export default function GraduateTable({ searchTerm, selectedFilter }) {
  const [rows, setRows] = useState(backup_rows);
  const [tableRoles, setTableRoles] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);

  useEffect(() => {
    // Fetch users and roles
    fetchAllUsers((data) => {
      console.log("Fetched users:", data);
      setRows(data);
    });

    getAllRoles((data) => {
      console.log("Fetched roles:", data);
      setTableRoles(data);
    });
  }, []);

  const sortRows = (rows, criteria) => {
    return rows.sort((a, b) => {
      let x = a[criteria]?.toLowerCase() || "";
      let y = b[criteria]?.toLowerCase() || "";
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
    if (selectedFilter) {
      console.log("Selected filter:", selectedFilter);
      setRows(prevRows => sortRows([...prevRows], selectedFilter));
    }
  }, [selectedFilter]);

  const handleSort = (criteria) => {
    console.log("Sorting by:", criteria);
    setSortedBy(criteria);
    setRows(prevRows => sortRows([...prevRows], criteria));
  };

  const filteredRows = searchTerm
    ? rows.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : rows;

  return (
    <section className="mt-5">
      <div className="rounded-2 overflow-hidden">
        <MDBTable responsive striped>
          <MDBTableHead light>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("institution_name")}>Organization</th>
              <th onClick={() => handleSort("role")}>Position</th>
              <th onClick={() => handleSort("field_of_study")}>Specialization</th>
              <th onClick={() => handleSort("joinDate")}>Date of Joining</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ verticalAlign: "middle" }}>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={6} align="center">No files in graduate repository</td>
              </tr>
            ) : (
              filteredRows.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={avatar1}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{user.name}</p>
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{getUserOrganization(user)}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{getUserPosition(user, tableRoles)}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-0">{getUserSpecialization(user)}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-0">{getUserJoinDate(user)}</p>
                  </td>
                  <td>
                    <MDBIcon
                      far
                      icon="envelope"
                      style={{
                        cursor: "pointer",
                        color: "#0d6efd",
                        fontSize: "1.5rem",
                      }}
                      onClick={() => handleMailClick(user.email)}
                    />
                  </td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </div>
    </section>
  );
}

