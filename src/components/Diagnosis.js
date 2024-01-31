import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import footerLine from "../assets/footer line.png";
import watermark from "../assets/logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function Diagnosis() {
  const location = useLocation();
  const { result } = location.state || { result: {} };
  const uploadedImages =
    JSON.parse(sessionStorage.getItem("uploadedImage")) || [];
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
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

  const handleOpenModal = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        <Paper elevation={3} sx={{ p: 2, m: 3 }} id="reportArea">
          <FileDownloadOutlinedIcon
            onClick={downloadReport}
            sx={{
              cursor: "pointer",
              color: "#00A79D",
              fontSize: "2rem",
            }}
            className="hide-on-pdf"
          />
          <Box
            component="img"
            src={footerLine}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "100%",
            }}
          />
          <Box component="img" src={watermark} sx={watermarkStyle} />
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "#0C6872", marginY: "1.5rem" }}
          >
            Breast Guard: Breast Cancer Analysis Report
          </Typography>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  backgroundColor: "#00A79D",
                  border: "1px solid #00A79D"
                }}
              >
                <CardMedia
                  component="img"
                  image={`data:image/png;base64,${uploadedImages[0].url}`}
                  alt="Original Image"
                  sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    align="center"
                    color="white"
                  >
                    Original Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  backgroundColor: "#00A79D",
                  border: "1px solid #00A79D"
                }}
              >
                <CardMedia
                  component="img"
                  image={`data:image/png;base64,${result.gradcam}`}
                  alt="Localized Lesion"
                  sx={{ width: "100%", height: "auto", maxHeight: "45vh" }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      align="center"
                      color="white"
                    >
                      Localized Lesion
                    </Typography>
                    <IconButton
                      onClick={() => handleOpenModal(result.gradcam)}
                      className="hide-on-pdf"
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  backgroundColor: "#00A79D",
                  border: "1px solid #00A79D"
                }}
              >
                <CardMedia
                  component="img"
                  image={`data:image/png;base64,${result.processed_original_image}`}
                  alt="Original Lesion"
                  sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      align="center"
                      color="white"
                    >
                      Original Lesion
                    </Typography>

                    <IconButton
                      onClick={() =>
                        handleOpenModal(result.processed_original_image)
                      }
                      className="hide-on-pdf"
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  backgroundColor: "#00A79D",
                  border: "1px solid #00A79D"
                }}
              >
                <CardMedia
                  component="img"
                  image={`data:image/png;base64,${result.processed_mask_image}`}
                  alt="Original Lesion"
                  sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      align="center"
                      color="white"
                    >
                      Mask Lesion
                    </Typography>

                    <IconButton
                      onClick={() =>
                        handleOpenModal(result.processed_mask_image)
                      }
                      className="hide-on-pdf"
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img
                src={`data:image/png;base64,${modalImage}`}
                alt="Enlarged Diagnostic"
                style={{ width: "100%", maxHeight: "50vh", overflow: "auto" }} // Ensures image is not taller than viewport
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Positions the Close button at the end of the container
                  p: 1, // Adds padding around the Close button for better visibility
                }}
              >
                <Button onClick={handleCloseModal} sx={{ zIndex: 10 }}>
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>

          <Box sx={{ backgroundColor: "#00A79D", mt: 3, p: 2, color: "white" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Classification:
            </Typography>
            <Typography>{result.classification || "N/A"}</Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
              Diagnosis:
            </Typography>
            <Typography>{result.subtype || "N/A"}</Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
              Description:
            </Typography>
            <Typography>{result.subtype_description || "N/A"}</Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
              Recommendations:
            </Typography>
            <Typography>{diagnosisResult.recommendation}</Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Diagnosis;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 3,
};

const watermarkStyle = {
  opacity: 0.5, // Adjust the watermark opacity
  width: 300, // Adjust the watermark size
  height: "auto",
  margin: "auto",
  display: "block",
};
