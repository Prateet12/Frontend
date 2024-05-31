import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  MDBCardFooter 
} from 'mdb-react-ui-kit';

// Constant data arrays
const userRows = [
  { user_id: 1, date_of_request: '2023-01-15', user_name: 'John Doe', user_type: 'Practitioner', yearsOfExperience:' 5', organizationType:'Private',industrySector: 'Metereology',associatedOrganizationName:' XYZ Ltd.' },
  { user_id: 2, date_of_request: '2023-01-20', user_name: 'Emily Johnson', user_type: 'Graduate', degreeProgram: 'Electrical Engineering', graduationYear: 2023 ,institutionName: 'ABC Institute' },
  { user_id: 3, date_of_request: '2023-02-05', user_name: 'Alice Johnson', user_type: 'Researcher', highestDegree: 'PhD', researchAreas: 'Machine Learning', organizationType: 'Research Institute', organizationName: 'Research Institute A' },
  { user_id: 4, date_of_request: '2023-02-10', user_name: 'Michael Brown', user_type: 'Research Assistant', highestDegree: 'Master', researchAreas: 'Computer Vision', organizationType: 'University', organizationName: 'University B' },
  { user_id: 5, date_of_request: '2023-02-15', user_name: 'Charlie Davis', user_type: 'Professor', institution: 'University C', institutionName:'ABC University',fieldOfSpecialization: 'Physics', yearsOfTeaching: 10 },
  { user_id: 7, date_of_request: '2023-03-05', user_name: 'Emma Wilson', user_type: 'Graduate', degreeProgram: 'Computer Science', graduationYear: 2024, institutionName: "XYZ Institute" },
  { user_id: 8, date_of_request: '2023-03-10', user_name: 'William Johnson', user_type: 'Researcher', highestDegree: 'PhD', researchAreas: 'Artificial Intelligence', organizationType: 'Company', organizationName: 'Company X' },
];

const documentRows = [
  {
    user_id: 1,
    date_of_request: '2023-01-15',
    user: 'John Doe',
    document_type: 'Thesis',
    document_url: 'http://example.com/doc1',
    title: 'Sample Document 1',
    author: 'John Doe',
    keywords: 'Sample, Document, Test',
    publicationDate: '2023-01-01',
    abstract: 'This is a sample abstract.',
    degreeProgram: 'Computer Science',
    institution: 'University A',
    department: 'Computer Science Department',
    supervisors: 'Dr. Smith',
    thesisDocument: 'http://example.com/thesis1.pdf',
    synopsisDocument: 'http://example.com/synopsis1.pdf',
    fundingSources: 'Funding Source 1',
    acknowledgements: 'Acknowledgement 1'
  },
  {
    user_id: 2,
    date_of_request: '2023-01-20',
    user: 'Emily Johnson',
    document_type: 'Synopsis',
    document_url: 'http://example.com/doc2',
    title: 'Sample Document 2',
    author: 'Emily Johnson',
    keywords: 'Sample, Document, Test',
    publicationDate: '2023-01-10',
    abstract: 'This is another sample abstract.',
    degreeProgram: 'Electrical Engineering',
    institution: 'University B',
    department: 'Electrical Engineering Department',
    supervisors: 'Dr. Brown',
    synopsisDocument: 'http://example.com/synopsis2.pdf',
    fundingSources: 'Funding Source 2',
    acknowledgements: 'Acknowledgement 2'
  },
  {
    user_id: 2,
    date_of_request: '2024-01-20',
    user: 'Eliana Brown',
    document_type: 'Thesis',
    document_url: 'http://example.com/doc2',
    title: 'Sample Document 3',
    author: 'Eliana Brown',
    keywords: 'Sample, Document, Test',
    publicationDate: '2024-01-10',
    abstract: 'This is another sample abstract.',
    degreeProgram: 'Electronics Engineering',
    institution: 'University C',
    department: 'Electronics Engineering Department',
    supervisors: 'Dr. John',
    thesisDocument: 'http://example.com/thesis3.pdf',
    fundingSources: 'Funding Source 3',
    acknowledgements: 'Acknowledgement 3'
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// UserDetailsModal component
function UserDetailsModal({ open, handleClose, user }) {
  if (!user) return null;

  let modalContent;
  switch (user.user_type) {
    case 'Graduate':
      modalContent = (
        <Box sx={style}>
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
        </Box>
      );
      break;
    case 'Practitioner':
      modalContent = (
        <Box sx={style}>
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
            <strong>Associated Organization Name:</strong> {user.associatedOrganizationName}
          </Typography>
       
        </Box>
      );
      break;
    case 'Professor':
      modalContent = (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Professor Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Institution Name:</strong> {user.institutionName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Field of Specialization:</strong> {user.fieldOfSpecialization}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Years of Teaching:</strong> {user.yearsOfTeaching}
          </Typography>
        </Box>
      );
      break;
    case 'Researcher':
      modalContent = (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Researcher Details
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
        </Box>
      );
      break;
    case 'Research Assistant':
      modalContent = (
        <Box sx={style}>
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
        </Box>
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
      {modalContent}
    </Modal>
  );
}
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Thesis Document:</strong> <a href={document.thesisDocument} target="_blank" rel="noopener noreferrer">View Thesis</a>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Synopsis Document:</strong> <a href={document.synopsisDocument} target="_blank" rel="noopener noreferrer">View Synopsis</a>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Funding Sources:</strong> {document.fundingSources}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Acknowledgements:</strong> {document.acknowledgements}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    );
  }
  
  // Row component for UserApproval
  function UserRow({ row, handleApprove, handleReject, handleView }) {
    return (
      <TableRow>
        <TableCell>{row.date_of_request}</TableCell>
        <TableCell>{row.user_name}</TableCell>
        <TableCell>{row.user_type}</TableCell>
        <TableCell>
          <IconButton onClick={() => handleApprove(row)}>
            <CheckCircleOutlineIcon style={{ color: 'green' }} />
          </IconButton>
          <IconButton onClick={() => handleReject(row)}>
            <CancelOutlinedIcon style={{ color: 'red' }} />
          </IconButton>
          <IconButton onClick={() => handleView(row)}>
            <VisibilityIcon style={{ color: 'blue' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
  
  // Row component for DocumentApproval
  function DocumentRow({ row, handleApprove, handleReject, handleView }) {
    return (
      <TableRow>
        <TableCell>{row.date_of_request}</TableCell>
        <TableCell>{row.user}</TableCell>
        <TableCell>{row.document_type}</TableCell>
        <TableCell><a href={row.document_url} target="_blank"
            rel="noopener noreferrer">View Document</a></TableCell>
            <TableCell>
              <IconButton onClick={() => handleApprove(row)}>
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => handleReject(row)}>
                <CancelOutlinedIcon style={{ color: 'red' }} />
              </IconButton>
              <IconButton onClick={() => handleView(row)}>
                <VisibilityIcon style={{ color: 'blue' }} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      }
      
      // UserApproval component
      function UserApproval() {
        const [open, setOpen] = React.useState(false);
        const [selectedUser, setSelectedUser] = React.useState(null);
      
        const handleOpen = (user) => {
          setSelectedUser(user);
          setOpen(true);
        };
      
        const handleClose = () => setOpen(false);
      
        const handleApprove = (row) => {
          // Implement logic to handle approval
          console.log('Approved:', row);
        };
      
        const handleReject = (row) => {
          // Implement logic to handle rejection
          console.log('Rejected:', row);
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
                {userRows.map((row, index) => (
                  <UserRow
                    key={index}
                    row={row}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    handleView={handleOpen}
                  />
                ))}
              </TableBody>
            </Table>
            <UserDetailsModal open={open} handleClose={handleClose} user={selectedUser} />
          </TableContainer>
        );
      }
      
      // DocumentApproval component
      function DocumentApproval() {
        const [open, setOpen] = React.useState(false);
        const [selectedDocument, setSelectedDocument] = React.useState(null);
      
        const handleOpen = (document) => {
          setSelectedDocument(document);
          setOpen(true);
        };
      
        const handleClose = () => setOpen(false);
      
        const handleApprove = (row) => {
          // Implement logic to handle approval
          console.log('Approved:', row);
        };
      
        const handleReject = (row) => {
          // Implement logic to handle rejection
          console.log('Rejected:', row);
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
                {documentRows.map((row, index) => (
                  <DocumentRow
                    key={index}
                    row={row}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    handleView={handleOpen}
                  />
                ))}
              </TableBody>
            </Table>
            <ViewDetailsModal open={open} handleClose={handleClose} document={selectedDocument} />
          </TableContainer>
        );
      }
      
      // Main component to manage tabs
      export default function ApprovalManager() {
        const [tabValue, setTabValue] = React.useState('userApproval');
      
        const handleChangeTab = (event, newValue) => {
          setTabValue(newValue);
        };
      
        return (
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="approval tabs"
            >
              <Tab value="userApproval" label="User Approval" />
              <Tab value="documentApproval" label="Document Approval" />
            </Tabs>
            {tabValue === 'userApproval' ? <UserApproval /> : <DocumentApproval />}
          </Box>
        );
      }
      