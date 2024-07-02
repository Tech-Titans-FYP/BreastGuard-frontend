import React from "react";
import ImagePoweredAnalysis from "../components/ImagePoweredAnalysis";
import Usability from "../components/Usability";

const UsabilityPage = () => {
  return (
    <>
      <ImagePoweredAnalysis
        title="Breast Guard: Usability"
        description="Looking for a faster, more accurate way to diagnose breast images? Look no further than BreastGuard - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With BreastGuard, you can streamline your radiology workflow and get the results you need in seconds."
      />
      <Usability />
    </>
  );
};

export default UsabilityPage;