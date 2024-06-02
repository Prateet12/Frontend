import React, { useEffect, useState } from "react";
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
import { getAllUserFiles } from "../utils/apiUtils";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBBadge,
} from "mdb-react-ui-kit";

function createData(createdAt, title, status) {
  return { createdAt, title, status };
}

const rows = [
  createData("2023-01-15", "Document Title 1", "Pending"),
  createData("2023-01-20", "Document Title 2", "Rejected"),
  createData("2023-02-05", "Document Title 3", "Approved by Admin"),
  createData("2023-02-10", "Document Title 4", "Approved by Institute Admin"),
  createData("2023-02-15", "Document Title 5", "Pending"),
  createData("2023-03-01", "Document Title 6", "Approved"),
  createData("2023-03-05", "Document Title 7", "Rejected"),
  createData("2023-03-10", "Document Title 8", "Approved"),
];

export default function InboxTable() {
  const [rowsState, setRowsState] = useState(rows);
  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user")).user;
    getAllUserFiles(currUser.id, setRowsState);
  }, []); // Pre fetch user files from API

  const renderStatusColor = (status) => {
    let color = "danger";
    switch (status) {
      case "Pending":
        color = "danger";
        break;
      case "Rejected":
        color = "dark";
        break;
      case "Approved by Admin":
        color = "primary";
        break;
      case "Approved by Institute Admin":
        color = "orange-900";
        break;
      case "Approved":
        color = "success";
        break;
      default:
        color = "danger";
    }
    return color;
  };
  return (
    <section className="mt-5">
      <div className="rounded-2 overflow-hidden">
        <MDBTable responsive striped>
          <MDBTableHead light>
            <tr>
              <th>Document Title</th>
              <th>Date of Request</th>
              <th>Current Status</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ verticalAlign: "middle" }}>
            {rowsState.map((row, index) => (
              <tr key={index}>
                <td>
                  <p className="fw-normal mb-1">{row.title}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td>
                  <MDBBadge dark color={renderStatusColor(row.status)} pill>
                    {row.status}
                  </MDBBadge>
                </td>
                <td>
                  <MDBIcon
                    far
                    icon="edit"
                    style={{
                      cursor: "pointer",
                      color: "#0d6efd",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => alert("Edit document")}
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
