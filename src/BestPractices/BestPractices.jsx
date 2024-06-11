import React, { useState } from "react";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import "./BestPractices.css";
import { uploadDocument } from "../utils/apiUtils";

const UploadBestPractices = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [document, setDocument] = useState(null);

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("abstract", abstract);
    formData.append("keywords", keywords);
    formData.append("document", document);

    try {
      const response = await uploadDocument(formData);
      if (response.ok) {
        window.alert("Document uploaded successfully!");
        // Reset form
        setTitle("");
        setAuthor("");
        setCity("");
        setCountry("");
        setAbstract("");
        setKeywords("");
        setDocument(null);
      } else {
        const data = await response.json();
        window.alert("An error occurred: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      window.alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container upload-form">
      <div className="form-container">
        <h2>Upload Best Practices</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="abstract">Abstract</label>
            <textarea
              id="abstract"
              name="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="keywords">Keywords</label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="document">Document Upload</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="submit-container">
            <MDBBtn className="me-1 submit" type="submit">
              Upload
            </MDBBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBestPractices;
