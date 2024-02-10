import React from "react";
import { Typography, Container, Box, Grid } from "@mui/material";
import { colors } from "../consts/Colors";
import step1Image from "../assets/user-manual/step1.gif"; // Make sure to import actual image
import step2Image from "../assets/user-manual/step2.gif"; 
import step3Image from "../assets/user-manual/step3.gif"; 
import step4Image from "../assets/user-manual/step4.gif"; 
import step1Icon from "../assets/user-manual/step1.png";
import step2Icon from "../assets/user-manual/step2.png";
import step3Icon from "../assets/user-manual/step3.png";
import step4Icon from "../assets/user-manual/step4.png";

const steps = [
  {
    icon: step1Icon,
    title: "Select the breast image",
    descriptions: [
      'To use the software, the first step is to upload the breast image. Click on the "Upload" button and select the image file from your computer.',
      "If the upload process is successful, the image will be displayed in the image viewer.",
      "Supported file types: .jpeg .jpg, .png"
    ],
    image: step1Image,
    alt: "Step 1",
  },
  {
    icon: step2Icon,
    title: "Edit Image to Fit",
    descriptions: [
      "After uploading the image, it needs to be manipulated to fit. The following tools are available to manipulate the image.",
      "Zoom: Use the zoom tool to enlarge or reduce the size of the image.",
      "Rotation: Use the rotation tool to rotate the image clockwise or counterclockwise.",
      "After the breast image fits, click APPLY ADJUSTMENTS. And if adjustments finished click YES in pop up message"
    ],
    image: step2Image,
    alt: "Step 2",
  },
  {
    icon: step3Icon,
    title: "Fill patient's details",
    descriptions: [
      "Fill the patien's details of Full name, Age, Gender correctly",
      "Agree to the Privacy Policy by after reading carefully and clicking checkbox.",
      "Finally click DISCOVER YOUR DIAGNOSIS to view the generated report.",
    ],
    image: step3Image,
    alt: "Step 3",
  },
  {
    icon: step4Icon,
    title: "View the Generated Report",
    descriptions: [
      "Carefully view the generated report based on your uploaded breast image.",
      "You can download the report by clicking DOWNLOAD icon.",
    ],
    image: step4Image,
    alt: "Step 4",
  },
];

const UserManual = () => {
  return (
    <Container>
      {/* Step 1 */}
      {steps.map((step, index) => (
        <Box key={index} elevation={3} sx={{ my: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="img"
                  src={step.icon}
                  alt={`Step ${index + 1} icon`}
                  sx={{ width: 100, height: "auto" }}
                />
                <Typography
                  variant="h5"
                  color={colors.darkNavy}
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
              {step.descriptions.map((desc, idx) => (
                <Typography key={idx} color={colors.darkNavy} paragraph>
                  {desc}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                src={step.image}
                alt={step.alt}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  mx: "auto",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      {/* Repeat for other steps */}
    </Container>
  );
};

export default UserManual;
