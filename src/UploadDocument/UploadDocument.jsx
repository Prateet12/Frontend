import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./UploadDocument.css";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const UploadDocument = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      formData.append("authors", data.authors);
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
    <div className="container_upload">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="header_upload">UPLOAD YOUR DOCUMENT</h1>
          <form className="form_upload" onSubmit={handleSubmit(onSubmit)}>
            {/* Resume upload section */}
            <Link to="/upload-resume" style={{ textDecoration: "none" }}>
        <Button variant="text" color="primary">
          UPLOAD YOUR RESUME
        </Button>
      </Link>

            <div className="row">
       
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div>
                  <label>
                    Authors <span className="required-field">*</span>
                  </label>
                  <input
                    className="upload_input"
                    {...register("authors", { required: true })}
                  />
                  {errors.authors && <span className="error-message">This field is required</span>}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
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

              <div className="col-md-6">
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
              <div className="col-md-12">
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
            </div>

            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>
                    Degree/Program <span className="required-field">*</span>
                  </label>
                  <select
                    className="upload_input"
                    {...register("degreeProgram", { required: true })}
                  >
                    <option value="PhD">PhD</option>
                    <option value="Masters">Master's</option>
                    <option value="Bachelors">Bachelor's</option>
                  </select>
                  {errors.degreeProgram && <span className="error-message">This field is required</span>}
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label>Institution</label>
                  <input
                    className="upload_input"
                    {...register("institution")}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>Department</label>
                  <input
                    className="upload_input"
                    {...register("department")}
                  />
                
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label>Supervisors/Advisors</label>
                  <textarea
                    className="upload_input"
                    {...register("supervisors")}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>Upload Thesis Document</label>
                  <input
                    className="upload_input"
                    type="file"
                    onChange={handleThesisChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div>
                  <label>Funding Sources</label>
                  <input className="upload_input" {...register("fundingSources")} />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label>Acknowledgements</label>
                  <textarea className="upload_input" {...register("acknowledgements")} />
                </div>
              </div>
            </div>
{/* 
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>References/Bibliography</label>
                  <textarea className="upload_input" {...register("references")} />
                </div>
              </div>
            </div> */}

            <div className="checkbox-label">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              <span className="terms-label">
                I agree to the terms and conditions
              </span><span className="required-field">*</span>
              {errors.terms && <span className="error-message">This field is required</span>}
            </div>

            <button className="submit_upload" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
