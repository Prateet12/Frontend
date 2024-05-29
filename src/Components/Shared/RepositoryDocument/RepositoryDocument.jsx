import React from "react";
import "./RepositoryDocument.css";
import pdfIcon from "../../Assets/pdf.png"; 

const RepositoryDocument = ({ link, title }) => {
  return (
    <div className="pdf">
      <div className="pdf-icon">
        <img src={pdfIcon} alt="PDF icon" />
      </div>
      <div className="pdf-link">
        <a href={link} className="link">
          {title ? title : "Document"}
        </a>
      </div>
    </div>
  );
};

export default RepositoryDocument;


