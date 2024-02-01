import React from "react";
import Section1 from "../components/home/HomeSection1";
import WhoWeServeSection from "../components/home/WhoWeServeSection";
import WhatWeDo from "../components/home/WhatWeDo";
import styled from "styled-components";
import backgroundImage from "../assets/background-watermark.png";
import { Container } from "@mui/material";
import ModalitySection from "../components/home/ModalitySection";

const Home = () => {
  return (
    <>
      <Section1 />
      <StyledContainer>
        <WhoWeServeSection />
        <WhatWeDo />
      </StyledContainer>
      <ModalitySection />
    </>
  );
};

export default Home;

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
    background-repeat: no-repeat no-repeat;
    background-position: left top, right center; // positions for each watermark
    background-size: 5%, 5%; // sizes for each watermark (adjust as needed)
    pointer-events: none;
    z-index: -1;
  }
`;
