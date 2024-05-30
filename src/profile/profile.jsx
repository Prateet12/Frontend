import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBTypography,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './profile.css';

const user = {
  user_name: 'John Doe',
  email: 'john.doe@example.com',
  user_type: 'Practitioner', // Changing this to 'Professor', 'Researcher', or 'Graduate' to see different fields
  image: 'https://via.placeholder.com/150',
  yearsOfExperience: 10,
  organizationType: 'Healthcare',
  industrySector: 'Medical',
  associatedOrganizationName: 'Health Clinic',
  // Adding fields for other user types as necessary
  department: 'Computer Science', // for Professor
  researchInterests: 'Artificial Intelligence', // for Professor
  publications: 'AI Research Papers', // for Professor
  researchArea: 'Machine Learning', // for Researcher
  projects: 'AI Project', // for Researcher
  affiliation: 'University X', // for Researcher
  degreeProgram: 'MSc Computer Science', // for Graduate
  graduationYear: 2022, // for Graduate
  institution: 'University Y' // for Graduate
};

const Profile = () => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1" className="text-center mb-5">YOUR PROFILE</MDBTypography>
      <MDBRow className="justify-content-center">
        <MDBCol md="10">
          <MDBCard className="profile-card">
            <MDBCardBody>
              <MDBRow className="align-items-center">
                <MDBCol md="4" className="text-center">
                  <MDBCardImage
                    src={user.image}
                    alt="User Profile"
                    className="rounded-circle mb-3"
                    style={{ width: '150px' }}
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBTypography tag="h4" className="profile-name">{user.user_name}</MDBTypography>
                  <MDBCardText className="profile-email">{user.email}</MDBCardText>
                  <MDBCardText className="profile-user-type text-muted mb-4">
                    {user.user_type}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <MDBRow className="profile-details mt-4">
                {user.user_type === 'Practitioner' && (
                  <>
                    <MDBCol md="6"><p className="profile-field"><strong>Years of Experience:</strong> {user.yearsOfExperience}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Organization Type:</strong> {user.organizationType}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Industry Sector:</strong> {user.industrySector}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Associated Organization Name:</strong> {user.associatedOrganizationName}</p></MDBCol>
                  </>
                )}
                {user.user_type === 'Professor' && (
                  <>
                    <MDBCol md="6"><p className="profile-field"><strong>Department:</strong> {user.department}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Research Interests:</strong> {user.researchInterests}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Publications:</strong> {user.publications}</p></MDBCol>
                  </>
                )}
                {user.user_type === 'Researcher' && (
                  <>
                    <MDBCol md="6"><p className="profile-field"><strong>Research Area:</strong> {user.researchArea}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Projects:</strong> {user.projects}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Affiliation:</strong> {user.affiliation}</p></MDBCol>
                  </>
                )}
                {user.user_type === 'Graduate' && (
                  <>
                    <MDBCol md="6"><p className="profile-field"><strong>Degree Program:</strong> {user.degreeProgram}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Graduation Year:</strong> {user.graduationYear}</p></MDBCol>
                    <MDBCol md="6"><p className="profile-field"><strong>Institution:</strong> {user.institution}</p></MDBCol>
                  </>
                )}
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profile;
