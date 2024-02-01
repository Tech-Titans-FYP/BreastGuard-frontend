import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography, Container, Grid, Box } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { colors } from "../consts/Colors";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";

function Diagnosis() {
  const location = useLocation();
  const { result, formDetails } = location.state || {
    result: {},
    formDetails: {},
  };
  const uploadedImages =
    JSON.parse(sessionStorage.getItem("uploadedImage")) || [];

  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    // Simulate a loading process here
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading state after a delay
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Include your logo and apply animation styles
  const loadingAnimationStyle = `
    .center {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .wave {
      width: 5px;
      height: 100px;
      background: linear-gradient(45deg, cyan, #00A79D);
      margin: 10px;
      animation: wave 1s linear infinite;
      border-radius: 20px;
    }
    .wave:nth-child(2) {
      animation-delay: 0.1s;
    }
    .wave:nth-child(3) {
      animation-delay: 0.2s;
    }
    .wave:nth-child(4) {
      animation-delay: 0.3s;
    }
    .wave:nth-child(5) {
      animation-delay: 0.4s;
    }
    .wave:nth-child(6) {
      animation-delay: 0.5s;
    }
    .wave:nth-child(7) {
      animation-delay: 0.6s;
    }
    .wave:nth-child(8) {
      animation-delay: 0.7s;
    }
    .wave:nth-child(9) {
      animation-delay: 0.8s;
    }
    .wave:nth-child(10) {
      animation-delay: 0.9s;
    }    
    @keyframes wave {
      0% { transform: scale(0); }
      50% { transform: scale(1); }
      100% { transform: scale(0); }
    }
  `;

  const diagnosisResult = {
    recommendation:
      "Consultation with an oncologist is recommended for further treatment planning.",
  };

  const downloadReport = () => {
    const reportElement = document.getElementById("reportArea");

    // Temporarily hide elements that should not be in the PDF
    const elementsToHide = reportElement.querySelectorAll(".hide-on-pdf");
    elementsToHide.forEach((el) => (el.style.display = "none"));

    const canvasOptions = {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: true,
    };

    html2canvas(reportElement, canvasOptions)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
          putOnlyUsedFonts: true,
          compress: true,
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);

        pdf.save("breast-cancer-analysis-report.pdf");

        // Restore hidden elements after capturing
        elementsToHide.forEach((el) => (el.style.display = ""));
      })
      .catch((err) => {
        console.error("Could not generate the report pdf", err);
        // Restore hidden elements if there's an error
        elementsToHide.forEach((el) => (el.style.display = ""));
      });
  };

  return (
    <Container>
      <style>{loadingAnimationStyle}</style>
      {loading ? (
        // Display the loading animation if in loading state
        <div className="center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      ) : (
        <Paper elevation={3} sx={{ mx: 10, my: 2 }} id="reportArea">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-45deg)", // Add rotation here
              opacity: 0.1, // Set the opacity of the watermark
              zIndex: 9, // Ensure it's above the content but below the PDF download icon
            }}
          >
            <img
              src={watermark}
              alt="Watermark"
              style={{
                // maxWidth: "100%", // You can set a specific size if you prefer
                // maxHeight: "100%",
                objectFit: "contain", // This will ensure the image is contained within its element and not stretched
              }}
            />
          </Box>
          <Box sx={{ backgroundColor: colors.darkNavy, p: 3 }}>
            <FileDownloadOutlinedIcon
              onClick={downloadReport}
              sx={{
                cursor: "pointer",
                color: "#00A79D",
                fontSize: "2rem",
              }}
              className="hide-on-pdf"
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "white", m: "1.5rem" }}
            >
              Breast Guard: PDF Report
            </Typography>
          </Box>

          <Box sx={{ mt: 3, pl: 6, color: colors.darkNavy }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Patient Details
            </Typography>
            {/* ... other content ... */}
            <Typography sx={{ mb: 1 }}>
              Full Name: {formDetails.fullName || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Age: {formDetails.age || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Gender: {formDetails.gender || "N/A"}
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Original Breast Image
            </Typography>
            <Box
              sx={{
                width: "50%",
                maxHeight: "50vh",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <img
                src={`data:image/png;base64,${uploadedImages[0].url}`}
                alt="Original Image"
                style={{
                  width: "50%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Diagnosis Results
            </Typography>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={7}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Classification:
                </Typography>
                <Typography>{result.classification || "N/A"}</Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                  Diagnosis:
                </Typography>
                <Typography>{result.subtype || "N/A"}</Typography>

                <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                  Description:
                </Typography>
                <Typography>{result.subtype_description || "N/A"}</Typography>

                <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                  Recommendations:
                </Typography>
                <Typography>{diagnosisResult.recommendation}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    width: "70%", // This will now take up 100% of the Grid item
                    maxHeight: "50vh",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${result.gradcam}`}
                    alt="Localized Lesion"
                    style={{
                      width: "auto", // Auto width for maintaining aspect ratio
                      maxHeight: "100%", // Maximum height is 100% of the container
                      maxWidth: "100%", // Maximum width is 100% of the container
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              spacing={2}
            >
              {" "}
              {/* spacing={2} adds a gap */}
              {[
                result.processed_original_image,
                result.processed_mask_image,
              ].map((imageSrc, index) => (
                <Grid item xs={5} key={index}>
                  {" "}
                  {/* xs={6} ensures that the items take up half the width of the container */}
                  <Box
                    sx={{
                      width: "100%", // Take up 100% of the Grid item
                      maxHeight: "50vh",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "flex-start", // Align image horizontally to the start
                      alignItems: "flex-start", // Align image vertically to the start
                      border: "1px solid gray",
                      marginY: "1rem",
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${imageSrc}`}
                      alt={`Localized Lesion ${index + 1}`}
                      style={{
                        width: "auto", // Auto width for maintaining aspect ratio
                        maxHeight: "100%", // Maximum height is 100% of the container
                        maxWidth: "100%", // Maximum width is 100% of the container
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ backgroundColor: colors.darkNavy, p: 3 }}>
            <Box
              component="img"
              src={logo}
              sx={{
                width: "20vw",
                height: "auto",
                maxHeight: "100%",
                display: "block",
                margin: "auto",
              }}
            />
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Diagnosis;
