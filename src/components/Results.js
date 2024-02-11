import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { colors } from "../consts/Colors";
import usClassificiaton from "../assets/results/us-classification-results.JPG";
import usSubtype from "../assets/results/us-subtype-results.JPG";

const results = [
    {
        title: "Survey Results",
        content: [
          {
            subtitle: "Ultrasound Image Modality",
            descriptions:
              "Explore our latest classification results for ultrasound image analysis. Our advanced deep learning models, including ResNet50, EfficientNet, DenseNet201, and InceptionV3, have been rigorously tested to ensure high accuracy and low loss in image classification tasks. The ResNet50 is in our tailored method showcases an impressive accuracy of 95.78% with a minimal loss of 1.88%, leading to more reliable and precise diagnostic capabilities.",
            image: usClassificiaton,
            alt: "us Classificiaton",
          },
        ],
      },
  {
    title: "Classification Results",
    content: [
      {
        subtitle: "Ultrasound Image Modality",
        descriptions:
          "Explore our latest classification results for ultrasound image analysis. Our advanced deep learning models, including ResNet50, EfficientNet, DenseNet201, and InceptionV3, have been rigorously tested to ensure high accuracy and low loss in image classification tasks. The ResNet50 is in our tailored method showcases an impressive accuracy of 95.78% with a minimal loss of 1.88%, leading to more reliable and precise diagnostic capabilities.",
        image: usClassificiaton,
        alt: "us Classificiaton",
      },
      {
        subtitle: "Ultrasound Image Modality",
        descriptions:
          "Explore our latest classification results for ultrasound image analysis. Our advanced deep learning models, including ResNet50, EfficientNet, DenseNet201, and InceptionV3, have been rigorously tested to ensure high accuracy and low loss in image classification tasks. The ResNet50 is in our tailored method showcases an impressive accuracy of 95.78% with a minimal loss of 1.88%, leading to more reliable and precise diagnostic capabilities.",
        image: usClassificiaton,
        alt: "us Classificiaton",
      },
    ],
  },
  {
    title: "Subtype Identification Results",
    content: [
      {
        subtitle: "Ultrasound Image Modality",
        descriptions:
          "Our state-of-the-art ResNet50 model achieves outstanding accuracy in the identification of ultrasound image subtypes. It successfully discriminates among 13 different subclasses with 98.16% accuracy. Furthermore, our specialized models excel in the crucial task of separating malignant and benign conditions, with accuracies of 99.65% and 99.89% respectively, ensuring precise and dependable diagnostic support.",
        image: usSubtype,
        alt: "us Subtype",
      },
      {
        subtitle: "Ultrasound Image Modality",
        descriptions:
          "Our state-of-the-art ResNet50 model achieves outstanding accuracy in the identification of ultrasound image subtypes. It successfully discriminates among 13 different subclasses with 98.16% accuracy. Furthermore, our specialized models excel in the crucial task of separating malignant and benign conditions, with accuracies of 99.65% and 99.89% respectively, ensuring precise and dependable diagnostic support.",
        image: usSubtype,
        alt: "us Subtype",
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
