import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './UploadDocument.css';
import { Link } from 'react-router-dom';

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  return (
    <Card sx={{ width: '50%', margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h5" component="div" className='resume'> 
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
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="resume-upload">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" variant="contained">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default UploadResume;
