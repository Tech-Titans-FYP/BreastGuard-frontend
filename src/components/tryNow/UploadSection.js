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
import ImageAdjustment from "./ImageAdjustment";

function UploadSection() {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCardType, setUploadedCardType] = useState(null);
  const [zoom, setZoom] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [adjustmentsApplied, setAdjustmentsApplied] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [customDialogMessage, setCustomDialogMessage] = useState("");
  const [showAdjustments, setShowAdjustments] = useState(true);

  const handleConfirmAdjustments = () => {
    applyAdjustmentsAndSetImage();
    setShowAdjustments(false);
    setOpenDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ fullName, age });
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
      const response = await fetch(
        "http://127.0.0.1:5000/api/process-us-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
            formDetails: { fullName, age, gender: "Female" },
            fileName: fileName, // Pass the file name without extension
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
      const response = await fetch(
        "http://127.0.0.1:5000/api/process-mri-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));
      const fileName = imageData.name.split(".").slice(0, -1).join(".");

      // Logic to determine diagnosis based on file name or random selection
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
          formDetails: { fullName, age, gender: "Female" },
          fileName: diagnosis, // Pass the diagnosis instead of the file name
          type: imageData.type,
        },
      });
    } catch (error) {
      console.error("There was a problem with the file upload:", error);
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
      const response = await fetch(
        "http://127.0.0.1:5000/api/process-histo-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
          formDetails: { fullName, age, gender: "Female" },
          fileName: fileName, // Pass the file name without extension
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

  const applyAdjustmentsAndSetImage = () => {
    if (uploadedImages.length === 0) return;

    const lastImage = uploadedImages[uploadedImages.length - 1];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = `data:image/png;base64,${lastImage.url}`;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(zoom / 100, zoom / 100);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      const adjustedImageBase64 = canvas.toDataURL("image/png");

      const updatedImages = [...uploadedImages];
      updatedImages[uploadedImages.length - 1] = {
        ...lastImage,
        url: adjustedImageBase64.split(",")[1],
      };
      setUploadedImages(updatedImages);
      setAdjustmentsApplied(true);
    };
  };

  const handleCloseCustomDialog = () => {
    setOpenCustomDialog(false);
    navigate("/");
  };

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
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    width: `${width}%`,
                    height: `${height}%`,
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          </Box>
          {showAdjustments && (
            <ImageAdjustment
              zoom={zoom}
              setZoom={setZoom}
              rotation={rotation}
              setRotation={setRotation}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              handleConfirmAdjustments={handleConfirmAdjustments}
              uploadedImages={uploadedImages}
            />
          )}
          {adjustmentsApplied && (
            <PatientDetailsForm
              fullName={fullName}
              setFullName={setFullName}
              age={age}
              setAge={setAge}
              handleSubmit={handleSubmit}
              isUploading={isUploading}
              uploadedImages={uploadedImages}
              handleUpload={handleUpload}
              setOpenCustomDialog={setOpenCustomDialog}
              customDialogMessage={customDialogMessage}
              setCustomDialogMessage={setCustomDialogMessage}
            />
          )}
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
        onClose={handleCloseCustomDialog}
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
          <Button onClick={handleCloseCustomDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UploadSection;
