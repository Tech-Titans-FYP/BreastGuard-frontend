import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types'; // for prop-types
import homeImage2 from "../assets/home_background2.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${homeImage2})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    color: "white",
    height: "60vh",
    position: "relative",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    padding: "10rem",
    marginTop: '-64px',
  },
};

function ImagePoweredAnalysis({ title, description }) {
  return (
    <Paper style={styles.paperContainer}>
      <Box sx={{
        borderRadius: 2,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
          {title}
        </Typography>
        
        {/* Subtitle/Description */}
        <Typography variant="h5" gutterBottom>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

// Prop types for documentation and validation
ImagePoweredAnalysis.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImagePoweredAnalysis;