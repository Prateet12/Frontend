import * as React from "react";
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
import avatar1 from '../Components/Assets/avatars/1.jpg';

const handleMailClick = (email) => {
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink);
};

function createData(
  date_of_joining,
  name,
  email,
  organization,
  position,
  specialization
) {
  return {
    date_of_joining,
    name,
    email,
    organization,
    position,
    specialization,
  };
}

const rows = [
  createData(
    "2020-01-15",
    "John Doe",
    "john.doe@example.com",
    "ABC University",
    "Researcher",
    "Environmental Science"
  ),
  createData(
    "2019-10-15",
    "Emily Johnson",
    "emily.johnson@example.com",
    "University ",
    "Research Assistant",
    "Architecture"
  ),
  createData(
    "2021-07-10",
    "Alice Johnson",
    "alice.johnson@example.com",
    "LMN Ltd",
    "Practitioner",
    "Remote Sensing"
  ),
  createData(
    "2021-05-30",
    "Michael Brown",
    "michael.brown@example.com",
    "PQR Institute",
    "Professor",
    "Bionanotechnology"
  ),
  createData(
    "2022-11-30",
    "Charlie Davis",
    "charlie.davis@example.com",
    "RST Institute",
    "Recent Graduate",
    "Air Pollution "
  ),
];

export default function CollapsibleTable() {
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
          <MDBTableBody style={{ verticalAlign: 'middle' }}>
            {rows.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={avatar1}
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.name}</p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.organization}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.position}</p>
                </td>
                <td>
                  <p className="fw-normal mb-0">{user.specialization}</p>
                </td>
                <td>
                  <p className="fw-normal mb-0">{user.date_of_joining}</p>
                </td>
                <td>
                <MDBIcon
                    far
                    icon="envelope"
                    style={{ cursor: 'pointer', color: '#0d6efd', fontSize: '1.5rem' }}
                    onClick={() => handleMailClick(user.email)}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </section>
  );
}
