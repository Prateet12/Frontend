import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import UserApproval from "./UserApproval";
import DocumentApproval from "./DocumentApproval";

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

// Constant data arrays
const userRows = [
  {
    user_id: 1,
    date_of_request: "2023-01-15",
    user_name: "John Doe",
    user_type: "Practitioner",
    yearsOfExperience: " 5",
    organizationType: "Private",
    industrySector: "Metereology",
    associatedOrganizationName: " XYZ Ltd.",
  },
  {
    user_id: 2,
    date_of_request: "2023-01-20",
    user_name: "Emily Johnson",
    user_type: "Graduate",
    degreeProgram: "Electrical Engineering",
    graduationYear: 2023,
    institutionName: "ABC Institute",
  },
  {
    user_id: 3,
    date_of_request: "2023-02-05",
    user_name: "Alice Johnson",
    user_type: "Researcher",
    highestDegree: "PhD",
    researchAreas: "Machine Learning",
    organizationType: "Research Institute",
    organizationName: "Research Institute A",
  },
  {
    user_id: 4,
    date_of_request: "2023-02-10",
    user_name: "Michael Brown",
    user_type: "Research Assistant",
    highestDegree: "Master",
    researchAreas: "Computer Vision",
    organizationType: "University",
    organizationName: "University B",
  },
  {
    user_id: 5,
    date_of_request: "2023-02-15",
    user_name: "Charlie Davis",
    user_type: "Professor",
    institution: "University C",
    institutionName: "ABC University",
    fieldOfSpecialization: "Physics",
    yearsOfTeaching: 10,
  },
  {
    user_id: 7,
    date_of_request: "2023-03-05",
    user_name: "Emma Wilson",
    user_type: "Graduate",
    degreeProgram: "Computer Science",
    graduationYear: 2024,
    institutionName: "XYZ Institute",
  },
  {
    user_id: 8,
    date_of_request: "2023-03-10",
    user_name: "William Johnson",
    user_type: "Researcher",
    highestDegree: "PhD",
    researchAreas: "Artificial Intelligence",
    organizationType: "Company",
    organizationName: "Company X",
  },
];

const documentRows = [
  {
    user_id: 1,
    date_of_request: "2023-01-15",
    user: "John Doe",
    document_type: "Thesis",
    document_url: "http://example.com/doc1",
    title: "Sample Document 1",
    author: "John Doe",
    keywords: "Sample, Document, Test",
    publicationDate: "2023-01-01",
    abstract: "This is a sample abstract.",
    degreeProgram: "Computer Science",
    institution: "University A",
    department: "Computer Science Department",
    supervisors: "Dr. Smith",
    thesisDocument: "http://example.com/thesis1.pdf",
    synopsisDocument: "http://example.com/synopsis1.pdf",
    fundingSources: "Funding Source 1",
    acknowledgements: "Acknowledgement 1",
  },
  {
    user_id: 2,
    date_of_request: "2023-01-20",
    user: "Emily Johnson",
    document_type: "Synopsis",
    document_url: "http://example.com/doc2",
    title: "Sample Document 2",
    author: "Emily Johnson",
    keywords: "Sample, Document, Test",
    publicationDate: "2023-01-10",
    abstract: "This is another sample abstract.",
    degreeProgram: "Electrical Engineering",
    institution: "University B",
    department: "Electrical Engineering Department",
    supervisors: "Dr. Brown",
    synopsisDocument: "http://example.com/synopsis2.pdf",
    fundingSources: "Funding Source 2",
    acknowledgements: "Acknowledgement 2",
  },
  {
    user_id: 2,
    date_of_request: "2024-01-20",
    user: "Eliana Brown",
    document_type: "Thesis",
    document_url: "http://example.com/doc2",
    title: "Sample Document 3",
    author: "Eliana Brown",
    keywords: "Sample, Document, Test",
    publicationDate: "2024-01-10",
    abstract: "This is another sample abstract.",
    degreeProgram: "Electronics Engineering",
    institution: "University C",
    department: "Electronics Engineering Department",
    supervisors: "Dr. John",
    thesisDocument: "http://example.com/thesis3.pdf",
    fundingSources: "Funding Source 3",
    acknowledgements: "Acknowledgement 3",
  },
];

// Main component to manage tabs
export default function ApprovalManager(props) {
  const [tabValue, setTabValue] = React.useState("userApproval");
  console.log("hi from approval manager");
  console.log(props.registrationRequests);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      {tabValue === "userApproval" ? (
        <UserApproval registrationRequests={props.registrationRequests} />
      ) : (
        <DocumentApproval uploadRequests={props.uploadRequests} />
      )}
    </Box>
  );
}
