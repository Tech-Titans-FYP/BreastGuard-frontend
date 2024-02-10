import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import contactIllustration from "../assets/logo2.png";
import { colors } from "../consts/Colors";

const ContactUs = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
              color: colors.darkNavy,
            }}
          >
            Contact with us
          </Typography>

          <Box sx={{ maxWidth: "50rem", margin: "0 auto" }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Comments"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: colors.darkNavy,
                      color: "#ffffff",
                      fontWeight: "bold",
                      borderRadius: "2rem",
                      "&:hover": {
                        backgroundColor: colors.skyBlue,
                        color: "#ffffff",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={contactIllustration}
            alt="Contact Illustration"
            sx={{
              width: "50%",
              height: "auto",
              display: "block",
              margin: "auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;