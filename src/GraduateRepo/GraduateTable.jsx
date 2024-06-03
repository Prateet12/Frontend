import * as React from "react";
import { useState, useEffect } from "react";
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
  MDBCardFooter,
} from "mdb-react-ui-kit";
import avatar1 from "../Components/Assets/avatars/1.jpg";
import { getAllRoles, fetchAllUsers } from "../utils/apiUtils";

const handleMailClick = (email) => {
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink);
};

const getUserOrganization = (user) =>
  user.institution_name || user.company || "N/A";
const getUserPosition = (user, roles) => {
  console.log("Roles:", roles);
  return roles?.find((r) => r.id === user.role).role || "N/A";
};
const getUserSpecialization = (user) =>
  user.field_of_study || user.areas_of_study || "N/A";
const getUserJoinDate = (user) =>
  user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A";

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [tableRoles, setTableRoles] = useState([]);

  useEffect(() => {
    getAllRoles(setTableRoles);
  }, []); // only pre fetching roles

  useEffect(() => {
    fetchAllUsers(setRows);
  }, []); // pre fetching users

  return (
    <section className="mt-5">
      <div className="rounded-2 overflow-hidden">
        <MDBTable responsive striped>
          <MDBTableHead light>
            <tr>
              <th>Name</th>
              <th>Organization</th>
              <th>Position</th>
              <th>Specialization</th>
              <th>Date of Joining</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ verticalAlign: "middle" }}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} align="center">
                  No files in graduate repository
                </td>
              </tr>
            ) : (
              rows.map((user, index) => (
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
                    <p className="fw-normal mb-1">
                      {getUserOrganization(user)}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">
                      {getUserPosition(user, tableRoles)}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-0">
                      {getUserSpecialization(user)}
                    </p>
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
