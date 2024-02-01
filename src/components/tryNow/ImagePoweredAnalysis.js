import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import homeImage2 from "../../assets/home_background2.jpg"

const styles = {
  paperContainer: {
    backgroundImage: `url(${homeImage2})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    color: "white",
    height: "60vh",
    position: "relative",
    display: "flex",
    justifyContent: "left", // Align content vertically in the center
    alignItems: "center", // Align content horizontally in the center
    padding: "10rem",
    marginTop: '-64px',
  },
};

function ImagePoweredAnalysis() {
  return (
    <Paper style={styles.paperContainer}>
      <Box sx={{  // Example background color
        borderRadius: 2, // Adjust as per your design
        textAlign: 'center', // Center align the text
        position: 'relative', // For absolute positioning of elements inside the box
        overflow: 'hidden', // Ensures no overflow outside the border radius
      }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
          Breast Guard: Image-Powered Breast Cancer Analysis
        </Typography>
        
        {/* Subtitle/Description */}
        <Typography variant="subtitle1" gutterBottom>
          Seamlessly upload your breast images to our cutting-edge platform, enabling precise 
          classification, localization, and subtype identification for personalized insights into 
          your breast cancer condition.
        </Typography>
      </Box>
    </Paper>
  );
}

export default ImagePoweredAnalysis;