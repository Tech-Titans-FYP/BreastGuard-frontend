import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Container,
} from "@mui/material";

// Images can be imported if they are stored locally in your src/assets directory
import mammogramImage from "../../assets/mammogram.png"; // Replace with your actual import paths
import ultrasoundImage from "../../assets/ultrasound.png";
import mriImage from "../../assets/mri.png";
import histopathologicalImage from "../../assets/histopathology.png";

const modalities = [
  {
    title: "Mammogram Image Modality",
    image: mammogramImage,
  },
  {
    title: "Ultrasound Image Modality",
    image: ultrasoundImage,
  },
  {
    title: "MRI Image Modality",
    image: mriImage,
  },
  {
    title: "Histopathological Image Modality",
    image: histopathologicalImage,
  },
];

const ImageModalityCard = ({ title, image }) => (
  <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{ width: 150, height: "auto", margin: "auto" }}
    />
    <CardContent>
      <Typography gutterBottom component="div" textAlign="center" color="white">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const ModalitySection = () => {
  return (
    <Container maxWidth={false} disableGutters
    >
      <Box sx={{ flexGrow: 1, bgcolor: "#00A79D", py: 3, my: 4}}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          We work with the four image modalities!
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {modalities.map((modality, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ImageModalityCard
                title={modality.title}
                image={modality.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ModalitySection;
