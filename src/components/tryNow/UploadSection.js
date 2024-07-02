//UploadSelection code

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
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0); // Degrees
  const [adjustmentsApplied, setAdjustmentsApplied] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [customDialogMessage, setCustomDialogMessage] = useState("");

  const handleConfirmAdjustments = () => {
    applyAdjustmentsAndSetImage(); // This will apply the adjustments and open the form
    setOpenDialog(false); // Close the dialog
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the form data
    console.log({ fullName, age, gender });
    // You may want to send this data to a backend or process it further
  };

  // Apply styles for zoom and rotation to the image
  const imageStyles = {
    maxWidth: "100%",
    maxHeight: "300px",
    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
    transformOrigin: "center",
    transition: "transform 0.3s ease",
  };

  const handleUploadMammogram = async (imageData) => {
    // if image type is mammogram then do, navigate to the /results page and print the result
  };

  const handleUploadUltrasound = async (imageData) => {
    setIsUploading(true);

    // Use the imageData directly if it's already the base64 string, otherwise extract it
    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    console.log("Base64 URL:", base64Url);

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    // Log the payload to confirm it's correct before sending
    console.log("Payload to send:", payload); // This will format the log for better readability

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

      // if (!response.ok) {
      //   throw new Error(`HTTP error: ${response.status}`);
      // }

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setIsUploading(false);
        if (result.message) {
          // Set the message and show the dialog
          setCustomDialogMessage(result.message);
          setOpenCustomDialog(true);
        }
      } else {
        // Save the base64 image data to sessionStorage
        sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));
        // Navigate to the diagnosis page with the server's result
        navigate("/diagnosis", {
          state: {
            result: result,
            formDetails: { fullName, age, gender },
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

    // Use the imageData directly if it's already the base64 string, otherwise extract it
    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    console.log("Base64 URL:", base64Url);

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    // Log the payload to confirm it's correct before sending
    console.log("Payload to send:", payload); // This will format the log for better readability

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

      // Save the base64 image data to sessionStorage
      sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));

      navigate("/diagnosis", {
        state: { result: result },
      });
    } catch (error) {
      console.error("There was a problem with the file upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadHistopathological = async (imageData) => {
    setIsUploading(true);

    // Use the imageData directly if it's already the base64 string, otherwise extract it
    const base64Url = imageData.url.startsWith("data:")
      ? imageData.url.split(",")[1]
      : imageData.url;

    console.log("Base64 URL:", base64Url);

    const payload = {
      image: [
        {
          url: base64Url,
          type: imageData.type,
          size: imageData.size,
        },
      ],
    };

    // Log the payload to confirm it's correct before sending
    console.log("Payload to send:", payload); // This will format the log for better readability

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

      // Save the base64 image data to sessionStorage
      sessionStorage.setItem("uploadedImage", JSON.stringify(uploadedImages));

      navigate("/diagnosis", {
        state: {
          result: result,
          formDetails: { fullName, age, gender }, // Assuming these state variables hold your form data
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
    // Determine the type of image and call the appropriate upload function
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

  // Update the acceptedFiles to an array of file types
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

  // Assuming you have a function to trigger this conversion
  const applyAdjustmentsAndSetImage = () => {
    // Ensure there's an image to adjust
    if (uploadedImages.length === 0) return;

    const lastImage = uploadedImages[uploadedImages.length - 1];

    // Create an off-screen canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Create a new Image object
    const image = new Image();
    image.src = `data:image/png;base64,${lastImage.url}`;
    image.onload = () => {
      // Set canvas size to the image size
      canvas.width = image.width;
      canvas.height = image.height;

      // Apply zoom and rotation
      // Note: You might need to adjust the canvas size and image position based on the rotation
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(zoom / 100, zoom / 100);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      // Convert canvas to base64 string
      const adjustedImageBase64 = canvas.toDataURL("image/png");

      // Update the uploadedImages with this new base64 string
      // Assuming you want to replace the last image, or you can push a new entry
      const updatedImages = [...uploadedImages];
      updatedImages[uploadedImages.length - 1] = {
        ...lastImage,
        url: adjustedImageBase64.split(",")[1], // Update with new base64 content, removing the Data URL scheme
      };
      setUploadedImages(updatedImages);
      setAdjustmentsApplied(true);
    };
  };

  return (
    <Container maxWidth="lg">
      {uploadedCardType ? (
        // If an image has been uploaded, display the image and the button only
        <>
          {/* Render the uploaded image */}
          {uploadedImages.map((image, index) => (
            <Box key={index} sx={{ textAlign: "center", margin: 5 }}>
              <img
                src={`data:image/png;base64,${image.url}`}
                alt={image.name}
                style={imageStyles}
              />
            </Box>
          ))}
          {/* Sliders for zoom and rotation */}
          <ImageAdjustment
            zoom={zoom}
            setZoom={setZoom}
            rotation={rotation}
            setRotation={setRotation}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleConfirmAdjustments={handleConfirmAdjustments}
            uploadedImages={uploadedImages}
          />

          {/* Conditionally render the new form section */}
          {adjustmentsApplied && (
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
              handleUpload={() => {
                const lastImage = uploadedImages[uploadedImages.length - 1];
                handleUpload(lastImage.type);
              }}
              openCustomDialog={openCustomDialog}
              setOpenCustomDialog={setOpenCustomDialog}
              customDialogMessage={customDialogMessage}
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
            // Render only if no card type has been uploaded or if the current card's type was uploaded
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
                    onUpload={setUploadedCardType} // Set the uploaded card type
                  />
                </Grid>
              );
            }
            return null; // Do not render the other cards
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
