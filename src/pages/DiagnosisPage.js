import React from "react";
import Diagnosis from "../components/Diagnosis";
import { Container } from "@mui/material";
import styled from "styled-components";
import backgroundImage from "../assets/background-watermark.png";
import ImagePoweredAnalysis from "../components/ImagePoweredAnalysis";

const DiagnosisPage = () => {
  return (
    <>
      <ImagePoweredAnalysis
        title="Breast Guard: Report"
        description="This software is designed to detect the breast cancers using multi image modalities. In this user manual, we will explain how to use the software to detect your breast cancer."
      />
      <StyledContainer>
        <Diagnosis />
      </StyledContainer>
    </>
  );
};

export default DiagnosisPage;

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
