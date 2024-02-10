import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { colors } from "../../consts/Colors";

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

export default UploadCard;
