import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "./BestPractices.css";
import { uploadDocument } from "../utils/apiUtils";

const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivali",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Prayagraj",
  "Howrah",
  "Ranchi",
  "Jabalpur",
  "Gwalior",
  "Coimbatore",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
];

const UploadBestPractices = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [document, setDocument] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [keywordMessage, setKeywordMessage] = useState("At least 5 keywords are required");

  const validateKeywords = (value) => {
    const keywordsArray = value.split(",").map((kw) => kw.trim()).filter(Boolean);
    if (keywordsArray.length < 5) {
      setKeywordMessage("At least 5 keywords are required");
      return false;
    } else {
      setKeywordMessage("");
      return true;
    }
  };

  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    setKeywords(value);
    validateKeywords(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "doc", "docx"].includes(fileType)) {
        alert("Please select a PDF, DOC, or DOCX file.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB. Please upload a smaller file.");
        return;
      }
      setDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateKeywords(keywords)) {
      alert("At least 5 keywords are required.");
      return;
    }

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
        setCountry("India");
        setAbstract("");
        setKeywords("");
        setDocument(null);
        setAllFieldsFilled(false); // Reset the flag
      } else {
        const data = await response.json();
        window.alert("An error occurred: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      window.alert("An error occurred. Please try again later.");
    }
  };

  const checkAllFields = () => {
    if (
      title.trim() &&
      author.trim() &&
      city.trim() &&
      abstract.trim() &&
      keywords.trim() &&
      validateKeywords(keywords) &&
      document
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    checkAllFields();
  }, [title, author, city, country, abstract, keywords, document]);

  return (
    <div className="container upload-form uploadBestPractices">
      <div className="form-container">
        <h2>UPLOAD BEST PRACTICES</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
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
            <label htmlFor="author">
              Author <span className="required">*</span>
            </label>
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
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>
                Select a city
              </option>
              {indianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="abstract">
              Abstract <span className="required">*</span>
            </label>
            <textarea
              id="abstract"
              name="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="keywords">
              Keywords (At least 5 keywords required) <span className="required">*</span>
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={keywords}
              onChange={handleKeywordsChange}
              required
            />
            {keywordMessage && <p className="error-message">{keywordMessage}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="document">
              Document Upload <span className="required">*</span>
            </label>
            <input
              type="file"
              id="document"
              name="document"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </div>
          {allFieldsFilled && (
            <div className="submit-container">
              <MDBBtn className="me-1 submit" type="submit">
                Upload
              </MDBBtn>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadBestPractices;
