import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
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

const PatientDetailsForm = ({
  fullName,
  setFullName,
  age,
  setAge,
  gender,
  setGender,
  handleSubmit,
  isUploading,
  uploadedImages,
  handleUpload,
  setOpenCustomDialog,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled and privacy policy is agreed
    if (fullName && age && gender && privacyPolicy) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fullName, age, gender, privacyPolicy]);

  const onDiscoverClick = () => {
    if (uploadedImages.length > 0) {
      // Call the handleUpload function passed as a prop
      handleUpload();
    }
  };

  return (
    <Box sx={formStyle}>
      <Typography variant="h6" gutterBottom textAlign="center">
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
          select
          SelectProps={{ native: true }}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          required
          sx={textFieldStyle}
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </TextField>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={privacyPolicy} onChange={(e) => setPrivacyPolicy(e.target.checked)} />}
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
            onClick={onDiscoverClick}
            disabled={isUploading || uploadedImages.length === 0 || !isFormValid}
          >
            Discover Your Diagnosis!
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PatientDetailsForm;
