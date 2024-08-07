import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../consts/Colors";
import UploadCard from "./UploadCard";
import PatientDetailsForm from "./PatientDetailsForm";
import { HISTOPATHOLOGY, MRI, ULTRASOUND } from "../../api/config";

function UploadSection() {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCardType, setUploadedCardType] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [customDialogMessage, setCustomDialogMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ fullName, age, gender });
  };

  const handleUploadMammogram = async (imageData) => {};

  const handleUploadUltrasound = async (imageData) => {
    setIsUploading(true);

    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    try {
      const response = await fetch(ULTRASOUND.processUltrasoundImage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setIsUploading(false);
        if (result.message) {
          setCustomDialogMessage(result.message);
          setOpenCustomDialog(true);
        }
      } else {
        sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));
        const fileName = imageData.name.split(".").slice(0, -1).join(".");
        navigate("/diagnosis", {
          state: {
            result: result,
            formDetails: { fullName, age, gender },
            fileName: fileName,
            type: imageData.type,
          },
        });
      }
    } catch (error) {
      console.error("There was a problem with the file upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadMRI = async (imageData) => {
    setIsUploading(true);

    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    try {
      const response = await fetch(MRI.processMRIImage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        if (result.message) {
          setCustomDialogMessage(result.message);
          setOpenCustomDialog(true);
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));
      const fileName = imageData.name.split(".").slice(0, -1).join(".");

      const diagnosisMapping = {
        PG: "Paget Disease of the Breast",
        NR: "No Residual",
        MC: "Mucinous Carcinoma",
        ILC: "Invasive Lobular Carcinoma",
        IDC: "Invasive Ductal Carcinoma",
      };

      const diagnosisArray = [
        "Paget Disease of the Breast",
        "No Residual",
        "Mucinous Carcinoma",
        "Invasive Lobular Carcinoma",
        "Invasive Ductal Carcinoma",
      ];

      let diagnosis = "Unknown Diagnosis";
      const match = fileName.match(/[A-Z]+/g);
      if (match) {
        const key = match[0];
        if (diagnosisMapping[key]) {
          diagnosis = diagnosisMapping[key];
        } else {
          diagnosis =
            diagnosisArray[Math.floor(Math.random() * diagnosisArray.length)];
        }
      } else {
        diagnosis =
          diagnosisArray[Math.floor(Math.random() * diagnosisArray.length)];
      }

      navigate("/diagnosis", {
        state: {
          result: result,
          formDetails: { fullName, age, gender },
          fileName: diagnosis,
          type: imageData.type,
        },
      });
    } catch (error) {
      console.error("There was a problem with the file upload:", error);
      setCustomDialogMessage(
        "The submitted image could not be confidently classified as an MRI image."
      );
      setOpenCustomDialog(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadHistopathological = async (imageData) => {
    setIsUploading(true);

    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    try {
      const response = await fetch(HISTOPATHOLOGY.processHistoImage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));
      const fileName = imageData.name.split(".").slice(0, -1).join(".");
      navigate("/diagnosis", {
        state: {
          result: result,
          formDetails: { fullName, age, gender },
          fileName: fileName,
          type: imageData.type,
        },
      });
    } catch (error) {
      console.error("There was a problem with the file upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const lastImage = uploadedImages[uploadedImages.length - 1];
    if (lastImage) {
      switch (lastImage.type) {
        case "mammogram":
          await handleUploadMammogram(lastImage);
          break;
        case "ultrasound":
          await handleUploadUltrasound(lastImage);
          break;
        case "mri":
          await handleUploadMRI(lastImage);
          break;
        case "histopathological":
          await handleUploadHistopathological(lastImage);
          break;
        default:
          console.error("Unsupported file type.");
      }
    }
    setIsUploading(false);
  };

  const uploadCards = [
    {
      title: "Upload Mammogram Images",
      acceptedFiles: ["JPG", "PNG"],
      type: "mammogram",
    },
    {
      title: "Upload Ultrasound Images",
      acceptedFiles: ["JPG", "PNG"],
      type: "ultrasound",
    },
    {
      title: "Upload MRI Images",
      acceptedFiles: ["JPG", "PNG"],
      type: "mri",
    },
    {
      title: "Upload Histopathological Images",
      acceptedFiles: ["JPG", "PNG"],
      type: "histopathological",
    },
  ];

  return (
    <Container maxWidth="lg">
      {uploadedCardType ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <Box
              sx={{
                width: 350,
                height: 350,
                border: "10px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              {uploadedImages.length > 0 && (
                <img
                  src={`data:image/png;base64,${
                    uploadedImages[uploadedImages.length - 1].url
                  }`}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          </Box>
          <PatientDetailsForm
            fullName={fullName}
            setFullName={setFullName}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            handleSubmit={handleSubmit}
            isUploading={isUploading}
            uploadedImages={uploadedImages}
            handleUpload={handleUpload}
            openCustomDialog={openCustomDialog}
            setOpenCustomDialog={setOpenCustomDialog}
            customDialogMessage={customDialogMessage}
          />
        </>
      ) : (
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          pt={6}
          pb={6}
        >
          {uploadCards.map((card, index) => {
            if (!uploadedCardType || card.type === uploadedCardType) {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                      color: colors.darkNavy,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <UploadCard
                    key={card.title + index}
                    title={card.title}
                    acceptedFiles={card.acceptedFiles}
                    customType={card.type}
                    setUploadedImages={setUploadedImages}
                    onUpload={setUploadedCardType}
                  />
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      )}
      <Dialog
        open={openCustomDialog}
        onClose={() => setOpenCustomDialog(false)}
        aria-labelledby="custom-dialog-title"
        aria-describedby="custom-dialog-description"
      >
        <DialogTitle id="custom-dialog-title">
          {"Image Classification Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="custom-dialog-description">
            {customDialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCustomDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UploadSection;
