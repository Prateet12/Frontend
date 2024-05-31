import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./UploadDocument.css";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";

const UploadDocument = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedInstitution, setSelectedInstitution] = useState('');
const [registeredInstitutes, setRegisteredInstitutes] = useState([
  "Institute A",
  "Institute B",
  "Institute C",
  "Institute D"
]);

const handleInstitutionChange = (event) => {
  setSelectedInstitution(event.target.value);
};

  
  const [thesisFile, setThesisFile] = useState(null);
  const [synopsisFile, setSynopsisFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null); // State for resume file
  const [showResumeUpload, setShowResumeUpload] = useState(false); // State to manage resume upload visibility

  const onSubmit = async (data, event) => {
    event.preventDefault();

    // Check if at least one file is selected
    if (!thesisFile && !synopsisFile) {
      alert("Please select at least one file (thesis or synopsis).");
      return;
    }

    try {
      const formData = new FormData();
      // Append data fields
      formData.append("thesisTitle", data.Title); // Use "Title" instead of "thesisTitle"
      formData.append("author", data.authors);
      formData.append("keywords", data.keywords);
      formData.append("abstract", data.abstract);
      formData.append("publicationDate", data.publicationDate);
      formData.append("degreeProgram", data.degreeProgram);
      formData.append("institution", data.institution);
      formData.append("department", data.department);
      formData.append("supervisors", data.supervisors);
      formData.append("language", data.language);
      formData.append("fundingSources", data.fundingSources);
      formData.append("acknowledgements", data.acknowledgements);
      formData.append("references", data.references);

      // Append uploaded files
      if (thesisFile) {
        formData.append("thesisDocument", thesisFile);
      }
      if (synopsisFile) {
        formData.append("synopsisDocument", synopsisFile);
      }
      if (resumeFile) {
        formData.append("resumeDocument", resumeFile); // Append the resume file
      }

      const response = await axios.post("API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Document uploaded successfully!");
        // Reset state after successful upload (optional)
        setThesisFile(null);
        setSynopsisFile(null);
        setResumeFile(null); // Reset resume file state
      } else {
        alert("Failed to upload document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred while uploading the document.");
    }
  };

  const validateCommaSeparated = (value) => {
    if (!value) return true;
    const regex = /^[^,]+(,[^,]+)*$/;
    return regex.test(value) || "Please enter a comma-separated list.";
  };

  const handleThesisChange = (event) => {
    setThesisFile(event.target.files[0]);
  };

  const handleSynopsisChange = (event) => {
    setSynopsisFile(event.target.files[0]);
  };

  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]); // Update the resume file state
  };

  // Function to handle resume upload visibility
  const toggleResumeUpload = () => {
    setShowResumeUpload(!showResumeUpload);
  };

  return (
    <MDBContainer>
    <div className="container_upload">
      <h1 className="header_upload pt-2 pb-3">UPLOAD YOUR DOCUMENT</h1>
      <form className="form_upload" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">      
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div>
              <label>
                Title <span className="required-field">*</span>
              </label>
              <input
                className="upload_input"
                {...register("Title", { required: true })}
              />
              {errors.Title && <span className="error-message">This field is required</span>}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div>
              <label>
                Author <span className="required-field">*</span>
              </label>
              <input
                className="upload_input"
                {...register("author", { required: true })}
              />
              {errors.author && <span className="error-message">This field is required</span>}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div>
              <label>Department</label>
              <input
                className="upload_input"
                {...register("department")}
              />
            
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div>
              <label>
                Abstract <span className="required-field">*</span>
              </label>
              <textarea
                className="upload_input"
                {...register("abstract", { required: true })}
              />
              {errors.abstract && <span className="error-message">This field is required</span>}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div>
              <label>Keywords</label>
              <input
                className="upload_input"
                {...register("keywords", {
                  validate: validateCommaSeparated,
                })}
              />
              {errors.keywords && <span>{errors.keywords.message}</span>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div>
              <label>
                Degree/Program <span className="required-field">*</span>
              </label>
              <select
                className="upload_input"
                {...register("degreeProgram", { required: true })}
              >
                <option value="" disabled selected>Select your degree</option>
                <option value="PhD">PhD</option>
                <option value="Masters">Master's</option>
                <option value="Bachelors">Bachelor's</option>
              </select>
              {errors.degreeProgram && <span className="error-message">This field is required</span>}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <label htmlFor="institution">Institution</label>
            <select
              id="institution"
              className="upload_input"
              value={selectedInstitution}
              onChange={handleInstitutionChange}
            >
              <option value="">Select an institution</option>
              {registeredInstitutes.map((institution, index) => (
                <option key={index} value={institution}>
                  {institution}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div>
              <label>Publication Date</label>
              <input
                type="date"
                className="upload_input"
                {...register("publicationDate")}
              />
            </div>
          </div>
        </div>
        <div className="row">          
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div>
              <label>Supervisors/Advisors</label>
              <textarea
                className="upload_input"
                {...register("supervisors")}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div>
              <label>Acknowledgements</label>
              <textarea className="upload_input" {...register("acknowledgements")} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div>
              <label>Upload Thesis Document</label>
              <input
                className="upload_input"
                type="file"
                onChange={handleThesisChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div>
              <label>Upload Synopsis Document</label>
              <input
                className="upload_input"
                type="file"
                onChange={handleSynopsisChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div>
              <label>Funding Sources</label>
              <input className="upload_input" {...register("fundingSources")} />
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 checkbox-label">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              <span className="terms-label">
                I agree to the terms and conditions
              </span><span className="required-field">*</span>
              {errors.terms && <span className="error-message">This field is required</span>}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <MDBBtn size="lg" className="submit_upload">Submit</MDBBtn>
            </div>
        </div>
      </form>
    </div>
    </MDBContainer>
  );
};

export default UploadDocument;
