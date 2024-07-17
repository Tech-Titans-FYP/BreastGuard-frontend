import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Box,
} from "@mui/material";
import homeImage from "../../assets/home/home_background.gif"; // Make sure the path is correct

const styles = {
  paperContainer: {
    backgroundImage: `url(${homeImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    color: "white",
    height: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "left", // Align content vertically in the center
    alignItems: "center", // Align content horizontally in the center
    padding: "5rem",
    marginTop: '-64px',
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "450px",
    display: "flex", // Enable flex container
    flexDirection: "column", // Stack children vertically
    alignItems: "left", // Align children in the center horizontally
    textAlign: "left", // Center text
  },
  button1: {
    marginTop: "1.25rem", // 20px converted to rem
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#2897A5",
    },
    borderRadius: "1.25rem", // 20px converted to rem
    color: "#01313E",
    textTransform: "none",
    padding: "0.625rem 2rem", // 10px 20px converted to rem
    boxShadow: "none",
    fontWeight: "bold"
  },
  button2: {
    marginTop: "1.25rem", // 20px converted to rem
    backgroundColor: "#01313E",
    "&:hover": {
      backgroundColor: "#2897A5",
    },
    borderRadius: "1.25rem", // 20px converted to rem
    color: "white",
    textTransform: "none",
    padding: "0.625rem 2rem", // 10px 20px converted to rem
    boxShadow: "none",
    fontWeight: "bold"
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

  const handleClickManual = () => {
    navigate("/manual"); // This should be the route path you defined for the TryNow page
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
        <Box
        sx={{
          display: "flex",
          gap: "1rem",         
        }}
        >             
        <Button variant="contained" sx={styles.button1} onClick={handleClick}>
          START BREASTGUARD
        </Button>
        <Button variant="contained" sx={styles.button2} onClick={handleClickManual}>
          USER MANUAL
        </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default HomeImage;
