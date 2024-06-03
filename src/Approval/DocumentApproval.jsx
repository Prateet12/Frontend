import * as React from "react";
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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  MDBCardFooter,
} from "mdb-react-ui-kit";

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

// ViewDetailsModal component
function ViewDetailsModal({ open, handleClose, document }) {
  if (!document) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {document.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Author:</strong> {document.author}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Keywords:</strong> {document.keywords}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Publication Date:</strong> {document.publicationDate}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Abstract:</strong> {document.abstract}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Degree/Program:</strong> {document.degreeProgram}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Institution:</strong> {document.institution}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Department:</strong> {document.department}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Supervisors/Advisors:</strong> {document.supervisors}
        </Typography>
        {document.filename && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Thesis Document:</strong>{" "}
            <a
              href={`http://localhost:3001/static/${document.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Thesis
            </a>
          </Typography>
        )}
        {document.synopsisFileName && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Synopsis Document:</strong>{" "}
            <a
              href={`http://localhost:3001/static/${document.synopsisFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Synopsis
            </a>
          </Typography>
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Funding Sources:</strong> {document.fundingSources}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Acknowledgements:</strong> {document.acknowledgements}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

// Row component for DocumentApproval
function DocumentRow({ row, handleApprove, handleReject, handleView }) {
  return (
    <TableRow>
      <TableCell>{new Date(row.uploadDate).toLocaleDateString()}</TableCell>
      <TableCell>{row.fromUser.name}</TableCell>
      <TableCell>{row.fileType}</TableCell>
      <TableCell>
        <a href={row.document_url} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      </TableCell>
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

// DocumentApproval component
export default function DocumentApproval(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState(null);
  const [documentRows, setDocumentRows] = React.useState(
    props.uploadRequests || []
  );
  console.log("Document rows:", documentRows);

  const handleOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDocument = async (
    row,
    url,
    actionSuccessMessage,
    actionFailMessage
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId: row._id,
          instituteName: JSON.parse(localStorage.getItem("user")).user
            .institution,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const message = await response.text();
      console.log(message);
      alert(actionSuccessMessage);
    } catch (error) {
      console.error("Error:", error);
      alert(actionFailMessage);
    }
  };

  const handleApprove = async (row) => {
    await handleDocument(
      row,
      "http://localhost:3001/v1/admin/approveUpload",
      "Document approved successfully!",
      "Failed to approve document"
    );
    setDocumentRows(documentRows.filter((doc) => doc._id !== row._id));
  };

  const handleReject = (row) => {
    handleDocument(
      row,
      "http://localhost:3001/v1/admin/rejectUpload",
      "Document rejected successfully!",
      "Failed to reject document"
    );
    setDocumentRows(documentRows.filter((doc) => doc._id !== row._id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date of Request</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Document Type</TableCell>
            <TableCell>Document URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No documents to process
              </TableCell>
            </TableRow>
          ) : (
            documentRows.map((row, index) => (
              <DocumentRow
                key={index}
                row={row}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleView={handleOpen}
              />
            ))
          )}
        </TableBody>
      </Table>
      <ViewDetailsModal
        open={open}
        handleClose={handleClose}
        document={selectedDocument}
      />
    </TableContainer>
  );
}
