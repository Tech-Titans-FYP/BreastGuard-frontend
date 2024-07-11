import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography, Container, Grid, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
  const uploadedImages = JSON.parse(sessionStorage.getItem("uploadedImage")) || [];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
    const elementsToHide = reportElement.querySelectorAll(".hide-on-pdf");
    elementsToHide.forEach((el) => (el.style.display = "none"));

    html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdfWidth = 210;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
          compress: true,
        });
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
        pdf.save("breast-cancer-analysis-report.pdf");

        elementsToHide.forEach((el) => (el.style.display = ""));
      })
      .catch((err) => {
        console.error("Could not generate the report pdf", err);
        elementsToHide.forEach((el) => (el.style.display = ""));
      });
  };

  return (
    <Container>
      <style>{loadingAnimationStyle}</style>
      {loading ? (
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
              transform: "translate(-50%, -50%) rotate(-45deg)",
              opacity: 0.1,
              zIndex: 9,
              width: "60%",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <img
              src={watermark}
              alt="Watermark"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ backgroundColor: colors.darkNavy, p: 1 }}>
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
              sx={{
                fontWeight: "bold",
                color: "white",
                m: "1.5rem",
                textAlign: "center",
              }}
            >
              Breast Guard: Breast Cancer Analysis Report
            </Typography>
          </Box>

          <Box sx={{ mt: 3, pl: 6, pb: 6, color: colors.darkNavy }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Patient Details
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Full Name: {formDetails?.fullName || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Age: {formDetails?.age || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Gender: {formDetails?.gender || "N/A"}
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Diagnosis Results
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Original Breast Image:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "50vh",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${uploadedImages[0].url}`}
                    alt="Original"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Grad-CAM Visualization:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "50vh",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${result.gradcam}`}
                    alt="Grad-CAM"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Segmentation Visualization:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "50vh",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${result.segmented_image}`}
                    alt="Segmented"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container alignItems="flex-start" justifyContent="flex-start">
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Grid item>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Classification:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{result.classification || "N/A"}</Typography>
                  </Grid>
                </Grid>

                {result.classification === "Malignant" && (
                  <>
                    {/* <Grid container alignItems="flex-start" justifyContent="flex-start">
                      <Grid item xs={3}>
                        <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                          SubType Identification
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography sx={{ mb: 1, mt: 2 }}>
                          {result.predicted_subtype || "N/A"}
                        </Typography>
                      </Grid>
                    </Grid> */}

                    <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
                      Tumor Size Measurement:
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Measurement</TableCell>
                          <TableCell>Value (Pixels)</TableCell>
                          <TableCell>Value (mm)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Tumor Size</TableCell>
                          <TableCell>{result.tumor_size_px?.toFixed(2) || "N/A"}</TableCell>
                          <TableCell>{result.tumor_size_mm?.toFixed(2) || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Tumor Size Category</b></TableCell>
                          <TableCell colSpan={2}>{result.tumor_category || "N/A"}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
                      Tumor Shape Measurement:
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Measurement</TableCell>
                          <TableCell>Value (Pixels)</TableCell>
                          <TableCell>Value (mm)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Area</TableCell>
                          <TableCell>{result.shape_features_px.area.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.area.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Perimeter</TableCell>
                          <TableCell>{result.shape_features_px.perimeter.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.perimeter.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Aspect Ratio</TableCell>
                          <TableCell>{result.shape_features_px.aspect_ratio.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.aspect_ratio.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Circularity</TableCell>
                          <TableCell>{result.shape_features_px.circularity.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.circularity.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Major Axis</TableCell>
                          <TableCell>{result.shape_features_px.MA.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.MA.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Minor Axis</TableCell>
                          <TableCell>{result.shape_features_px.ma.toFixed(2)}</TableCell>
                          <TableCell>{result.shape_features_mm.ma.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Tumor Shape Category</b></TableCell>
                          <TableCell colSpan={2}>{result.shape_category}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      Recommendations:
                    </Typography>
                    <Typography>{diagnosisResult.recommendation}</Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ backgroundColor: colors.darkNavy, p: 1 }}>
            <Box
              component="img"
              src={logo}
              sx={{
                width: "15vw",
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
