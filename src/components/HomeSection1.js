import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import homeImage from "../assets/home.jpg"; // Make sure the path is correct

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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "600px",
    display: "flex", // Enable flex container
    flexDirection: "column", // Stack children vertically
    alignItems: "center", // Align children in the center horizontally
    textAlign: "center", // Center text
  },
  button: {
    marginTop: "1.25rem", // 20px converted to rem
    backgroundColor: "#00A79D",
    "&:hover": {
      backgroundColor: "#00897b",
    },
    borderRadius: "1.25rem", // 20px converted to rem
    color: "white",
    textTransform: "none",
    padding: "0.625rem 2rem", // 10px 20px converted to rem
    boxShadow: "none",
  },
  listItemIcon: {
    minWidth: "1.875rem", // 30px converted to rem
    color: "#00A79D", // Color for the icons
  },
  listItemText: {
    maxWidth: "21.875rem", // 350px converted to rem
  },
};

const HomeImage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/trynow"); // This should be the route path you defined for the TryNow page
  };

  return (
    <Paper style={styles.paperContainer}>
      <Box style={styles.overlay} />
      <Box style={styles.content}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Our source for Multiple Solutions
        </Typography>
        <List sx={{ padding: 0, width: "100%" }}>
          {" "}
          {/* Set width to 100% for proper centering */}
          {[
            "Features from diverse imaging modalities",
            "Accurately locate and classify breast cancer",
            "Breast Cancer Diagnosis Professionals",
            "Data Interpretation and Management",
          ].map((text, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <ListItemIcon sx={styles.listItemIcon}>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={text} sx={styles.listItemText} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" sx={styles.button} onClick={handleClick}>
          Try Now
        </Button>
      </Box>
    </Paper>
  );
};

export default HomeImage;
