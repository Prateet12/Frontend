import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./UploadDocument.css";

const UploadDocument = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!data.thesisDocument?.[0] && !data.synopsisDocument?.[0]) {
        alert("Please upload either thesis or synopsis.");
        return;
      }

      const formData = new FormData();
      formData.append("thesisTitle", data.thesisTitle);
      formData.append("authors", data.authors);
      formData.append("keywords", data.keywords);
      formData.append("abstract", data.abstract);
      formData.append("publicationDate", data.publicationDate);
      formData.append("degreeProgram", data.degreeProgram);
      formData.append("institution", data.institution);
      formData.append("department", data.department);
      formData.append("supervisors", data.supervisors);
      formData.append("documentType", data.documentType);
      if (data.thesisDocument?.[0]) {
        formData.append("thesisDocument", data.thesisDocument[0]);
      }
      if (data.synopsisDocument?.[0]) {
        formData.append("synopsisDocument", data.synopsisDocument[0]);
      }
      formData.append("language", data.language);
      formData.append("fundingSources", data.fundingSources);
      formData.append("acknowledgements", data.acknowledgements);
      formData.append("references", data.references);

      const response = await axios.post("API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Document uploaded successfully!");
      } else {
        alert("Failed to upload document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred while uploading the document.");
    }
  };

  return (
    <div className="container_upload">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="header_upload">UPLOAD YOUR DOCUMENT</h1>
          <form className="form_upload" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Thesis Title</label>
              <input
                className="upload_input"
                {...register("thesisTitle", { required: true })}
              />
              {errors.thesisTitle && <span>This field is required</span>}
            </div>

            <div>
              <label>Authors</label>
              <input
                className="upload_input"
                {...register("authors", { required: true })}
              />
              {errors.authors && <span>This field is required</span>}
            </div>

            <div>
              <label>Keywords</label>
              <input
                className="upload_input"
                {...register("keywords", { required: true })}
              />
              {errors.keywords && <span>This field is required</span>}
            </div>

            <div>
              <label>Abstract</label>
              <textarea
                className="upload_input"
                {...register("abstract", { required: true })}
              />
              {errors.abstract && <span>This field is required</span>}
            </div>

            <div>
              <label>Publication Date</label>
              <input
                className="upload_input"
                type="date"
                {...register("publicationDate", { required: true })}
              />
              {errors.publicationDate && <span>This field is required</span>}
            </div>

            <div>
              <label>Degree/Program</label>
              <select
                className="upload_input"
                {...register("degreeProgram", { required: true })}
              >
                <option value="PhD">PhD</option>
                <option value="Masters">Master's</option>
                <option value="Bachelors">Bachelor's</option>
              </select>
              {errors.degreeProgram && <span>This field is required</span>}
            </div>

            <div>
              <label>Institution</label>
              <input
                className="upload_input"
                {...register("institution", { required: true })}
              />
              {errors.institution && <span>This field is required</span>}
            </div>

            <div>
              <label>Department</label>
              <input
                className="upload_input"
                {...register("department", { required: true })}
              />
              {errors.department && <span>This field is required</span>}
            </div>

            <div>
              <label>Supervisors/Advisors</label>
              <input className="upload_input" {...register("supervisors")} />
            </div>

            <div>
              <label>Document Type</label>
              <select
                className="upload_input"
                {...register("documentType", { required: true })}
              >
                <option value="Thesis">Thesis</option>
                <option value="Dissertation">Dissertation</option>
                <option value="Synopsis">Synopsis</option>
                <option value="Research Paper">Research Paper</option>
              </select>
              {errors.documentType && <span>This field is required</span>}
            </div>

            <div>
              <label>Upload Thesis Document</label>
              <input
                className="upload_input"
                type="file"
                {...register("thesisDocument")}
              />
            </div>

            <div>
              <label>Upload Synopsis Document</label>
              <input
                className="upload_input"
                type="file"
                {...register("synopsisDocument")}
              />
            </div>
            <div>
              <label>Language</label>
              <select className="upload_input" {...register("language")}>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            <div>
              <label>Funding Sources</label>
              <input className="upload_input" {...register("fundingSources")} />
            </div>

            <div>
              <label>Acknowledgements</label>
              <textarea
                className="upload_input"
                {...register("acknowledgements")}
              />
            </div>

            <div>
              <label>References/Bibliography</label>
              <textarea className="upload_input" {...register("references")} />
            </div>

            <div className="checkbox-label">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              <span className="terms-label">
                I agree to the terms and conditions
              </span>
              {errors.terms && <span>This field is required</span>}
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
