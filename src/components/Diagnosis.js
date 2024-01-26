import React, { useState } from "react";
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
import html2canvas from "html2canvas";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function Diagnosis() {
  const location = useLocation();
  const { result } = location.state || { result: {} };
  const uploadedImages =
    JSON.parse(sessionStorage.getItem("uploadedImage")) || [];
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

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
    setIsCapturing(true);
    const reportElement = document.getElementById("reportArea");

    html2canvas(reportElement)
      .then((canvas) => {
        // Create a link element for download
        const link = document.createElement("a");
        link.download = "breast-cancer-analysis-report.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        setIsCapturing(false);
      })
      .catch((err) => {
        console.error("Could not generate the report image", err);
        setIsCapturing(false);
      });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, m: 3 }} id="reportArea">
        {!isCapturing && (
          <FileDownloadOutlinedIcon
            onClick={downloadReport}
            sx={{
              cursor: "pointer",
              color: "#00A79D",
              fontSize: "2rem",
            }}
          />
        )}
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
          Breast Guard: Breast Cancer Analysis Certificate
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#E8F0F2",
              }}
            >
              <CardMedia
                component="img"
                image={`data:image/png;base64,${uploadedImages[0].url}`}
                alt="Original Image"
                sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" align="center">
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
                backgroundColor: "#E8F0F2",
              }}
            >
              <CardMedia
                component="img"
                image={`data:image/png;base64,${result.gradcam}`}
                alt="Localized Lesion"
                sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="subtitle1" align="center">
                    Localized Lesion
                  </Typography>
                  {!isCapturing && (
                    <IconButton onClick={() => handleOpenModal(result.gradcam)}>
                      <ZoomInIcon />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#E8F0F2",
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
                  <Typography gutterBottom variant="subtitle1" align="center">
                    Original Lesion
                  </Typography>

                  {!isCapturing && (
                    <IconButton
                      onClick={() =>
                        handleOpenModal(result.processed_original_image)
                      }
                    >
                      <ZoomInIcon />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#E8F0F2",
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
                  <Typography gutterBottom variant="subtitle1" align="center">
                    Mask Lesion
                  </Typography>

                  {!isCapturing && (
                    <IconButton
                      onClick={() =>
                        handleOpenModal(result.processed_mask_image)
                      }
                    >
                      <ZoomInIcon />
                    </IconButton>
                  )}
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
              style={{ width: "100%" }}
            />
            <Button onClick={handleCloseModal}>Close</Button>
          </Box>
        </Modal>

        <Box sx={{ backgroundColor: "#E8F0F2", mt: 3, p: 2 }}>
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
