import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { colors } from "../consts/Colors";
import results1 from "../assets/results/results1.jpg";
import results2 from "../assets/results/results2.jpg";
import results3 from "../assets/results/results3.jpg";
import classificationResults from "../assets/results/42.png";
import subtypeResults from "../assets/results/43.png";

const results = [
    {
        title: "Survey Results",
        content: [
          {
            subtitle: "Positive responses from the 20 participants ",
            descriptions:
              "This figure illustrates the percentage of positive responses from the 20 participants. Overall, 95% of the participants found the system easy to use, 85% felt that the system was well integrated, 80% expressed confidence when using the system, 75% believed that the system could be learned quickly, and 90% reported a liking for using the system frequently.",
            image: results1,
            alt: "results 1",
          },
          {
            subtitle: "Negative responses obtained from the survey results",
            descriptions:
              "We present the negative responses obtained from the survey results. Based on the feedback received from participants, it was found that 20% of users perceived the system as difficult to use due to its complexity. Another 10% of users reported difficulty in using the system due to its inconsistency, while 5% expressed challenges related to the need for prior learning. To improve the system's usability, we recommend implementing training sessions that can help users gain a better understanding of the system's functionalities. By providing training and guidance, users can become more proficient in utilizing the system effectively and overcome the difficulties they encounter.",
            image: results2,
            alt: "results 2",
          },
          {
            subtitle: "Statistical analysis of the 20 participants",
            descriptions:
              "To assess the accuracy of our medical image classification framework, we conducted a survey involving two radiologists, three doctors, and five medical interns. The participants were shown eight breast images, along with their corresponding generated reports. They were then asked to rate the accuracy of each generated report on a scale of 1 to 10. The results of the survey were promising, with all participants rating the accuracy of the generated reports as greater than 7.5 out of 10. These high ratings demonstrate the effectiveness of our framework in accurately generating medical reports based on breast images. Furthermore, we conducted a statistical analysis of the survey results, which is presented in Chart 3. Overall, the survey results provide strong evidence of the accuracy and effectiveness of our medical image classification framework. These findings suggest that our framework has the potential to improve the efficiency and accuracy of medical reporting, which can ultimately lead to improved patient care.",
            image: results3,
            alt: "results 3",
          },
        ],
      },
  {
    title: "Classification Results",
    content: [
      {
        subtitle: "Multi Image Modalities",
        descriptions:
          "Discover our latest achievements in breast cancer detection using diverse imaging techniques. Our state-of-the-art deep learning models, including ResNet50 and DenseNet201, have been meticulously trained on extensive datasets to ensure outstanding performance. Each model is specialized for different modalities such as Mammograms, Ultrasound, MRI, and Histopathology, achieving remarkable accuracy and low loss rates.",
        image: classificationResults,
        alt: "Classificiaton",
      },
    ],
  },
  {
    title: "Subtype Identification Results",
    content: [
      {
        subtitle: "Multi Image Modalities",
        descriptions:
          "Dive into our sophisticated results for breast cancer subtype identification across various imaging modalities. Our cutting-edge models demonstrate exceptional accuracy in differentiating among specific cancer subtypes, which is pivotal for tailored treatment strategies.",
        image: subtypeResults,
        alt: "Subtype",
      },
    ],
  },
];

const Results = () => {
  return (
    <>
      {/* Step 1 */}
      {results.map((result, index) => (
        <Box
          key={index}
          sx={{
            my: 3,
            px: 8,
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f0f0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: colors.darkNavy,
              fontWeight: "bold",
              textAlign: "center",
              mb: "1rem",
            }}
          >
            {result.title}
          </Typography>
          {result.content.map((item, contentIndex) => (
            <Box
              key={contentIndex}
              sx={{
                my: 3,
                px: 6,
                backgroundColor: item.backgroundColor,
              }}
            >
              <Grid
                container
                spacing={3}
                direction={contentIndex % 2 === 0 ? "row" : "row-reverse"}
              >
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      color={colors.skyBlue}
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>
                  <Typography color={colors.darkNavy} paragraph>
                    {item.descriptions}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.alt}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      mx: "auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default Results;
