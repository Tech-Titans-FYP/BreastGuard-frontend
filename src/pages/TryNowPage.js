import React from "react";
import { Paper, Container } from "@mui/material";
import homeImage from "../assets/home.jpg";
import ImagePoweredAnalysis from "../components/tryNow/ImagePoweredAnalysis";
import UploadSection from "../components/tryNow/UploadSection";
import styled from "styled-components";
import backgroundImage from "../assets/background-watermark.png";

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
      <Paper style={styles.paperContainer}></Paper>
      <StyledContainer>
        <ImagePoweredAnalysis />
        <UploadSection />
      </StyledContainer>
    </>
  );
};

export default TryNow;

const StyledContainer = styled(Container)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundImage}), url(${backgroundImage});
    background-repeat: no-repeat, no-repeat;
    background-position: left bottom, right top; // positions for each watermark
    background-size: 5%, 5%; // sizes for each watermark (adjust as needed)
    pointer-events: none;
    z-index: -1;
  }
`;
