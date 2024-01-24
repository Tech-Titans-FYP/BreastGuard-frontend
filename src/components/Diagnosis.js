import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

function Diagnosis() {
  const location = useLocation();
  const { result } = location.state || { result: {} };
  const uploadedImages =
    JSON.parse(sessionStorage.getItem("uploadedImage")) || [];
  console.log(uploadedImages);
  const [selectedImage, setSelectedImage] = useState(
    "processed_original_image"
  );

  const handleChange = (event) => {
    setSelectedImage(event.target.value);
  };

  // Example data structure for diagnosis result, replace with actual data as needed
  const diagnosisResult = {
    recommendation:
      "Consultation with an oncologist is recommended for further treatment planning.",
  };

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          {/* Uploaded image(s) */}
          {uploadedImages &&
            uploadedImages.map((image, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // width: "100%", // Set width to 100% to fill the container
                  maxHeight: "auto", // Adjust height to be automatic
                  overflow: "hidden",
                  m: 2,
                  backgroundColor: "transparent",
                  // border: "1px solid #00A79D",
                }}
              >
                <img
                  src={`data:image/png;base64,${image.url}`}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "auto", // Max width to 100% to fill the paper
                    maxHeight: "65vh", // Adjust height to be automatic
                  }}
                />
              </Paper>
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Localization image */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // width: "100%", // Set width to 100% to fill the container
              height: "auto", // Adjust height to be automatic
              overflow: "hidden",
              m: 2,
              backgroundColor: "#transparent",
              // border: "1px solid #00A79D",
            }}
          >
            {/* Render the Grad-CAM image */}
            {result.gradcam && (
              <img
                src={`data:image/png;base64,${result.gradcam}`}
                alt="Localization"
                style={{
                  // maxWidth: "100%", // Max width to 100% to fill the paper
                  maxHeight: "100%", // Adjust max height to be 100%
                  height: "auto", // Adjust height to be automatic
                }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Select the task:
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedImage}
              onChange={handleChange}
              label="Image Type"
            >
              <MenuItem value="processed_original_image">
                Original Lesion
              </MenuItem>
              <MenuItem value="processed_mask_image">Processed Lesion</MenuItem>
            </Select>
          </FormControl>

          {/* Display selected image */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // width: "100%",
              height: "auto",
              overflow: "hidden",
              m: 2,
              backgroundColor: "transparent",
              // border: "1px solid #00A79D",
            }}
          >
            <img
              src={`data:image/png;base64,${result[selectedImage]}`}
              alt={`${selectedImage} visualization`}
              style={{
                maxWidth: "100%",
                maxHeight: "65vh",
                height: "auto",
              }}
            />
          </Paper>
        </Grid>
        {/* Diagnosis Result Card */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: "#00A79D",
              color: "white",
              mb: 2,
            }}
          >
            {result && (
              <>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Classification:
                </Typography>
                <Typography>{result.classification}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Diagnosis:
                </Typography>
                <Typography>{result.subtype}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Description:
                </Typography>
                <Typography>{result.subtype_description}</Typography>
              </>
            )}

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Recommendations:
            </Typography>
            <Typography>{diagnosisResult.recommendation}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Diagnosis;
