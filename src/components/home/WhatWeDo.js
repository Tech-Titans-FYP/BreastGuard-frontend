import React from "react";
import { Typography, Grid, Box, Card, CardContent } from "@mui/material";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";
import service4 from "../../assets/service4.png";

const WhatWeDo = () => {
  // Define the details for each feature your platform provides
  const features = [
    {
      title: "Breast Cancer Classification",
      description:
        "Our platform employs advanced algorithms to analyse uploaded breast images, providing accurate and reliable classification of cancerous lesions.",
      imgSrc: service1,
    },
    {
      title: "Breast Cancer Localization",
      description:
        "We pinpoint the exact location of breast cancer within the breast tissue, specifying the quadrant or region. This information is aiding in surgical planning, targeted treatment, and a more precise assessment of the disease's extent.",
      imgSrc: service2,
    },
    {
      title: "Subtype Identification",
      description:
        "Our technology goes beyond general classification, identifying the specific subtype of breast cancer present. Whether it's Invasive Ductal Carcinoma, Invasive Lobular Carcinoma, or other variations.",
      imgSrc: service3,
    },
    {
      title: "Generate a Report",
      description:
        "Our platform seamlessly compiles all relevant information into a comprehensive and easy-to-understand report. This report includes details on breast cancer classification, localization, subtype identification, and additional key factors.",
      imgSrc: service4,
    },
  ];

  // Function to determine the flex-direction based on the card index
  const getFlexDirection = (index) => {
    const isEvenRow = Math.floor(index / 2) % 2 === 0;
    return isEvenRow ? "row" : "row-reverse";
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        textAlign="center"
        mb={4}
        color="#0C6872"
        fontWeight="bold"
      >
        What We Do
      </Typography>
      <Grid container>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: getFlexDirection(index),
                backgroundColor: "#00A79D",
                overflow: "hidden", // Ensures the image doesn't exceed the card boundaries
              }}
            >
              <Box
                component="img"
                src={feature.imgSrc}
                sx={{ width: "50%", height: "100%", objectFit: "cover" }}
                alt={feature.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start", // For text alignment inside card content
                  padding: "16px", // Adjust padding as needed
                  flexGrow: 1, // Allows the content to fill the space next to the image
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhatWeDo;
