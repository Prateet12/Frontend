import "./Dashboard.css";
import React, { useEffect, useState } from "react";
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
} from 'mdb-react-ui-kit';
import avatar1 from '../Components/Assets/avatars/1.jpg';
import avatar2 from '../Components/Assets/avatars/2.jpg';
import avatar3 from '../Components/Assets/avatars/3.jpg';

const Dashboard = ({ user }) => {
  const [title] = useState("Dashboard");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  if (!user) {
    user = localStorage.getItem("user");
    console.log("in dashboard" + user);
  }

  return (
    <MDBContainer>
      <section>
        <h5 className='mb-4'>This month</h5>
        <MDBRow>
          <MDBCol md='4' className='mb-md-0'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <MDBIcon icon='hand-point-up' size='lg' className='text-white fa-fw' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Members</p>
                    <h2 className='mb-0'>
                      42
                      <span className='text-success' style={{ fontSize: '0.875rem' }}>
                        <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                        <span> 12</span>
                      </span>
                    </h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md='4' className='mb-md-0'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <MDBIcon icon='eye' size='lg' className='text-white fa-fw' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Documents</p>
                    <h2 className='mb-0'>
                      226
                      <span className='text-success' style={{ fontSize: '0.875rem' }}>
                        <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                        <span> 45</span>
                      </span>
                    </h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md='4' className='mb-md-0'>
            <MDBCard>
              <MDBCardBody>
                <div className='d-flex align-items-center'>
                  <div className='flex-shrink-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                      <MDBIcon icon='chart-pie' size='lg' className='text-white fa-fw' />
                    </div>
                  </div>
                  <div className='flex-grow-1 ms-4'>
                    <p className='text-muted mb-1'>Institutes</p>
                    <h2 className='mb-0'>
                      345
                      <span className='text-danger' style={{ fontSize: '0.875rem' }}>
                        <MDBIcon icon='arrow-down' className='ms-1' size='sm' />
                        <span> 45</span>
                      </span>
                    </h2>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
      <section className="mt-5">
        <div className='rounded-2 overflow-hidden'>
          <MDBTable responsive striped>
            <MDBTableHead light>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ verticalAlign: 'middle' }}>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={avatar1}
                      alt=''
                      style={{ width: '45px', height: '45px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>John Doe</p>
                      <p className='text-muted mb-0'>john.doe@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>Researcher</p>
                  <p className='text-muted mb-0'>Environmental Science</p>
                </td>
                <td>
                  <MDBBadge light color='success' pill>
                    Active
                  </MDBBadge>
                </td>
                <td>Senior</td>
                <td>
                  <MDBBtn className='fw-bold' color='link' rounded size='sm' rippleColor='dark'>
                    Edit
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={avatar2}
                      className='rounded-circle'
                      alt=''
                      style={{ width: '45px', height: '45px' }}
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>Alex Ray</p>
                      <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>Professor</p>
                  <p className='text-muted mb-0'>Remote Sensing</p>
                </td>
                <td>
                  <MDBBadge light color='primary' pill>
                    Onboarding
                  </MDBBadge>
                </td>
                <td>Junior</td>
                <td>
                  <MDBBtn className='fw-bold' color='link' rounded size='sm' rippleColor='dark'>
                    Edit
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={avatar3}
                      className='rounded-circle'
                      alt=''
                      style={{ width: '45px', height: '45px' }}
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>Kate Hunington</p>
                      <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>Research Assistant</p>
                  <p className='text-muted mb-0'>Air Pollution</p>
                </td>
                <td>
                  <MDBBadge light color='warning' pill>
                    Awaiting
                  </MDBBadge>
                </td>
                <td>Senior</td>
                <td>
                  <MDBBtn className='fw-bold' color='link' rounded size='sm' rippleColor='dark'>
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
};

export default Dashboard;
