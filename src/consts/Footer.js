import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import logo from "../assets/logo.png";
import footerLine from "../assets/footer line.png";

const Footer = () => {
  const handlecopyright = () => {
    let date = new Date();
    let year = date.getFullYear();
    return year;
  };

  return (
    <Box sx={{ background: "#f5f5f5", pt: 3 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{
              width: "20vw",
              height: "auto",
              maxHeight: "100%",
              display: "block",
              margin: "auto",
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            A project by Faculty of Information Technology
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            Univerity of Moratuwa
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="img"
        src={footerLine}
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "100%",
        }}
      />
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        © {handlecopyright()} BreastGuard Tool. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
