import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";

function createData(
  id,
  title,
  type,
  authors,
  degree_program,
  published_on,
  file_size,
  upload_date,
  content,
  abstract,
  keywords
) {
  return {
    id,
    title,
    type,
    authors,
    degree_program,
    published_on,
    file_size,
    upload_date,
    content,
    abstract,
    keywords,
  };
}

const backup_rows = [
  createData(
    "1",
    "Thesis on Quantum Computing",
    "Thesis",
    "Alice Johnson, Rewada",
    "PhD",
    "2024-05-01",
    1.2,
    "2024-05-01",
    "This is the content of the Quantum Computing thesis in PDF format.",
    "This thesis explores the potential of quantum computing in solving complex problems that are intractable for classical computers.",
    "Quantum Computing, Qubits, Superposition, Entanglement"
  ),
  createData(
    "2",
    "Deep Learning Advances",
    "Synopsis",
    "Bob Smith",
    "PhD",
    "2024-04-15",
    1.5,
    "2024-04-15",
    "This is the content of the Deep Learning Advances thesis in PDF format.",
    "An in-depth look at the latest advancements in deep learning and their applications in various fields.",
    "Deep Learning, Neural Networks, AI, Machine Learning"
  ),
];

export default function CollapsibleTable() {
  const [expandedRow, setExpandedRow] = useState(null);

  const [rows, setRows] = useState([backup_rows]);

  const fetchAllPapers = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/file/all");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data);
      setRows(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllPapers();
  }, []);

  const toggleRowDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <section className="mt-5">
      <div className="rounded-2 overflow-hidden">
        <MDBTable responsive striped>
          <MDBTableHead light>
            <tr>
              <th>Research Title</th>
              <th>Document</th>
              <th>Author/'s</th>
              <th>Degree/Program</th>
              <th>Published on</th>
              <th>File size (MB)</th>
              <th>Uploaded on</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ verticalAlign: "middle" }}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} align="center">
                  No files in academic repository
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <p className="fw-normal mb-1">{row.title}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{row.fileType}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{row.author}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-0">{row.degree_program}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-0">
                        {new Date(row.publication_date).toDateString()}
                      </p>
                    </td>
                    <td>
                      <p className="fw-normal mb-0">{row.fileSize}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-0">
                        {new Date(row.uploadDate).toDateString()}
                      </p>
                    </td>
                    <td>
                      <MDBIcon
                        fas
                        icon={
                          expandedRow === row.id ? "caret-up" : "caret-down"
                        }
                        onClick={() => toggleRowDetails(row.id)}
                        style={{
                          cursor: "pointer",
                          color: "#0d6efd",
                          fontSize: "1.5rem",
                        }}
                      />
                    </td>
                  </tr>
                  <tr
                    style={{
                      display: expandedRow === row.id ? "table-row" : "none",
                    }}
                  >
                    <td colSpan={8}>
                      <MDBCollapse open={expandedRow === row.id}>
                        <div className="p-3">
                          <p>
                            <strong>Ttile:</strong> {row.title}
                          </p>
                          <p>
                            <strong>Authors:</strong> {row.author}
                          </p>
                          <p>
                            <strong>Degree/Program:</strong>{" "}
                            {row.degree_program}
                          </p>
                          <p>
                            <strong>Publication Date:</strong>{" "}
                            {new Date(row.publication_date).toDateString()}
                          </p>
                          <p>
                            <strong>Abstract:</strong> {row.abstract}
                          </p>
                          <p>
                            <strong>Keywords:</strong> {row.keywords}
                          </p>

                          <p>
                            <strong>Thesis Document:</strong>{" "}
                            {row.filename && (
                            <a
                              href={`http://localhost:3001/static/${row.filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Thesis
                            </a>
                          )}
                          </p>
                          <p>
                          {row.synopsisFileName && (
                            <>
                              <strong>Synopsis Document:</strong>{" "}
                              <a
                                href={`http://localhost:3001/static/${row.synopsisFileName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Synopsis
                              </a>
                            </>
                          )}
                          </p>
                        </div>
                      </MDBCollapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </div>
    </section>
  );
}
