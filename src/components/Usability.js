import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { colors } from "../consts/Colors";
import results1 from "../assets/results/results1.jpg";
import results2 from "../assets/results/results2.jpg";

const results = [
  {
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
    ],
  },
];

const Usability = () => {
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

export default Usability;
