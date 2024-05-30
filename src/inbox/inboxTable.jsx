import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

function createData(date_of_request, document_title, status) {
  return { date_of_request, document_title, status };
}

function Row(props) {
  const { row } = props;

  const renderStatusDot = () => {
    let dot = "";
    switch (row.status) {
      case "Pending":
        dot = "🔴";
        break;
      case "Rejected":
        dot = "⚫️";
        break;
      case "Approved by Super Admin":
        dot = "🔵";
        break;
      case "Approved by Institute Admin":
        dot = "🟠";
        break;
      case "Fully Approved":
        dot = "🟢";
        break;
      default:
        dot = "⚪️";
    }
    return (
      <Tooltip title={row.status} arrow>
        <span>{dot}</span>
      </Tooltip>
    );
  };

  return (
    <TableRow>
      <TableCell>{row.date_of_request}</TableCell>
      <TableCell>{row.document_title}</TableCell>
      <TableCell>{renderStatusDot()}</TableCell>
      <TableCell padding="checkbox">
        <IconButton aria-label="edit" onClick={() => alert('Edit document')}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

const rows = [
  createData("2023-01-15", "Document Title 1", "Pending"),
  createData("2023-01-20", "Document Title 2", "Rejected"),
  createData("2023-02-05", "Document Title 3", "Approved by Super Admin"),
  createData("2023-02-10", "Document Title 4", "Approved by Institute Admin"),
  createData("2023-02-15", "Document Title 5", "Pending"),
  createData("2023-03-01", "Document Title 6", "Fully Approved"),
  createData("2023-03-05", "Document Title 7", "Rejected"),
  createData("2023-03-10", "Document Title 8", "Fully Approved"),
];

export default function ApprovalTable() {
  const [rowsState, setRowsState] = useState(rows);

  return (
    <TableContainer component={Paper}>
      <h3>YOUR UPLOAD HISTORY</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date of Request</TableCell>
            <TableCell>Document Title</TableCell>
            <TableCell>Current Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsState.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
