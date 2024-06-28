import "./Dashboard.css";
import { getStats } from "../utils/apiUtils";
import React, { useEffect, useState } from "react";
import DocumentsTable from "../inbox/inboxTable";
import ApprovalTable from "../Approval/ApprovalTable";
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
} from "mdb-react-ui-kit";
import avatar1 from "../Components/Assets/avatars/1.jpg";
import avatar2 from "../Components/Assets/avatars/2.jpg";
import avatar3 from "../Components/Assets/avatars/3.jpg";
import { BASE_URL } from "../utils/baseUrl";


const Dashboard = ({ user }) => {
  const [title] = useState("Dashboard");
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    let stats = await getStats();
    console.log(stats);
    setStats((prev) => {
      return { ...stats };
    });
  };

  useEffect(() => {
    document.title = title;
    fetchStats();
  }, [title]);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
    console.log("In dashboard, user:", user);
  }

  const role = user?.role?.toLowerCase() || "";
  console.log("Role:", role);

  if (!role) {
    console.error("Role is undefined or empty. Check the user object.");
  }

  return (
    <div className="dashboard_container">
      <MDBContainer>
        <section>
          <h5 className="mb-4">This month</h5>
          <MDBRow>
            <MDBCol md="4" className="mb-md-0">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary rounded-4 shadow-2-strong">
                        <MDBIcon icon="hand-point-up" size="lg" className="text-white fa-fw" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <p className="text-muted mb-1">Members</p>
                      <h2 className="mb-0">
                        {stats.members}
                        <span className="text-success" style={{ fontSize: "0.875rem" }}>
                          {/* <MDBIcon icon='arrow-up' className='ms-1' size='sm' /> */}
                          {/* <span> 12</span> */}
                        </span>
                      </h2>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary rounded-4 shadow-2-strong">
                        <MDBIcon icon="eye" size="lg" className="text-white fa-fw" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <p className="text-muted mb-1">Documents</p>
                      <h2 className="mb-0">
                        {stats.files}
                        <span className="text-success" style={{ fontSize: "0.875rem" }}>
                          {/* <MDBIcon icon='arrow-up' className='ms-1' size='sm' /> */}
                          {/* <span> 45</span> */}
                        </span>
                      </h2>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary rounded-4 shadow-2-strong">
                        <MDBIcon icon="chart-pie" size="lg" className="text-white fa-fw" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <p className="text-muted mb-1">Institutes</p>
                      <h2 className="mb-0">
                        {stats.institutes}
                        <span className="text-danger" style={{ fontSize: "0.875rem" }}>
                          {/* <MDBIcon icon='arrow-down' className='ms-1' size='sm' /> */}
                          {/* <span> 45</span> */}
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
          <div className="rounded-2 overflow-hidden">
            {role === "admin" || role === "institution_admin" ? (
              <ApprovalTable />
            ) : (
              <DocumentsTable />
            )}
          </div>
        </section>
      </MDBContainer>
    </div>
  );
};

export default Dashboard;
