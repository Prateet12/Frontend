import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./UploadResume.css";
import { useForm } from "react-hook-form";
import { uploadDocument } from "../utils/apiUtils";

const createFormData = (data, file) => {
  const formData = new FormData();
  const user = JSON.parse(localStorage.getItem("user")).user;
  const degree_program = user.degree_program
    ? user.degree_program
    : JSON.parse(localStorage.getItem("role")).role;
  console.log("User:", user);
  formData.append("fromUser", user.id);
  formData.append("fileType", "Resume");
  formData.append("title", user.name + " resume");
  formData.append("author", user.name);
  formData.append("abstract", user.name + " resume");
  formData.append("degree_program", degree_program);
  formData.append("files", file);
  console.log("Form data:", formData);
  return formData;
};

const UploadResume = () => {
  const { handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    // Call your API to upload the form data here
    await uploadDocument(createFormData(data, selectedFile));
    // Clear the form and file input
    setSelectedFile(null);
    reset();
  };

  return (
    <div className="uploadResume">
<form onSubmit={handleSubmit(onSubmit)} className="upload-document-form">
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" className="resume">
            UPLOAD YOUR RESUME
          </Typography>

          {selectedFile && (
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Selected File: {selectedFile.name}
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <input
              type="file"
              id="resume-upload"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <label htmlFor="resume-upload">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small" variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
    </div>
    
  );
};

export default UploadResume;
