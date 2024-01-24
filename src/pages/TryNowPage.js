import React from "react";
import Header from "../consts/Header";
import { Paper } from "@mui/material";
import homeImage from "../assets/home.jpg";
import ImagePoweredAnalysis from "../components/tryNow/ImagePoweredAnalysis";
import UploadSection from "../components/tryNow/UploadSection";

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

const TryNow = () => {
  return (
    <>
      <Header />
      <Paper style={styles.paperContainer}></Paper>
      <ImagePoweredAnalysis />
      <UploadSection/>
    </>
  );
};

export default TryNow;
