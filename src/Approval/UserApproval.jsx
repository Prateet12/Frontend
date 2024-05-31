import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// UserDetailsModal component
function UserDetailsModal({ open, handleClose, user }) {
  if (!user) return null;

  console.log("user details in modal", user.userDetails.field_of_study);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  let modalContent;

  switch (
    user.role // Role-based rendering
  ) {
    case "graduate":
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Graduate Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Degree Program:</strong> {user.degreeProgram}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Graduation Year:</strong> {user.graduationYear}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Institution Name:</strong> {user.institutionName}
          </Typography>
        </>
      );
      break;
    case "practitioner":
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Practitioner Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Years of Experience:</strong> {user.yearsOfExperience}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Organization Type:</strong> {user.organizationType}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Industry Sector:</strong> {user.industrySector}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Associated Organization Name:</strong>{" "}
            {user.associatedOrganizationName}
          </Typography>
        </>
      );
      break;
    case "Professor":
      console.log("user in professor", user.userDetails);
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Professor Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Institution Name:</strong>{" "}
            {user.userDetails.institution_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Field of Specialization:</strong>{" "}
            {user.userDetails.field_of_study}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Years of Teaching:</strong>{" "}
            {user.userDetails.years_of_experience}
          </Typography>
        </>
      );
      break;
    case "Researcher":
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Researcher Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Highest Degree:</strong>{" "}
            {user.userDetails.highest_degree_earned}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Research Areas:</strong> {user.userDetails.areas_of_study}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Organization Name:</strong>{" "}
            {user.userDetails.institution_name}
          </Typography>
        </>
      );
      break;
    case "Researcher":
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Research Assistant Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Highest Degree:</strong> {user.highestDegree}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Research Areas:</strong> {user.researchAreas}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Organization Name:</strong> {user.organizationName}
          </Typography>
        </>
      );
      break;
    case "Institution Admin":
      modalContent = (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Institution Admin Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Institution Name:</strong> {user.userDetails.institution}
          </Typography>
        </>
      );
      break;
    default:
      modalContent = null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalContent}
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

// Row component for UserApproval
function UserRow({ row, handleApprove, handleReject, handleView }) {
  let requestType = row.request_type;
  if (requestType !== "Admin Registration") {
    requestType = row.role + " Registration";
  }
  return (
    <TableRow>
      <TableCell>{row.createdAt}</TableCell>
      <TableCell>{row.user}</TableCell>
      <TableCell>{requestType}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleApprove(row)}>
          <CheckCircleOutlineIcon style={{ color: "green" }} />
        </IconButton>
        <IconButton onClick={() => handleReject(row)}>
          <CancelOutlinedIcon style={{ color: "red" }} />
        </IconButton>
        <IconButton onClick={() => handleView(row)}>
          <VisibilityIcon style={{ color: "blue" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// UserApproval component
const UserApproval = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rows, setRows] = useState([]);
  console.log("rows in user approval", rows);
  const roles = props.roles;
  console.log("roles in user approval", roles);

  useEffect(() => {
    setRows(props.registrationRequests);
  }, [props.registrationRequests]);

  const setRole = (user) => {
    user.role = roles.find((r) => r.id === user.userDetails.role).role;
    user.role = user.role
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return user;
  };

  const handleOpen = (user) => {
    setSelectedUser(setRole(user));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const approveRegistration = async (userId) => {
    const adminId = JSON.parse(localStorage.getItem("user")).user.id;
    const instituteName = JSON.parse(localStorage.getItem("user")).user.institution;
    console.log("adminId and userId: ", adminId + " ", userId);
    try {
      const response = await fetch(
        "http://localhost:3001/v1/admin/approveRegistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            admin: adminId,
            instituteName: instituteName,
          }),
        }
      );
      const data = await response.text();

      if (!response.ok) {
        window.alert("Failed to approve registration: " + data);
        // throw new Error(data.message || "Could not approve registration.");
      }

      return data;
    } catch (error) {
      console.error("Failed to approve registration: " + error);
    }
  };

  const rejectRegistration = async (userId) => {
    const adminId = JSON.parse(localStorage.getItem("user")).user.id;
    console.log("adminId and userId: ", adminId + " ", userId);
    try {
      const response = await fetch(
        "http://localhost:3001/v1/admin/rejectRegistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            admin: adminId,
          }),
        }
      );
      const data = await response.text();

      if (!response.ok) {
        throw new Error(data.message || "Could not reject registration.");
      }

      return data;
    } catch (error) {
      console.error("Failed to reject registration: " + error);
      window.alert("Failed to reject registration: " + error);
    }
  };

  const handleApprove = async (row) => {
    approveRegistration(row.id);
    setRows((rows) => rows.filter((r) => r.id !== row.id));
    window.alert("Approved");
  };

  const handleReject = (row) => {
    rejectRegistration(row.id);
    setRows((rows) => rows.filter((r) => r.id !== row.id));
    window.alert("Rejected");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date of Request</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>User Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No requests to process
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <UserRow
                key={index}
                row={setRole(row)}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleView={handleOpen}
              />
            ))
          )}
        </TableBody>
      </Table>
      <UserDetailsModal
        open={open}
        handleClose={handleClose}
        user={selectedUser}
      />
    </TableContainer>
  );
};

export default UserApproval;
