import React, { useState } from "react";
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

function createData(date_of_request, user, type) {
  return { date_of_request, user, type };
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

const rows = [
  createData("2023-01-15", "John Doe", "Document Approval"),
  createData("2023-01-20", "Emily Johnson", "User Approval"),
  createData("2023-02-05", "Alice Johnson", "Document Approval"),
  createData("2023-02-10", "Michael Brown", "User Approval"),
  createData("2023-02-15", "Charlie Davis", "Document Approval"),
  createData("2023-03-01", "Sarah Smith", "User Approval"),
  createData("2023-03-05", "Emma Wilson", "Document Approval"),
  createData("2023-03-10", "William Johnson", "User Approval"),
];

export default function ApprovalTable() {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleApprove = (row) => {
    // Implement logic to handle approval
    console.log("Approved:", row);
  };

  const handleReject = (row) => {
    // Implement logic to handle rejection
    console.log("Rejected:", row);
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
