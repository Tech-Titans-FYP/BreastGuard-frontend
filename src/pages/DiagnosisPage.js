import React from "react";
import Header from "../consts/Header";
import Diagnosis from "../components/Diagnosis";
import { Typography, Paper } from "@mui/material";
import homeImage from "../assets/home.jpg";

const styles = {
    paperContainer: {
      backgroundImage: `url(${homeImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: "white",
      height: "80vh",
      position: "relative",
      display: "flex",
      justifyContent: "center", // Align content vertically in the center
      alignItems: "center", // Align content horizontally in the center
      padding: "1.25rem",
    },
  };

const DiagnosisPage = () => {
  return (
    <>
      <Header />
      <Paper style={styles.paperContainer}></Paper>      
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0C6872", textAlign: "center", margin: 5 }}
      >
        Breast Guard: Image-Powered Breast Cancer Analysis Results
      </Typography>
      <Diagnosis />
    </>
  );
};

export default DiagnosisPage;
