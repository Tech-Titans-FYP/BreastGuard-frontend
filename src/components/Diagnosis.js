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
            <Typography sx={{ mb: 1 }}>
              Gender: {formDetails?.gender || "N/A"}
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
              <Grid item xs={7}>
                {result.classification && (
                  <>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      Classification:
                    </Typography>
                    <Typography>{result.classification}</Typography>
                  </>
                )}

                {result.classification && (
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
                <Grid item xs={5}>
                  <Box
                    sx={{
                      width: "70%",
                      maxHeight: "50vh",
                      overflow: "hidden",
                      margin: "0 auto",
                    }}
                  >
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

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              spacing={2}
            >
              {[
                result.processed_original_image,
                result.processed_mask_image,
              ].map(
                (imageSrc, index) =>
                  imageSrc && (
                    <Grid item xs={5} key={index}>
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

            <hr/>
            <Typography
            sx={{
              fontStyle: "italic",
              color: "gray"
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
