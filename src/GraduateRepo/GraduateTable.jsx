import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { FaEnvelope } from 'react-icons/fa';

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

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.date_of_joining}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.organization}</TableCell>
        <TableCell>{row.position}</TableCell>
        <TableCell>{row.specialization}</TableCell>
        <TableCell align="center">
          <Link href={`mailto:${row.email}`} target="_blank">
            <FaEnvelope size={20} /> {/* Increased size to 20 */}
          </Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell align="center">Connect</TableCell> {/* Center aligned header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.date_of_joining} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
