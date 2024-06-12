import React, { useState, useEffect } from "react";
import { MDBIcon, MDBCollapse } from "mdb-react-ui-kit";

function AcademicTable({ searchTerm, selectedFilter }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortedBy, setSortedBy] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint or use the existing data source
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/file/all");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const toggleRowDetails = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const handleSort = (criteria) => {
    setSortedBy(criteria);
  };

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mt-5">
      <div className="rounded-2 overflow-hidden">
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>Research Title</th>
              <th>Document</th>
              <th>Author(s)</th>
              <th>Institution</th>
              <th>Degree/Program</th>
              <th>Published on</th>
              <th>File size (MB)</th>
              <th>Uploaded on</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={9} align="center">
                  No files found
                </td>
              </tr>
            ) : (
              filteredRows.map((row, index) => (
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
                      <p className="fw-normal mb-1">{row.institution}</p>
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
                    <td colSpan={9}>
                      <MDBCollapse open={expandedRow === row.id}>
                        <div className="p-3">
                          <p>
                            <strong>Title:</strong> {row.title}
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
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AcademicTable;
