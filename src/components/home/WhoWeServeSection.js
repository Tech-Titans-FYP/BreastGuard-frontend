import React from "react";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import Card1 from "../../assets/serve-card1.png";
import Card2 from "../../assets/serve-card2.png";
import Card3 from "../../assets/serve-card3.png";

const services = [
  {
    title: "Early Detect Seekers",
    description:
      "Our platform is designed to serve individuals who prioritize proactive health management.By uploading breast images, users can leverage advanced image analysis to detect potential abnormalities early on, promoting timely intervention and improved treatment outcomes.",
    imgSrc: Card1,
  },
  {
    title: "Med Pros & Oncologists",
    description:
      "Tailored for healthcare professionals, our platform provides a sophisticated tool for oncologists and medical practitioners. It enhances the diagnostic process by offering detailed reports on breast cancer classification, localization, and subtype identification, enabling more informed decision-making in patient care.",
    imgSrc: Card2,
  },
  {
    title: "Research & Academia",
    description:
      "Our website extends its services to research institutions and academia, offering a valuable resource for studying and analyzing breast cancer patterns. With access to a diverse dataset, technologies, and treatment approaches in the field of breast cancer research.",
    imgSrc: Card3,
  },
];

const ServiceCard = ({ title, description, imgSrc }) => (
  <Card sx={{ m: 2, boxShadow: 3 }}>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img
          src={imgSrc}
          alt={title}
          style={{ maxWidth: "20%", height: "auto" }}
        />
      </Box>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const WhoWeServeSection = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 3 }}>
      <Typography variant="h4" component="div" gutterBottom textAlign="center" color="#0C6872" fontWeight="bold">
        WHO WE SERVE
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ServiceCard
              title={service.title}
              description={service.description}
              imgSrc={service.imgSrc}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhoWeServeSection;
