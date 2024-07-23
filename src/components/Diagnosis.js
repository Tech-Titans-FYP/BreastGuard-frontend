import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { colors } from "../consts/Colors";
import watermark from "../assets/watermark.png";
import logo from "../assets/logo.png";

function Diagnosis() {
  const location = useLocation();
  const { result, formDetails, fileName, type } = location.state || {
    result: {},
    formDetails: {},
    fileName: "N/A",
    type: "N/A",
  };
  const uploadedImages =
    JSON.parse(sessionStorage.getItem("uploadedImage")) || [];

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
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        const pdfWidth = 210;
        const pdfHeight = 297;
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        if (imgHeight > pdfHeight) {
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
        } else {
          pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        }

        pdf.save("breast-cancer-analysis-report.pdf");
        elementsToHide.forEach((el) => (el.style.display = ""));
      })
      .catch((err) => {
        console.error("Could not generate the report pdf", err);
        elementsToHide.forEach((el) => (el.style.display = ""));
      });
  };

  const renderDiagnosisTable = () => {
    switch (type) {
      case "ultrasound":
        return (
          <>
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
                src={`data:image/png;base64,${uploadedImages[0]?.url || ""}`}
                alt="Original"
                style={{
                  width: "50%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/png;base64,N/A";
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Diagnosis Results
            </Typography>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                {result.classification && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      Classification:
                    </Typography>
                    <Typography>{result.classification}</Typography>
                  </>
                )}

                {result.classification !== "Normal" && (
                  <>
                    {result.subtype && (
                      <>
                        <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                          Diagnosis:
                        </Typography>
                        <Typography>{result.subtype}</Typography>
                      </>
                    )}
                    {result.subtype_description && (
                      <>
                        <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                          Description:
                        </Typography>
                        <Typography>{result.subtype_description}</Typography>
                      </>
                    )}
                    {result.features && (
                      <>
                        <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                          Features:
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Feature</TableCell>
                              <TableCell>Detail</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(result.features)
                              .filter(
                                ([_, detail]) => detail !== "Not specified"
                              )
                              .map(([feature, detail]) => (
                                <TableRow key={feature}>
                                  <TableCell>{feature}</TableCell>
                                  <TableCell>{detail}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </>
                    )}
                    {result.tumor_size_pixels && (
                      <>
                        <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                          Tumor Size:
                        </Typography>
                        <Typography>
                          {result.tumor_size_pixels} pixels
                        </Typography>
                        <Typography>
                          {result.tumor_size_mm2.toFixed(2)} mm²
                        </Typography>
                      </>
                    )}
                    {result.gradcam && (
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "70%",
                            maxHeight: "50vh",
                            overflow: "hidden",
                            // margin: "0 auto",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                            GRAD-CAM Visualization:
                          </Typography>
                          <img
                            src={`data:image/png;base64,${result.gradcam}`}
                            alt="Localized Lesion"
                            style={{
                              width: "auto",
                              maxHeight: "100%",
                              maxWidth: "100%",
                            }}
                          />
                        </Box>
                      </Grid>
                    )}
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      U-Net Segmentation Visualization
                    </Typography>
                    <Grid
                      container
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      spacing={2}
                    >
                      {[
                        result.processed_original_image,
                        result.processed_mask_image,
                        result.bounding_boxes_image,
                      ].map(
                        (imageSrc, index) =>
                          imageSrc && (
                            <Grid item xs={4} key={index}>
                              <Box
                                sx={{
                                  width: "100%",
                                  maxHeight: "50vh",
                                  overflow: "hidden",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                  border: "1px solid gray",
                                  marginY: "1rem",
                                }}
                              >
                                <img
                                  src={`data:image/png;base64,${imageSrc}`}
                                  alt={`Localized Lesion ${index + 1}`}
                                  style={{
                                    width: "auto",
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/png;base64,N/A";
                                  }}
                                />
                              </Box>
                            </Grid>
                          )
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        );
      case "mammogram":
        return (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
              Mammogram Specific Diagnosis Information:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Measurement</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Mammogram Specific Data</TableCell>
                  <TableCell>{result.mammogram_data || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        );
      case "mri":
        return (
          <>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Diagnosis Results
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Original Image:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "50vh",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${
                      uploadedImages[0]?.url || ""
                    }`}
                    alt="Original"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/png;base64,N/A";
                    }}
                  />
                </Box>
              </Grid>

              {result.gradcam_image && (
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
                      src={`data:image/png;base64,${result.gradcam_image}`}
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
              )}

              {result.segmented_image && (
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
              )}
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                {result.classification && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      Classification:
                    </Typography>
                    <Typography>{result.classification}</Typography>
                  </>
                )}

                {result.classification === "Malignant" &&
                  result.predicted_subtype && (
                    <>
                      <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                        Diagnosis:
                      </Typography>
                      <Typography>{fileName}</Typography>
                    </>
                  )}

                <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                  Recommendations:
                </Typography>
                <Typography>{diagnosisResult.recommendation}</Typography>
              </Grid>
            </Grid>

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
                  <TableCell>
                    {result.tumor_size_px?.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {result.tumor_size_mm?.toFixed(2) || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Tumor Size Category</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    {result.tumor_category || "N/A"}
                  </TableCell>
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
                  <TableCell>
                    {result.shape_features_px.area.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.area.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Perimeter</TableCell>
                  <TableCell>
                    {result.shape_features_px.perimeter.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.perimeter.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Aspect Ratio</TableCell>
                  <TableCell>
                    {result.shape_features_px.aspect_ratio.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.aspect_ratio.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Circularity</TableCell>
                  <TableCell>
                    {result.shape_features_px.circularity.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.circularity.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Major Axis</TableCell>
                  <TableCell>
                    {result.shape_features_px.MA.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.MA.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Minor Axis</TableCell>
                  <TableCell>
                    {result.shape_features_px.ma.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {result.shape_features_mm.ma.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Tumor Shape Category</b>
                  </TableCell>
                  <TableCell colSpan={2}>{result.shape_category}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        );
      case "histopathological":
        return (
          <>
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
                src={`data:image/png;base64,${uploadedImages[0]?.url || ""}`}
                alt="Original"
                style={{
                  width: "50%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/png;base64,N/A";
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Diagnosis Results
            </Typography>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                {result.classification && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      Classification:
                    </Typography>
                    <Typography>{result.classification}</Typography>
                  </>
                )}

                {result.subtype && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      Diagnosis:
                    </Typography>
                    <Typography>{result.subtype}</Typography>
                  </>
                )}

                {result.subtype_description && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      Description:
                    </Typography>
                    <Typography>{result.subtype_description}</Typography>
                  </>
                )}

                {result.features && result.features.length > 0 && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      Features:
                    </Typography>
                    <ul>
                      {result.features.map((feature, index) => (
                        <li key={index}>
                          <Typography>{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {result.features && result.features.length > 0 && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      Guidance:
                    </Typography>
                    <ul>
                      {result.guidance.map((guidance, index) => (
                        <li key={index}>
                          <Typography>{guidance}</Typography>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                  Recommendations:
                </Typography>
                <Typography>{diagnosisResult.recommendation}</Typography>
              </Grid>
              {result.gradcam && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "70%",
                      maxHeight: "50vh",
                      overflow: "hidden",
                      // margin: "0 auto",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                      GRAD-CAM Visualization:
                    </Typography>
                    <img
                      src={`data:image/png;base64,${result.gradcam}`}
                      alt="Localized Lesion"
                      style={{
                        width: "auto",
                        maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </>
        );
      default:
        return (
          <Typography>No specific diagnosis information available.</Typography>
        );
    }
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
              transform: "translate(-50%, -50%) rotate(-40deg)",
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
              Breast Guard: Breast Cancer Analysis PDF Report
            </Typography>
          </Box>

          <Box sx={{ mt: 3, px: 6, pb: 6, color: colors.darkNavy }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Patient Details
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Full Name: {formDetails?.fullName || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Age: {formDetails?.age || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>Gender: Female</Typography>

            {renderDiagnosisTable()}

            <hr />
            <Typography
              sx={{
                fontStyle: "italic",
                color: "gray",
              }}
            >
              It should be noted that the breastGuard team cannot be held
              responsible for any errors or inaccuracies in the automated
              generated reports. Use of the system is entirely at the user's own
              risk.
            </Typography>
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
