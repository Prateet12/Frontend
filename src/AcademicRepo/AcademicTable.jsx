import * as React from "react";
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
import Link from "@mui/material/Link";

function createData(
  upload_date,
  thesis_title,
  author,
  file_size,
  content,
  abstract,
  keywords
) {
  return {
    upload_date,
    thesis_title,
    author,
    file_size,
    content,
    abstract,
    keywords,
  };
}

function Row(props) {
  const { row } = props;
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <React.Fragment>
      <TableRow
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ cursor: "default" }}
      >
        <TableCell />
        <TableCell>{row.upload_date}</TableCell>
        <TableCell>{row.thesis_title}</TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.file_size} MB</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={hovered} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Abstract & Keywords
              </Typography>
              <Table size="small" aria-label="abstract and keywords">
                <TableBody>
                  <TableRow>
                  <TableCell className="table-subheading">Abstract</TableCell>
                    <TableCell>{row.abstract}</TableCell>
                    <TableCell className="table-subheading">Keywords</TableCell>
                    <TableCell>{row.keywords}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "2024-05-01",
    "Thesis on Quantum Computing",
    "Alice Johnson",
    1.2,
    "This is the content of the Quantum Computing thesis in PDF format.",
    "This thesis explores the potential of quantum computing in solving complex problems that are intractable for classical computers.",
    "Quantum Computing, Qubits, Superposition, Entanglement"
  ),
  createData(
    "2024-04-15",
    "Deep Learning Advances",
    "Bob Smith",
    1.5,
    "This is the content of the Deep Learning Advances thesis in PDF format.",
    "An in-depth look at the latest advancements in deep learning and their applications in various fields.",
    "Deep Learning, Neural Networks, AI, Machine Learning"
  ),
  createData(
    "2024-03-20",
    "AI in Healthcare",
    "Charlie Brown",
    1.8,
    "This is the content of the AI in Healthcare thesis in PDF format.",
    "This thesis examines the integration of artificial intelligence in healthcare and its impact on patient care.",
    "Artificial Intelligence, Healthcare, Machine Learning, Medical Imaging"
  ),
  createData(
    "2024-02-25",
    "Blockchain Technology",
    "David Wilson",
    2.0,
    "This is the content of the Blockchain Technology thesis in PDF format.",
    "A comprehensive study on the principles of blockchain technology and its potential applications beyond cryptocurrencies.",
    "Blockchain, Cryptocurrencies, Decentralization, Distributed Ledger"
  ),
  createData(
    "2024-01-30",
    "Cybersecurity Trends",
    "Eve Davis",
    1.7,
    "This is the content of the Cybersecurity Trends thesis in PDF format.",
    "An analysis of current trends in cybersecurity and strategies for mitigating cyber threats.",
    "Cybersecurity, Threat Mitigation, Data Protection, Network Security"
  ),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Upload Date</TableCell>
            <TableCell>Thesis Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>File Size (MB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
