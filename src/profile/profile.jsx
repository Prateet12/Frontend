import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBTypography,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./profile.css";
import { getCurrentUserRole } from "../utils/apiUtils";

const testUser = {
  user_name: "John Doe",
  email: "john.doe@example.com",
  user_type: "Practitioner", // Changing this to 'Professor', 'Researcher', or 'Graduate' to see different fields
  image: "https://via.placeholder.com/150",
  yearsOfExperience: 10,
  organizationType: "Healthcare",
  industrySector: "Medical",
  associatedOrganizationName: "Health Clinic",
  // Adding fields for other user types as necessary
  department: "Computer Science", // for Professor
  researchInterests: "Artificial Intelligence", // for Professor
  publications: "AI Research Papers", // for Professor
  researchArea: "Machine Learning", // for Researcher
  projects: "AI Project", // for Researcher
  affiliation: "University X", // for Researcher
  degreeProgram: "MSc Computer Science", // for Graduate
  graduationYear: 2022, // for Graduate
  institution: "University Y", // for Graduate
};

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")).user || testUser;
  const currRole =
    JSON.parse(localStorage.getItem("role")).role || testUser.user_type;
  // const [currRole, setRole] = React.useState("");

  // useEffect(() => {
  //   getCurrentUserRole(setRole);
  // }, []);
  return (
    <div className="profile">
      <MDBContainer className="my-5">
        <MDBTypography tag="h1" className="text-center mb-5">
          YOUR PROFILE
        </MDBTypography>
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            <MDBCard className="profile-card">
              <MDBCardBody>
                <MDBRow className="align-items-center">
                  <MDBCol md="4" className="text-center">
                    <MDBCardImage
                      src={testUser.image}
                      alt="User Profile"
                      className="rounded-circle mb-3"
                      style={{ width: "150px" }}
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBTypography tag="h4" className="profile-name">
                      <strong>Name:</strong> {user.name}
                    </MDBTypography>
                    <MDBCardText className="profile-email">
                      <strong>Email:</strong> {user.email}
                    </MDBCardText>
                    <MDBCardText className="profile-user-type text-muted mb-4">
                      <strong>Role:</strong> {currRole}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="profile-details mt-4">
                  {currRole === "practitioner" && (
                    <>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Years of Experience:</strong>{" "}
                          {user.years_of_experience}
                        </p>
                      </MDBCol>
                      {user.industrySector && (
                        <MDBCol md="6">
                          <p className="profile-field">
                            <strong>Industry Sector:</strong>{" "}
                            {user.industry_sector}
                          </p>
                        </MDBCol>
                      )}
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Associated Organization Name:</strong>{" "}
                          {user.company}
                        </p>
                      </MDBCol>
                    </>
                  )}
                  {currRole === "professor" && (
                    <>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Institution name:</strong>{" "}
                          {user.institution_name}
                        </p>
                      </MDBCol>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Field of Specialization:</strong>{" "}
                          {user.field_of_study}
                        </p>
                      </MDBCol>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Years of teaching experience</strong>{" "}
                          {user.years_of_experience}
                        </p>
                      </MDBCol>
                    </>
                  )}
                  {currRole === "researcher" && (
                    <>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Research:</strong>{" "}
                          {user.areas_of_study || user.areas_of_interest}
                        </p>
                      </MDBCol>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Affiliation:</strong> {user.institution_name}
                        </p>
                      </MDBCol>
                    </>
                  )}
                  {currRole === "graduate" && (
                    <>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Degree Program:</strong>{" "}
                          {user.highest_degree_earned}
                        </p>
                      </MDBCol>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Graduation Year:</strong>{" "}
                          {user.graduation_date}
                        </p>
                      </MDBCol>
                      <MDBCol md="6">
                        <p className="profile-field">
                          <strong>Institution:</strong> {user.institution_name}
                        </p>
                      </MDBCol>
                    </>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Profile;
