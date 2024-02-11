import React from "react";
import ImagePoweredAnalysis from "../components/ImagePoweredAnalysis";
import Results from "../components/Results";

const ResultsPage = () => {
  return (
    <>
      <ImagePoweredAnalysis
        title="Breast Guard: Results"
        description="We consolidate data-driven insights and the outcomes of our latest research to continually improve breast cancer diagnosis and treatment."
      />
      <Results />
    </>
  );
};

export default ResultsPage;
