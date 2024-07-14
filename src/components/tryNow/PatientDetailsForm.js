import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { colors } from "../../consts/Colors";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxWidth: "50%",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "1rem",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};

const textFieldStyle = {
  "& label.Mui-focused": {
    color: colors.darkNavy,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: colors.darkNavy,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.lightNavy,
    },
    "&:hover fieldset": {
      borderColor: colors.darkNavy,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.darkNavy,
    },
  },
};

const linkButtonStyle = {
  background: "none",
  border: "none",
  padding: 0,
  fontFamily: "Montserrat, sans-serif",
  color: "#027B89",
  cursor: "pointer",
  display: "inline",
};

const PatientDetailsForm = ({
  fullName,
  setFullName,
  age,
  setAge,
  handleSubmit,
  isUploading,
  uploadedImages,
  handleUpload,
  setOpenCustomDialog,
  customDialogMessage,
  setCustomDialogMessage,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [open, setOpen] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled and privacy policy is agreed
    if (fullName && age && privacyPolicy) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fullName, age, privacyPolicy]);

  const onDiscoverClick = async () => {
    if (uploadedImages.length > 0) {
      const lastImage = uploadedImages[uploadedImages.length - 1];
      const payload = {
        image: [
          {
            name: lastImage.name,
            url: `data:image/png;base64,${lastImage.url}`,
            type: lastImage.type,
            size: lastImage.size,
          },
        ],
      };

      try {
        const response = await fetch("http://127.0.0.1:5000/api/process-us-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "An error occurred while processing the image.");
        }

        handleUpload();
      } catch (error) {
        setCustomDialogMessage(error.message);
        setOpenCustomDialog(true);
      }
    } else {
      setOpenErrorDialog(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={formStyle}>
      <Typography variant="h6" gutterBottom textAlign="center">
        Include Patient's Details to Breast Cancer Analysis Report
      </Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          required
          sx={textFieldStyle}
        />
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          required
          sx={textFieldStyle}
        />
        <TextField
          label="Gender"
          variant="outlined"
          value="Female"
          inputProps={{
            readOnly: true,
          }}
          fullWidth
          required
          sx={textFieldStyle}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.checked)}
              />
            }
            label={
              <span>
                I agree to the{" "}
                <button onClick={handleClickOpen} style={linkButtonStyle}>
                  Privacy Policy
                </button>
              </span>
            }
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
            onClick={onDiscoverClick}
            disabled={
              isUploading || uploadedImages.length === 0 || !isFormValid
            }
          >
            Discover Your Diagnosis!
          </Button>
        </Box>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            At BreastGuard, accessible from breastguard.live, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by BreastGuard and how we use it. If you have additional
            questions or require more information about our Privacy Policy, do
            not hesitate to contact us. This Privacy Policy applies only to our
            online activities and is valid for visitors to our website with
            regards to the information that they shared and/or collect in
            BreastGuard. This policy is not applicable to any information
            collected offline or via channels other than this website.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openErrorDialog}
        onClose={() => setOpenErrorDialog(false)}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"File Upload Error"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            No valid image uploaded. Please upload the correct image type.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenErrorDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientDetailsForm;
