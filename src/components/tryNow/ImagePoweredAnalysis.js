import React from 'react';
import { Typography, Box, Container } from '@mui/material';

function ImagePoweredAnalysis() {
  return (
    <Container>
      <Box sx={{  // Example background color
        borderRadius: 2, // Adjust as per your design
        padding: 4, // Adjust padding as needed
        textAlign: 'center', // Center align the text
        position: 'relative', // For absolute positioning of elements inside the box
        overflow: 'hidden', // Ensures no overflow outside the border radius
      }}>
        {/* Title */}
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#0C6872' }}>
          Breast Guard: Image-Powered Breast Cancer Analysis
        </Typography>
        
        {/* Subtitle/Description */}
        <Typography variant="subtitle1" gutterBottom>
          Seamlessly upload your breast images to our cutting-edge platform, enabling precise 
          classification, localization, and subtype identification for personalized insights into 
          your breast cancer condition.
        </Typography>
      </Box>
    </Container>
  );
}

export default ImagePoweredAnalysis;