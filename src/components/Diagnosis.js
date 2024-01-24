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
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item container xs={12} spacing={3}>
          {/* Original Image */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Original Image
            </Typography>
            <Paper
              elevation={2}
              sx={{
                overflow: "hidden",
                padding: 1,
                backgroundColor: "transparent",
              }}
            >
              <img
                src={`data:image/png;base64,${uploadedImages[0].url}`}
                alt="Original"
                style={{ width: "100%", maxHeight: "57vh", height: "auto" }}
              />
            </Paper>
          </Grid>
          {/* Localization image */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Localized Lesion
            </Typography>
            <Paper
              elevation={2}
              sx={{
                overflow: "hidden",
                padding: 1,
                backgroundColor: "transparent",
              }}
            >
              <img
                src={`data:image/png;base64,${result.gradcam}`}
                alt="Localized Lesion"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
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
                <MenuItem value="processed_mask_image">
                  Processed Lesion
                </MenuItem>
              </Select>
            </FormControl>
            <Paper
              elevation={2}
              sx={{
                overflow: "hidden",
                backgroundColor: "transparent",
                maxHeight: "57vh",
              }}
            >
              <img
                src={`data:image/png;base64,${result[selectedImage]}`}
                alt="Processed Lesion"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
        </Grid>
        {/* Diagnosis Result Card */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: "#00A79D",
              color: "white",
              mb: 3,
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
