import React, { useState, useEffect } from "react";
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

function createData(user_id, date_of_request, user, type) {
  return { user_id, date_of_request, user, type };
}

function Row(props) {
  const { row, handleApprove, handleReject } = props;

  return (
    <TableRow>
      <TableCell>{row.date_of_request}</TableCell>
      <TableCell>{row.user}</TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleApprove(row)}>
          <CheckCircleOutlineIcon style={{ color: "green" }} />
        </IconButton>
        <IconButton onClick={() => handleReject(row)}>
          <CancelOutlinedIcon style={{ color: "red" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default function ApprovalTable({ registrationRequests }) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const newRows = registrationRequests.map((request) =>
      createData(request.id, request.createdAt, request.user, "User Approval")
    );
    setRows(newRows);
  }, [registrationRequests]);

  const approveUser = async (userId, adminId) => {
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
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response is empty
    const text = await response.text();
    if (!text) {
      // If the response is empty, return null
      return null;
    }

    // If the response is not empty, parse it as JSON
    return text;
  };

  const handleApprove = async (row) => {
    try {
      const adminId = JSON.parse(localStorage.getItem("user")).user.id;
      await approveUser(row.user_id, adminId);
      setRows(rows.filter((r) => r.user_id !== row.user_id));
      alert("User approved successfully");
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  const handleReject = (row) => {
    // Implement logic to handle rejection
    setRows(rows.filter((r) => r.user_id !== row.user_id));
    alert("User rejected successfully");
    // TODO: Attach email service to notify user of rejection
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date of Request</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row
              key={index}
              row={row}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
