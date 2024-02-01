import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Stack,
  Chip,
  Grid,
  Container,
  Slider,
  FormControlLabel,
  Checkbox,
  TextField,
  FormGroup,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { colors } from "../../consts/Colors";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function UploadCard({
  acceptedFiles,
  setUploadedImages,
  customType,
  onUpload,
}) {
  // State to manage file upload progress and status
  const [fileData, setFileData] = useState({
    name: "",
    status: "idle", // can be 'idle', 'uploading', or 'completed'
    progress: 0,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null); // State for storing image preview

  const uploadIntervalRef = useRef();

  const handleFileSelectForUploadCard = (event) => {
    console.log("handleFileSelectForUploadCard called");
    const file = event.target.files[0];
    if (file) {
      setFileData({
        name: file.name,
        status: "uploading",
        progress: 0,
        size: file.size,
      });

      const reader = new FileReader();

      // This event is triggered each time the reading operation is successfully completed.
      reader.onload = (e) => {
        console.log("File read successfully!");
        setImagePreview(e.target.result); // Store the image data for preview
        const base64String = e.target.result;
        // Now we have the base64 string, let's update the state with this string
        if (typeof base64String === "string") {
          const base64ImageContent = base64String.split(",")[1];
          console.log("Base64 Image Content:", base64ImageContent);
          setUploadedImages((prevImages) => [
            ...prevImages,
            {
              name: file.name,
              url: base64ImageContent,
              type: customType, // use customType instead of file.type
              size: file.size,
            },
          ]);
          // Here we set the progress to 100 since the load is complete
          setFileData({ name: file.name, status: "completed", progress: 100 });
        } else {
          console.error("FileReader did not return a string.");
        }
        onUpload(customType);
      };

      // This event is triggered each time the reading operation is aborted.
      reader.onabort = () => {
        console.error("File reading was aborted.");
        setFileData({ name: "", status: "idle", progress: 0 });
      };

      // This event is triggered each time the reading operation encounters an error.
      reader.onerror = () => {
        console.error("Error reading file");
        setFileData({ name: "", status: "idle", progress: 0 });
      };

      // This event is triggered while reading the file, reporting the progress periodically.
      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          const progress = Math.round((data.loaded / data.total) * 100);
          setUploadProgress(progress);
          setFileData((prevData) => ({ ...prevData, progress: progress }));
        }
      };

      // Start reading the file as Data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setFileData({
      name: "",
      status: "idle",
      progress: 0,
    });
    setUploadProgress(0);
  };

  useEffect(() => {
    // Capture the value of uploadIntervalRef.current in the effect
    const intervalId = uploadIntervalRef.current;

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Empty array ensures this only runs on mount and unmount

  return (
    <>
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Uploaded Image Preview"
          sx={{
            width: "100%",
            height: "auto",
            marginBottom: 2,
            cursor: "pointer",
          }}
        />
      )}
      <Card
        sx={{
          backgroundColor:
            fileData.status === "completed" ? colors.darkNavy : colors.skyBlue,
          color: "#00A79D",
          borderRadius: "1rem",
          minHeight: "9rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {(fileData.status === "idle" || fileData.status === "uploading") && (
            <>
              {/* Upload progress UI */}
              {fileData.status === "uploading" && (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={fileData.progress}
                    sx={{
                      position: "absolute",
                      top: 0,
                      width: "100vw",
                      height: "100vh",
                      ".MuiLinearProgress-bar": { backgroundColor: "#0C6872" },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "2.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {fileData.name} - {uploadProgress}% Uploading
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {fileData.size} bytes
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      borderRadius: "0.6rem",
                      padding: "0.1rem 0.3rem",
                    }}
                  >
                    <Typography
                      onClick={handleCancelUpload}
                      sx={{ color: "#0C6872", cursor: "pointer" }}
                    >
                      Cancel
                    </Typography>
                  </Box>
                </>
              )}

              {/* Click to upload UI */}
              {fileData.status === "idle" && (
                <>
                  <FileUploadOutlinedIcon sx={{ color: "white" }} />
                  <Typography
                    component="label"
                    sx={{
                      color: "white",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      cursor: "pointer",
                      margin: "0.5rem",
                    }}
                  >
                    Click to upload
                    <input
                      type="file"
                      onChange={handleFileSelectForUploadCard}
                      hidden
                      accept=".png, .jpg, .jpeg"
                    />
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", justifyContent: "center" }}
                  >
                    {acceptedFiles.map((fileType, idx) => (
                      <Chip
                        key={idx}
                        label={fileType}
                        size="small"
                        sx={{
                          backgroundColor: "white",
                          color: "#00A79D",
                          margin: "4px",
                        }}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </>
          )}

          {fileData.status === "completed" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Align items horizontally
                alignItems: "center", // Align items vertically
                justifyContent: "center",
                margin: "2rem",
                gap: "0.5rem",
              }}
            >
              <VerifiedIcon sx={{ color: "#32E886", fontSize: "1.5rem" }} />
              <Typography
                variant="body2"
                sx={{ color: "white", textAlign: "center" }}
              >
                {fileData.name} - Upload Complete
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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

  // Handlers for zoom and rotation
  const handleZoomChange = (event, newZoom) => {
    setZoom(newZoom);
  };

  const handleRotationChange = (event, newRotation) => {
    setRotation(newRotation);
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
    // ........
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
          <Box sx={{ textAlign: "center", margin: 5 }}>
            <Typography id="zoom-slider" gutterBottom>
              Zoom
            </Typography>
            <Slider
              value={zoom}
              onChange={handleZoomChange}
              aria-labelledby="zoom-slider"
              valueLabelDisplay="auto"
              min={50}
              max={120}
              sx={{
                color: colors.skyBlue,
                maxWidth: "60%",
              }}
            />
            <Typography id="rotation-slider" gutterBottom>
              Rotate
            </Typography>
            <Slider
              value={rotation}
              onChange={handleRotationChange}
              aria-labelledby="rotation-slider"
              valueLabelDisplay="auto"
              min={0}
              max={360}
              sx={{
                color: colors.skyBlue,
                maxWidth: "60%",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              margin: "2rem",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.darkNavy,
                  color: "white",
                  padding: "1rem",
                  borderRadius: "1.5rem",
                  "&:hover": {
                    backgroundColor: colors.skyBlue,
                  },
                }}
                onClick={handleOpenDialog}
                disabled={uploadedImages.length === 0}
              >
                Apply Adjustments
              </Button>
            </Box>

            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Adjustments"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to apply the adjustments?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>No</Button>
                <Button onClick={handleConfirmAdjustments} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* Conditionally render the new form section */}
          {adjustmentsApplied && (
            <Box
              sx={{
                margin: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Include Patient's Details to Breast Cancer Analysis Report
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Age"
                  variant="outlined"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Gender"
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  fullWidth
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </TextField>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                      // checked={...} // if you are managing checked state
                      // onChange={...} // if you need to handle changes
                      />
                    }
                    label="I agree to the Privacy Policy"
                  />
                </FormGroup>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: colors.darkNavy,
                      color: "white",
                      padding: "1rem",
                      borderRadius: "1.5rem",
                      "&:hover": {
                        backgroundColor: colors.skyBlue,
                      },
                    }}
                    onClick={() => {
                      const lastImage =
                        uploadedImages[uploadedImages.length - 1];
                      if (lastImage) {
                        switch (lastImage.type) {
                          case "mammogram":
                            handleUploadMammogram(lastImage);
                            break;
                          case "ultrasound":
                            handleUploadUltrasound(lastImage);
                            break;
                          case "mri":
                            handleUploadMRI(lastImage);
                            break;
                          case "histopathological":
                            handleUploadHistopathological(lastImage);
                            break;
                          default:
                            console.error("Unsupported file type.");
                        }
                      }
                    }}
                    disabled={isUploading || uploadedImages.length === 0}
                  >
                    Discover Your Diagnosis!
                  </Button>
                </Box>
              </form>
            </Box>
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

      {/* <Box sx={{ textAlign: "center", margin: 5 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: colors.darkNavy,
            color: "white",
            padding: "1rem",
            borderRadius: "1.5rem",
            "&:hover": {
              backgroundColor: colors.skyBlue,
            },
          }}
          onClick={() => {
            const lastImage = uploadedImages[uploadedImages.length - 1];
            if (lastImage) {
              switch (lastImage.type) {
                case "mammogram":
                  handleUploadMammogram(lastImage);
                  break;
                case "ultrasound":
                  handleUploadUltrasound(lastImage);
                  break;
                case "mri":
                  handleUploadMRI(lastImage);
                  break;
                case "histopathological":
                  handleUploadHistopathological(lastImage);
                  break;
                default:
                  console.error("Unsupported file type.");
              }
            }
          }}
          disabled={isUploading || uploadedImages.length === 0}
        >
          Discover Your Diagnosis!
        </Button>
      </Box> */}
    </Container>
  );
}

export default UploadSection;
