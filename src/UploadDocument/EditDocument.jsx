import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import "./UploadDocument.css";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import {
  fetchfileById,
  getAllInstitutes,
  updateDocument,
  uploadDocument,
} from "../utils/apiUtils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

const EditDocument = () => {
  let [initialData, setInitialData] = useState({}); // [initialData, setInitialData] = useState({});
  // console.log("Initial Data: ------------------- ", initialData);

  const schema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    abstract: yup.string().required(),
    degreeProgram: yup.string().required(),
    institution: yup.string().required(),
    keywords: yup.string().required(),
    terms: yup
      .boolean()
      .oneOf([true], "Please agree to the terms and conditions"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initialData,
      degreeProgram: initialData?.degreeProgram,
    },
  });

  const params = useParams().id;

  console.log("API Response", initialData);

  console.log("error", errors);
  // console.log("API Response", initialData);
  // setInitialData((prev) => initialData);

  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [registeredInstitutes, setRegisteredInstitutes] = useState(
    JSON.parse(localStorage.getItem("institutes")) || []
  );

  const createFormData = (data, files, fileType) => {
    let formData = new FormData();
    console.log("User ID:", JSON.parse(localStorage.getItem("user")).user.id);
    // Required Fields
    formData.append(
      "fromUser",
      JSON.parse(localStorage.getItem("user")).user.id || ""
    );
    formData.append("fileType", fileType);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("abstract", data.abstract);
    formData.append("degreeProgram", data.degreeProgram);
    formData.append("filename", initialData.filename);
    for (let file of files) {
      console.log("File:", file);
      formData.append("files", file);
    }
    // Optional Fields:
    formData.append("keywords", data.keywords);
    formData.append("publication_date", data.publicationDate);
    formData.append("institution", data.institution);
    formData.append("department", data.department);
    formData.append("supervisors", data.supervisors);
    formData.append("fundingSources", data.fundingSources);
    formData.append("acknowledgements", data.acknowledgements);
    formData.forEach((item) => {
      console.log(item);
    });
    // console.log("Form Data:", formData);
    return formData;
  };

  useEffect(() => {
    if (!registeredInstitutes || registeredInstitutes.length <= 1) {
      let institutes = getAllInstitutes();
      setRegisteredInstitutes(institutes);

      console.log(institutes);
    }

    let initialData;
    (async () => {
      initialData = await fetchfileById(params);
      setInitialData((prev) => {
        return { ...prev, ...initialData };
      });
      reset(initialData);
    })();
  }, [params]);

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
  };

  const handleThesisChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (["pdf", "doc", "docx"].includes(fileType)) {
        setThesisFile(file);
      } else {
        alert("Please select a PDF, DOC, or DOCX file for the thesis.");
      }
    }
    // Check if file size exceeds 10MB (10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    setSelectedFile(file);
    console.log("Selected file:", file);

    setThesisFile(event.target.files[0]);
  };

  const handleSynopsisChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (["pdf", "doc", "docx"].includes(fileType)) {
        setSynopsisFile(file);
      } else {
        alert("Please select a PDF, DOC, or DOCX file for the synopsis.");
      }
    }
    // Check if file size exceeds 10MB (10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    setSelectedFile(file);
    console.log("Selected file:", file);

    setThesisFile(event.target.files[0]);
  };

  const isTextWithCommas = (value) => {
    const regex = /^[a-zA-Z,\s]*$/; // Allow only alphabets, commas, and whitespaces
    return regex.test(value) || "Only text and commas are allowed";
  };

  const [thesisFile, setThesisFile] = useState(null);
  const [synopsisFile, setSynopsisFile] = useState(null);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    // Check if at least one file is selected
    if (!thesisFile && !synopsisFile && data.filename == "") {
      alert("Please select at least one file (thesis or synopsis).");
      return;
    }

    try {
      let files = [];
      let fileType = data.fileType;
      if (thesisFile) {
        files.push(thesisFile);
        fileType = "Thesis";
      }
      if (synopsisFile) {
        files.push(synopsisFile);
        fileType = "Synopsis";
      }

      if (files.length === 2) {
        fileType = "Thesis and Synopsis";
      }

      const formData = createFormData(data, files, fileType);
      await updateDocument(formData, data._id);

      setThesisFile(null);
      setSynopsisFile(null);
      reset({});
      window.location.href = `/inbox`;

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateCommaSeparated = (value) => {
    if (!value) return true;
    const regex = /^[^,]+(,[^,]+)*$/;
    return regex.test(value) || "Please enter a comma-separated list.";
  };

  const validateKeywords = (value) => {
    const keywordsArray = value
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean);
    if (keywordsArray.length < 5) {
      return "At least 5 keywords are required";
    }
    return true;
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Check if file size exceeds 10MB (10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  // Watch the required fields to determine if the form is valid
  const requiredFields = watch([
    "title",
    "author",
    "abstract",
    "degreeProgram",
    "institution",
    "keywords",
    "terms",
  ]);

  console.log("Required Fields:", requiredFields);

  const isFormValid = requiredFields.every((field) => field);

  return (
    <div className="uploadDocument">
      <MDBContainer>
        <div className="container_upload">
          <h1 className="header_upload pt-2 pb-3"> EDIT DOCUMENT</h1>
          <form className="form_upload" onSubmit={handleSubmit(onSubmit)}>
            <div className="row upload_row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div>
                  <label>
                    Title <span className="required-field">*</span>
                  </label>
                  <input
                    className="upload_input"
                    {...register("title")}
                    // defaultValue={initialData?.title}
                  />
                  {errors.title && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div>
                  <label>
                    Author <span className="required-field">*</span>
                  </label>
                  <input
                    className="upload_input"
                    {...register("author")}
                    // value={initialData?.author}
                  />
                  {errors.author && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div>
                  <label>Department</label>
                  <input
                    className="upload_input"
                    {...register("department")}
                    //value={initialData?.department}
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
                    {...register("abstract")}
                    //value={initialData?.abstract}
                  />
                  {errors.abstract && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div>
                  <label>
                    Keywords (At least 5 keywords are required){" "}
                    <span className="required-field">*</span>
                  </label>
                  <input
                    className="upload_input"
                    {...register("keywords", {
                      required: "This field is required",
                      validate: validateKeywords,
                    })}
                    // defaultValue={initialData?.keywords?
                    //value={initialData?.keywords?.toString()}
                  />
                  {errors.keywords && (
                    <span className="error-message">
                      {errors.keywords.message}
                    </span>
                  )}
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
                    {...register("degreeProgram")}
                    defaultValue={initialData?.degreeProgram}
                  >
                    <option value="" disabled>
                      Select your degree
                    </option>
                    <option value="PhD">PhD</option>
                    <option value="Masters">Master's</option>
                    <option value="Bachelors">Bachelor's</option>
                  </select>
                  {errors.degreeProgram && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div>
                  <label htmlFor="institution">
                    Institution <span className="required-field">*</span>
                  </label>

                  {console.log(registeredInstitutes)}
                  <select
                    id="institution"
                    className="upload_input"
                    {...register("institution")}
                    defaultValue={initialData?.institution}
                  >
                    <option value="">Select an institution</option>
                    {registeredInstitutes.map((institution, index) => (
                      <option key={index} value={institution}>
                        {institution}
                      </option>
                    ))}
                  </select>
                  {errors.institution && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div>
                  <label>Publication Date</label>
                  <input
                    type="date"
                    className="upload_input"
                    {...register("publicationDate")}
                    //value={initialData?.publication_date}
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
                    {...register("supervisors", { validate: isTextWithCommas })}
                    //value={initialData?.supervisors}
                  />
                  {errors.supervisors && (
                    <span className="error-message">
                      {errors.supervisors.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div>
                  <label>Acknowledgements</label>
                  <textarea
                    className="upload_input"
                    {...register("acknowledgements", {
                      validate: isTextWithCommas,
                    })}
                    //value={initialData?.acknowledgements}
                  />
                  {errors.acknowledgements && (
                    <span className="error-message">
                      {errors.acknowledgements.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div>
                  <label>
                    Upload Thesis Document (Please upload a file with a maximum
                    size of 10MB){" "}
                  </label>
                  <input
                    className="upload_input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleThesisChange}
                  />
                </div>
                <div className="fw-bold mb-2">
                  {" "}
                  <i class="fa-solid fa-file-invoice me-1 text-info"></i>{" "}
                  {initialData?.filename?.split("-")[1]}{" "}
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div>
                  <label>
                    Upload Synopsis Document (Please upload a file with a
                    maximum size of 10MB)
                  </label>
                  <input
                    className="upload_input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleSynopsisChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div>
                  <label>Funding Sources</label>
                  <select
                    className="upload_input"
                    {...register("fundingSources")}
                    defaultValue={initialData?.fundingSources}
                  >
                    <option value="">Select Funding Source</option>
                    <option value="Government Grants">Government Grants</option>
                    <option value="Private Grants">Private Grants</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Endowments">Endowments</option>
                    <option value="Crowdfunding">Crowdfunding</option>
                    <option value="Personal Savings">Personal Savings</option>
                    <option value="Venture Capital">Venture Capital</option>
                    <option value="Angel Investors">Angel Investors</option>
                    <option value="Corporate Sponsors">
                      Corporate Sponsors
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 checkbox-label">
                <input type="checkbox" {...register("terms")} />
                <span className="terms-label">
                  I agree to the terms and conditions
                </span>
                <span className="required-field">*</span>
                {errors.terms && (
                  <span className="error-message">This field is required</span>
                )}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                {isFormValid && (
                  <MDBBtn size="lg" className="submit_upload">
                    Submit
                  </MDBBtn>
                )}
              </div>
            </div>
          </form>
        </div>
      </MDBContainer>
    </div>
  );
};

export default EditDocument;