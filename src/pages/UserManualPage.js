import React from "react";
import { Container } from "@mui/material";
import ImagePoweredAnalysis from "../components/ImagePoweredAnalysis";
import UserManual from "../components/UserManual";
import styled from "styled-components";
import backgroundImage from "../assets/background-watermark.png";

const UserManualPage = () => {
  return (
    <>
      <ImagePoweredAnalysis
        title="Breast Guard: User Manual"
        description="This software is designed to detect the breast cancers using multi image modalities. In this user manual, we will explain how to use the software to detect your breast cancer."
      />
      <StyledContainer>
        <UserManual />
      </StyledContainer>
    </>
  );
};

export default UserManualPage;

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
